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
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import { createOpenAIFunctionsAgent, createToolCallingAgent } from "langchain/agents";
import { LangGraphHelper } from '../helpers';
import { MemorySaver } from "@langchain/langgraph";


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
        let results = {}
        try {
            const llm = LangGraphHelper.createLlm("gpt-3.5-turbo", 0, 1)

            const memory = new MemorySaver()
            const agent = LangGraphHelper.createReactAssistantWithMemory(llm, [], "hello", memory)

            console.log(memory.storage)


            const config = {
                configurable: {
                    thread_id: "test-thread",
                },
            };


            results = await agent.invoke({
                messages: [new HumanMessage("can you create a simple function to extract day from iso date string")],
            }, config)
            console.log(memory.storage)

        } catch (error) {
            console.log(error)
        }



        return ChatResponseEntity.fromJson({ assistantId: "lol", prompt: "something", response: results })
    }
}
