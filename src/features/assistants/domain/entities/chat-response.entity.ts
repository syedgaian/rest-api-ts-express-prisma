// src\features\assistants\domain\entities\assistant.entity.ts

import { AppError, ZERO } from '../../../../core';

export class ChatResponseEntity {
    constructor(
        public assistantId: string,
        public prompt: string,
        public threadId: string,
        public response: Record<string, unknown>,
    ) { }

    public static fromJson(obj: Record<string, unknown>): ChatResponseEntity {

        const { assistantId, prompt, threadId, response } = obj;

        if (!assistantId) {
            throw AppError.badRequest('This entity requires an assistantId', [{ constraint: 'assistantId is required', fields: ['assistantId'] }]);
        }
        if (!prompt || (prompt as string).length === ZERO) {
            throw AppError.badRequest('This entity requires a prompt', [{ constraint: 'prompt is required', fields: ['prompt'] }]);
        }

        if (!threadId || (threadId as string).length === ZERO) {
            throw AppError.badRequest('This entity requires a threadId', [{ constraint: 'threadId is required', fields: ['threadId'] }]);
        }

        if (!response || (response as string).length === ZERO) {
            throw AppError.badRequest('This entity response a prompt', [{ constraint: 'response is required', fields: ['response'] }]);
        }

        return new ChatResponseEntity(
            assistantId as string,
            prompt as string,
            threadId as string,
            response as Record<string, unknown>
        );
    }
}
