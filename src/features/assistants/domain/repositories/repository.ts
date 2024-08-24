// src\features\assistants\domain\repositories\respository.ts

import { type PaginationDto, type PaginationResponseEntity } from '../../../shared';
import { CreateAssistantDto } from '../dtos';
import { type AssistantEntity } from '../entities';

export abstract class AssistantRepository {
    abstract create(createDto: CreateAssistantDto): Promise<AssistantEntity>;
}
