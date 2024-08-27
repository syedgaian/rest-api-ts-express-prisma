import { type CreateAssistantConfigDto } from '../dtos';
import { type AssistantConfigEntity } from '../entities';
import { AssistantConfigRepository } from '../repositories/repository';

export interface CreateAssisTantUseCase {
    execute: (data: CreateAssistantConfigDto) => Promise<AssistantConfigEntity>;
}

export class CreateAssistant implements CreateAssisTantUseCase {
    constructor(private readonly repository: AssistantConfigRepository) { }

    async execute(data: CreateAssistantConfigDto): Promise<AssistantConfigEntity> {
        return await this.repository.create(data);
    }
}