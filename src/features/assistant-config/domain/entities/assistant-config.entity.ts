// src\features\assistants\domain\entities\assistantMetadata.entity.ts

import { AppError, DEFAULT_AGENT_TYPE, DEFAULT_MODEL, DEFAULT_TEMPERATURE, DEFAULT_TOPP, ZERO } from '../../../../core';

export class AssistantConfigEntity {
    constructor(
        public id: string,
        public assistantId: string,
        public instructions: string,
        public tools: Array<string> = [],
        public temperature: number = DEFAULT_TEMPERATURE,
        public topP: number = DEFAULT_TOPP,
        public agentType: string = DEFAULT_AGENT_TYPE,
        public model: string = DEFAULT_MODEL,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
        public deployedAt: Date | null = null,
        public lastActiveAt: Date | null = null
    ) { }

    public static fromJson(obj: Record<string, unknown>): AssistantConfigEntity {
        const {
            id, assistantId, tools = [], temperature = DEFAULT_TEMPERATURE,
            topP = DEFAULT_TOPP, agentType = DEFAULT_AGENT_TYPE, model = DEFAULT_MODEL, instructions,
            createdAt = new Date(), updatedAt = new Date(), deployedAt = null, lastActiveAt = null
        } = obj;

        if (!assistantId) {
            throw AppError.badRequest('This AssistantConfig requires an assistantId', [{ constraint: 'assistantId is required', fields: ['assistantId'] }]);
        }

        if (!instructions || (instructions as string).length === ZERO) {
            throw AppError.badRequest('This AssistantConfig requires an instructions', [{ constraint: 'instructions is required', fields: ['instructions'] }]);
        }

        return new AssistantConfigEntity(
            id as string,
            assistantId as string,
            instructions as string,
            tools as Array<string>,
            temperature as number,
            topP as number,
            agentType as string,
            model as string,
            new Date(createdAt as string),
            new Date(updatedAt as string),
            deployedAt ? new Date(deployedAt as string) : null,
            lastActiveAt ? new Date(lastActiveAt as string) : null
        );
    }
}
