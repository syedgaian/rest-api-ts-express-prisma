// src\features\assistants\domain\datasources\datasource.ts

import { type PaginationDto, type PaginationResponseEntity } from '../../../shared';
import { type CreateAssistantDto } from '../dtos';
import { type AssistantEntity } from '../entities';

export abstract class AssistantDataSource {
    abstract create(createDto: CreateAssistantDto): Promise<AssistantEntity>;
}
