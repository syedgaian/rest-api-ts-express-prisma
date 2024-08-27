// src\features\assistants\infrastructure\local.datasource.impl.ts

import { ONE, ZERO, AppError } from '../../../core';
import { type PaginationDto, type PaginationResponseEntity } from '../../shared';
import {
    AssistantConfigEntity,
    type CreateAssistantConfigDto,
    type AssistantConfigDataSource
} from "../domain";

const ASSISTANTS_CONFIG_MOCK = [
    {
        id: 1,
        assistantId: "1",
        tools: ["code"],
        temperature: 0.7,
        topP: 1.0,
        agentType: "OPENAI",
        model: "gpt-4o"
    }
];

export class AssistantConfigDatasourceImpl implements AssistantConfigDataSource {


    public async create(createDto: CreateAssistantConfigDto): Promise<AssistantConfigEntity> {
        const createdTodo = { id: ASSISTANTS_CONFIG_MOCK.length + ONE, ...createDto };
        ASSISTANTS_CONFIG_MOCK.push(createdTodo);
        return AssistantConfigEntity.fromJson(createdTodo);
    }
}
