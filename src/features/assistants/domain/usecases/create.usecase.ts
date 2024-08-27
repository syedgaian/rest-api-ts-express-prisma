// src/features/assistants/domain/usecase/create.usecase

import { type CreateAssistantDto } from '../dtos';
import { type AssistantEntity } from '../entities';
import { type AssistantRepository } from '../repositories/repository';

export interface CreateAssisTantUseCase {
    execute: (data: CreateAssistantDto) => Promise<AssistantEntity>;
}

export class CreateAssistant implements CreateAssisTantUseCase {
    constructor(private readonly repository: AssistantRepository) { }

    async execute(data: CreateAssistantDto): Promise<AssistantEntity> {
        return await this.repository.create(data);
    }
}