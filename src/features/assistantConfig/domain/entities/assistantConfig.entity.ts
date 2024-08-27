// src\features\assistants\domain\entities\assistantMetadata.entity.ts

import { AppError, ZERO } from '../../../../core';

export class AssistantConfigEntity {
    constructor(
        public id: string,
        public assistantId: string,
        public capabilities: Array<string> = [],
        public temperature: number = 0.7,
        public topP: number = 1.0,
        public agentType: string = 'LangGraph Agent',
        public model: string = 'gpt-4',
        public deployedAt: Date | null = null,
        public lastActiveAt: Date | null = null
    ) { }

    public static fromJson(obj: Record<string, unknown>): AssistantConfigEntity {
        const {
            id, assistantId, capabilities = [], temperature = 0.7,
            topP = 1.0, agentType = 'LangGraph Agent', model = 'gpt-4',
            deployedAt = null, lastActiveAt = null
        } = obj;

        if (!id) {
            throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);
        }
        if (!assistantId) {
            throw AppError.badRequest('This entity requires an assistantId', [{ constraint: 'assistantId is required', fields: ['assistantId'] }]);
        }
        return new AssistantConfigEntity(
            id as string,
            assistantId as string,
            capabilities as Array<string>,
            temperature as number,
            topP as number,
            agentType as string,
            model as string,
            deployedAt ? new Date(deployedAt as string) : null,
            lastActiveAt ? new Date(lastActiveAt as string) : null
        );
    }
}
