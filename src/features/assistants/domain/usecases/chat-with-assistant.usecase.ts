// src/features/assistants/domain/usecase/create.usecase

import { type ChatWithAssistantDto, type CreateAssistantDto } from '../dtos';
import { ChatResponseEntity, type AssistantEntity } from '../entities';
import { type AssistantRepository } from '../repositories/repository';

export interface ChatWithAssistantUseCase {
    execute: (data: ChatWithAssistantDto) => Promise<ChatResponseEntity>;
}

export class ChatWithAssistant implements ChatWithAssistantUseCase {
    constructor(private readonly repository: AssistantRepository) { }

    async execute(data: ChatWithAssistantDto): Promise<ChatResponseEntity> {
        return await this.repository.chatWithAssistant(data);
    }
}