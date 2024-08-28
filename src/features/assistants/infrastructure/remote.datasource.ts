// src\features\assistants\infrastructure\remote.datasource.impl.ts

import { ONE, ZERO, AppError } from '../../../core';
import { type PaginationDto, type PaginationResponseEntity } from '../../shared';
import {
    AssistantEntity,
    type CreateAssistantDto,
    type AssistantDataSource,
    type CreateAssistantWithConfigDto
} from '../domain';
import { prisma } from "../../../client"


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
}
