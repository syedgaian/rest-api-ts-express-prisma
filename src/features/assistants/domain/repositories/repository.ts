// src\features\assistants\domain\repositories\respository.ts

import { type PaginationDto, type PaginationResponseEntity } from '../../../shared';
import { CreateAssistantDto } from '../dtos';
import { CreateAssistantWithConfigDto } from '../dtos/create-with-config.dto';
import { type AssistantEntity } from '../entities';

export abstract class AssistantRepository {
    abstract create(createDto: CreateAssistantDto): Promise<AssistantEntity>;
    abstract createWithConfig(createWithConfigDto: CreateAssistantWithConfigDto): Promise<AssistantEntity>;
}
