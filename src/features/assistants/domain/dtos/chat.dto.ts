import { type ValidationType, AppError, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

export class ChatWithAssistantDto implements CoreDto<ChatWithAssistantDto> {
    private constructor(
        public readonly assistantId: string,
        public readonly prompt: string,
    ) {
        this.validate(this);
    }

    public validate(dto: ChatWithAssistantDto): void {
        const errors: ValidationType[] = [];
        const { assistantId, prompt } = dto;

        if (!assistantId || assistantId.length === ZERO) {
            errors.push({ constraint: 'assistantId is required', fields: ['assistantId'] });
        }

        if (!prompt || prompt.length === ZERO) {
            errors.push({ constraint: 'prompt is required', fields: ['prompt'] });
        }

        if (errors.length > ZERO) throw AppError.badRequest('Error validating create chat Assistant', errors);
    }

    /**
     * This method creates a new instance of this DTO class with the given
     * properties from body or query parameters.
     * @param object
     * @returns A new instance of this DTO
     */
    public static create(object: Record<string, unknown>): ChatWithAssistantDto {
        const { assistantId, prompt } = object;

        return new ChatWithAssistantDto(
            assistantId as string,
            prompt as string
        );
    }
}
