// src\features\assistants\domain\datasources\datasource.ts

import { type PaginationDto, type PaginationResponseEntity } from '../../../shared';
import { CreateAssistantConfigDto } from '../dtos';
import { type AssistantConfigEntity } from '../entities';

export abstract class AssistantConfigDataSource {
    abstract create(createDto: CreateAssistantConfigDto): Promise<AssistantConfigEntity>;
}
