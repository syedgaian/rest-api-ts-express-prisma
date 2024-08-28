// src\features\assistants\domain\datasources\datasource.ts

import { type PaginationDto, type PaginationResponseEntity } from '../../../shared';
import { type CreateAssistantWithConfigDto, type CreateAssistantDto, ChatWithAssistantDto } from '../dtos';
import { ChatResponseEntity, type AssistantEntity } from '../entities';

export abstract class AssistantDataSource {
    abstract create(createDto: CreateAssistantDto): Promise<AssistantEntity>;
    abstract createWithConfig(createWithConfigDto: CreateAssistantWithConfigDto): Promise<AssistantEntity>;
    abstract chatWithAssistant(chatWithAssistantDto: ChatWithAssistantDto): Promise<ChatResponseEntity>;
}
