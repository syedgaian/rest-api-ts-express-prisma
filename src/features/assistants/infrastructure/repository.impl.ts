// src\features\todos\infraestructure\repository.impl.ts

import { type PaginationDto, type PaginationResponseEntity } from '../../shared';

import {
    type AssistantRepository,
    type AssistantEntity,
    type CreateAssistantDto,
    type AssistantDataSource,
} from '../domain';

export class TodoRepositoryImpl implements AssistantRepository {
    constructor(private readonly datasource: AssistantDataSource) { }

    async create(createDto: CreateAssistantDto): Promise<AssistantEntity> {
        return await this.datasource.create(createDto);
    }
}
