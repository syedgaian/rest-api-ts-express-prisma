// src\features\assistants\domain\entities\assistantMetadata.entity.ts

import { AppError, ZERO } from '../../../../core';

export class AssistantMetadataEntity {
    constructor(
        public id: string,
        public assistantId: string,
        public languages: string[] = [],
        public capabilities: string[] = [],
        public maxTokens: number = 0,
        public temperature: number = 0.7,
        public topP: number = 1.0,
        public frequencyPenalty: number = 0.0,
        public presencePenalty: number = 0.0,
        public agentType: string = 'LangGraph Agent',
        public model: string = 'gpt-4',
        public apiKey: string | null = null,
        public trainingDataCutoff: Date | null = null,
        public deployedAt: Date | null = null,
        public lastActiveAt: Date | null = null
    ) { }

    public static fromJson(obj: Record<string, unknown>): AssistantMetadataEntity {
        const {
            id, assistantId, languages = [], capabilities = [], maxTokens = 0,
            temperature = 0.7, topP = 1.0, frequencyPenalty = 0.0, presencePenalty = 0.0,
            agentType = 'LangGraph Agent', model = 'gpt-4', apiKey = null,
            trainingDataCutoff = null, deployedAt = null, lastActiveAt = null
        } = obj;

        if (!id) {
            throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);
        }
        if (!assistantId) {
            throw AppError.badRequest('This entity requires an assistantId', [{ constraint: 'assistantId is required', fields: ['assistantId'] }]);
        }
        return new AssistantMetadataEntity(
            id as string,
            assistantId as string,
            languages as string[],
            capabilities as string[],
            maxTokens as number,
            temperature as number,
            topP as number,
            frequencyPenalty as number,
            presencePenalty as number,
            agentType as string,
            model as string,
            apiKey as string | null,
            trainingDataCutoff ? new Date(trainingDataCutoff as string) : null,
            deployedAt ? new Date(deployedAt as string) : null,
            lastActiveAt ? new Date(lastActiveAt as string) : null
        );
    }
}
