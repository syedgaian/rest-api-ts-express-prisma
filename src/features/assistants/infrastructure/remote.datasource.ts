// src\features\assistants\infrastructure\remote.datasource.impl.ts

import { ONE, ZERO, AppError } from '../../../core';
import { type PaginationDto, type PaginationResponseEntity } from '../../shared';
import {
    AssistantEntity,
    type CreateAssistantDto,
    type AssistantDataSource,
    type CreateAssistantWithConfigDto,
    ChatResponseEntity,
    ChatWithAssistantDto,
    AssistantConfigEntity
} from '../domain';
import { prisma } from "../../../client"
import "dotenv/config";
import { HumanMessage } from "@langchain/core/messages";
import { LangGraphHelper } from '../helpers';
import { CheckpointSaver } from '../helpers/CheckpointSaver';


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
        const { assistantId, prompt, threadId: existingThreadId } = chatWithAssistantDto;

        const assistant = await prisma.assistant.findUnique({
            where: {
                id: assistantId
            },
            include: {
                config: true
            }
        })
        if (!assistant) {
            throw AppError.notFound('Assistant with assistantId do not exist');
        }
        if (!assistant.config) {
            throw AppError.badRequest('Assistant configuration is not complete!');
        }

        let results = {}
        let threadId = null;
        try {
            if (!existingThreadId) {

                const thread = await prisma.thread.create({
                    data: {}
                })
                threadId = thread.id;
            } else {
                threadId = existingThreadId;
            }


            const { model, temperature, topP, instructions } = assistant.config as AssistantConfigEntity;
            const llm = LangGraphHelper.createOpenAILlm({
                model, temperature, topP
            })

            const memory = new CheckpointSaver()
            const agent = LangGraphHelper.createReactAssistantWithMemory(llm, [], instructions, memory)


            const config = {
                configurable: {
                    thread_id: threadId,
                    checkpoint_ns: "default" // addition of checkpoint name space for future
                },
            };


            results = await agent.invoke({
                messages: [new HumanMessage(prompt)],
            }, config);

        } catch (error) {
            console.log(error)
            throw AppError.internalServer('Failed to initiate chat!');
        }



        return ChatResponseEntity.fromJson({ assistantId: assistantId, prompt: prompt, threadId, response: results })
    }
}
