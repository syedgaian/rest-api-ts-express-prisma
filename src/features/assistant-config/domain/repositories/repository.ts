// src\features\assistants\domain\repositories\respository.ts

import { type PaginationDto, type PaginationResponseEntity } from '../../../shared';
import { CreateAssistantConfigDto } from '../dtos';
import { type AssistantConfigEntity } from '../entities';

export abstract class AssistantConfigRepository {
    abstract create(createDto: CreateAssistantConfigDto): Promise<AssistantConfigEntity>;
}
