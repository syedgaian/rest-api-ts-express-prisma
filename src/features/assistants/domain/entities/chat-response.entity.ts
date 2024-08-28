// src\features\assistants\domain\entities\assistant.entity.ts

import { AppError, ZERO } from '../../../../core';

export class AssistantEntity {
    constructor(
        public assistantId: string,
        public prompt: string,
    ) { }

    public static fromJson(obj: Record<string, unknown>): AssistantEntity {

        const { assistantId, prompt } = obj;

        if (!assistantId) {
            throw AppError.badRequest('This entity requires an assistantId', [{ constraint: 'assistantId is required', fields: ['assistantId'] }]);
        }
        if (!prompt || (prompt as string).length === ZERO) {
            throw AppError.badRequest('This entity requires a prompt', [{ constraint: 'prompt is required', fields: ['prompt'] }]);
        }

        return new AssistantEntity(
            assistantId as string,
            prompt as string,
        );
    }
}
