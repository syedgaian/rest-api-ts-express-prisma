// src\features\assistants\domain\repositories\respository.ts

import { type PaginationDto, type PaginationResponseEntity } from '../../../shared';
import { ChatWithAssistantDto, CreateAssistantDto } from '../dtos';
import { CreateAssistantWithConfigDto } from '../dtos/create-with-config.dto';
import { type AssistantEntity } from '../entities';
import { ChatResponseEntity } from '../entities/chat-response.entity';

export abstract class AssistantRepository {
    abstract create(createDto: CreateAssistantDto): Promise<AssistantEntity>;
    abstract createWithConfig(createWithConfigDto: CreateAssistantWithConfigDto): Promise<AssistantEntity>;
    abstract chatWithAssistant(chatWithAssistantDto: ChatWithAssistantDto): Promise<ChatResponseEntity>;
}
