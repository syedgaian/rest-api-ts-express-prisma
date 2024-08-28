// src\features\assistants\infrastructure\remote.datasource.impl.ts

import { ONE, ZERO, AppError } from '../../../core';
import { type PaginationDto, type PaginationResponseEntity } from '../../shared';
import {
    AssistantEntity,
    type CreateAssistantDto,
    type AssistantDataSource,
    type CreateAssistantWithConfigDto,
    ChatResponseEntity,
    ChatWithAssistantDto
} from '../domain';
import { prisma } from "../../../client"
import "dotenv/config";
import { ChatOpenAI } from '@langchain/openai';
import { createAgent, agentNode } from '../helpers';
import { AgentState } from '../config';
import { HumanMessage } from "@langchain/core/messages";


export class AssistantDatasourceImpl implements AssistantDataSource {


    public async create(createDto: CreateAssistantDto): Promise<AssistantEntity> {

        const { name, description, version, status } = createDto;

        const assistant = await prisma.assistant.create({
            data: { name, description, version, status }
        })
        return AssistantEntity.fromJson(assistant);
    }

    public async createWithConfig(createDto: CreateAssistantWithConfigDto): Promise<AssistantEntity> {

        const { name, description, version, status, config } = createDto;
        const { temperature, topP, tools, model, instructions, agentType, deployedAt, lastActiveAt } = config;

        try {
            const assistant = await prisma.assistant.create({
                data: {
                    name, description, version, status,
                    config: {
                        create: {
                            temperature, topP, tools, model, instructions, agentType, deployedAt, lastActiveAt
                        }
                    }
                }
            });
            const assistantConfig = await prisma.assistantConfig.findUnique({
                where: {
                    assistantId: assistant.id
                }
            })
            return AssistantEntity.fromJson({ ...assistant, config: assistantConfig });
        } catch (error) {
            console.log(error)
            throw AppError.internalServer("failed")
        }
    }

    public async chatWithAssistant(chatWithAssistantDto: ChatWithAssistantDto): Promise<ChatResponseEntity> {
        // const { assistantId } = chatWithAssistantDto
        // const assistant = await prisma.assistant.findUnique({
        //     where: {
        //         id: assistantId
        //     }
        // })
        // if (!assistant) {
        //     throw AppError.notFound('Assistant with assistantId do not exist');
        // }

        const llm = new ChatOpenAI({ modelName: "gpt-4o" });

        // Research agent and node
        const newAgent = await createAgent({
            llm,
            tools: [],
            systemMessage:
                "You should provide accurate data for the chart generator to use.",
        });

        const results = await agentNode({
            messages: [new HumanMessage("Research the US primaries in 2024")],
            sender: "User",
        }, newAgent, "Assistant")

        return ChatResponseEntity.fromJson({ assistantId: "lol", prompt: "something", response: results })
    }
}
