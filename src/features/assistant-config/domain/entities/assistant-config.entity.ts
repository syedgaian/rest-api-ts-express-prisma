// src\features\assistants\domain\entities\assistantMetadata.entity.ts

import { AppError, DEFAULT_AGENT_TYPE, DEFAULT_MODEL, DEFAULT_TEMPERATURE, DEFAULT_TOPP } from '../../../../core';

export class AssistantConfigEntity {
    constructor(
        public id: string,
        public assistantId: string,
        public tools: Array<string> = [],
        public temperature: number = DEFAULT_TEMPERATURE,
        public topP: number = DEFAULT_TOPP,
        public agentType: string = DEFAULT_AGENT_TYPE,
        public model: string = DEFAULT_MODEL,
        public deployedAt: Date | null = null,
        public lastActiveAt: Date | null = null
    ) { }

    public static fromJson(obj: Record<string, unknown>): AssistantConfigEntity {
        const {
            id, assistantId, tools = [], temperature = DEFAULT_TEMPERATURE,
            topP = DEFAULT_TOPP, agentType = DEFAULT_AGENT_TYPE, model = DEFAULT_MODEL,
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
            tools as Array<string>,
            temperature as number,
            topP as number,
            agentType as string,
            model as string,
            deployedAt ? new Date(deployedAt as string) : null,
            lastActiveAt ? new Date(lastActiveAt as string) : null
        );
    }
}
