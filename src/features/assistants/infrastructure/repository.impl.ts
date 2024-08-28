// src\features\todos\infraestructure\repository.impl.ts

import { type PaginationDto, type PaginationResponseEntity } from '../../shared';

import {
    type AssistantRepository,
    type AssistantEntity,
    type CreateAssistantDto,
    type AssistantDataSource,
    CreateAssistantWithConfigDto,
} from '../domain';

export class AssistantRepositoryImpl implements AssistantRepository {
    constructor(private readonly datasource: AssistantDataSource) { }

    async create(createDto: CreateAssistantDto): Promise<AssistantEntity> {
        return await this.datasource.create(createDto);
    }

    async createWithConfig(createWithConfigDto: CreateAssistantWithConfigDto): Promise<AssistantEntity> {
        return await this.datasource.createWithConfig(createWithConfigDto);
    }
}
