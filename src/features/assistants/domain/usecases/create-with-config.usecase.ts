// src/features/assistants/domain/usecase/create-with-config.usecase

import { type CreateAssistantWithConfigDto } from '../dtos';
import { type AssistantEntity } from '../entities';
import { type AssistantRepository } from '../repositories/repository';

export interface CreateAssistantWithConfigUseCase {
    execute: (data: CreateAssistantWithConfigDto) => Promise<AssistantEntity>;
}

export class CreateAssistantWithConfig implements CreateAssistantWithConfigUseCase {
    constructor(private readonly repository: AssistantRepository) { }

    async execute(data: CreateAssistantWithConfigDto): Promise<AssistantEntity> {
        return await this.repository.createWithConfig(data);
    }
}