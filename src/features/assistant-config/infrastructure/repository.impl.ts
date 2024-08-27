// src\features\assistant-config\infrastructure\repository.impl.ts

import { type PaginationDto, type PaginationResponseEntity } from '../../shared';

import {
    type AssistantConfigRepository,
    type AssistantConfigEntity,
    type CreateAssistantConfigDto,
    type AssistantConfigDataSource,
} from '../domain';

export class AssistantRepositoryImpl implements AssistantConfigRepository {
    constructor(private readonly datasource: AssistantConfigDataSource) { }

    async create(createDto: CreateAssistantConfigDto): Promise<AssistantConfigEntity> {
        return await this.datasource.create(createDto);
    }
}
