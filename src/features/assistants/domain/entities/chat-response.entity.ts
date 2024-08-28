// src\features\assistants\domain\entities\assistant.entity.ts

import { AppError, ZERO } from '../../../../core';

export class ChatResponseEntity {
    constructor(
        public assistantId: string,
        public prompt: string,
        public response: string,
    ) { }

    public static fromJson(obj: Record<string, unknown>): ChatResponseEntity {

        const { assistantId, prompt, response } = obj;

        if (!assistantId) {
            throw AppError.badRequest('This entity requires an assistantId', [{ constraint: 'assistantId is required', fields: ['assistantId'] }]);
        }
        if (!prompt || (prompt as string).length === ZERO) {
            throw AppError.badRequest('This entity requires a prompt', [{ constraint: 'prompt is required', fields: ['prompt'] }]);
        }

        if (!response || (response as string).length === ZERO) {
            throw AppError.badRequest('This entity response a prompt', [{ constraint: 'response is required', fields: ['response'] }]);
        }

        return new ChatResponseEntity(
            assistantId as string,
            prompt as string,
            response as string
        );
    }
}
