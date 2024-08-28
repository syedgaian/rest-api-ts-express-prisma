// src/features/assistants/domain/usecase/create.usecase

import { type ChatWithAssistantDto } from '../dtos';
import { type ChatResponseEntity } from '../entities';
import { type AssistantRepository } from '../repositories/repository';

export interface ChatWithAssisTantUseCase {
    execute: (data: ChatWithAssistantDto) => Promise<ChatResponseEntity>;
}

export class ChatWithAssistant implements ChatWithAssisTantUseCase {
    constructor(private readonly repository: AssistantRepository) {
        console.log("created")
    }

    async execute(data: ChatWithAssistantDto): Promise<ChatResponseEntity> {
        console.log(data, "here")
        return await this.repository.chatWithAssistant(data);
    }
}