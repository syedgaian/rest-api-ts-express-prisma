// src\features\assistants\infrastructure\local.datasource.impl.ts

import { ONE, ZERO, AppError } from '../../../core';
import { type PaginationDto, type PaginationResponseEntity } from '../../shared';
import {
    AssistantConfigEntity,
    type CreateAssistantConfigDto,
    type AssistantConfigDataSource
} from "../domain";
import { prisma } from "../../../client";

export class AssistantConfigDatasourceImpl implements AssistantConfigDataSource {


    public async create(createDto: CreateAssistantConfigDto): Promise<AssistantConfigEntity> {

        const {
            assistantId,
            agentType,
            instructions,
            temperature,
            tools,
            topP,
            model,
            deployedAt,
            lastActiveAt
        } = createDto;

        const assistant = await prisma.assistant.findUnique({
            where: {
                id: assistantId
            }
        })

        if (!assistant) {
            throw AppError.notFound('Assistant with assistantId do not exist');
        }

        const existingConfig = await prisma.assistantConfig.findUnique({
            where: {
                assistantId: assistantId
            }
        });
        if (existingConfig) {
            throw AppError.badRequest('Assistant Config already exist', [{ constraint: 'assistantId already exists , try updating it', fields: ['assistantId'] }]);
        }

        const assistantConfig = await prisma.assistantConfig.create({
            data: {
                assistantId,
                agentType,
                instructions,
                temperature,
                tools,
                topP,
                model,
                deployedAt,
                lastActiveAt
            }
        })
        return AssistantConfigEntity.fromJson(assistantConfig);

    }
}
