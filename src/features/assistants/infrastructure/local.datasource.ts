// src\features\assistants\infrastructure\local.datasource.impl.ts

import { ONE, ZERO, AppError } from '../../../core';
import { type PaginationDto, type PaginationResponseEntity } from '../../shared';
import {
    AssistantEntity,
    type CreateAssistantDto,
    type AssistantDataSource
} from '../domain';

const ASSISTANTS_MOCK = [
    {
        id: 1,
        name: 'First TODO...',
        version: "1.1"
    }
];

export class AssistantDatasourceImpl implements AssistantDataSource {


    public async create(createDto: CreateAssistantDto): Promise<AssistantEntity> {
        const createdTodo = { id: ASSISTANTS_MOCK.length + ONE, ...createDto };
        ASSISTANTS_MOCK.push(createdTodo);
        return AssistantEntity.fromJson(createdTodo);
    }
}
