import { type ValidationType, AppError, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

export class ChatAssistantDto implements CoreDto<ChatAssistantDto> {
    private constructor(
        public readonly assistantId: string,
        public readonly prompt: string,
    ) {
        this.validate(this);
    }

    public validate(dto: ChatAssistantDto): void {
        const errors: ValidationType[] = [];
        const { assistantId, prompt } = dto;

        if (!assistantId || assistantId.length === ZERO) {
            errors.push({ constraint: 'assistantId is required', fields: ['assistantId'] });
        }

        if (!prompt || prompt.length === ZERO) {
            errors.push({ constraint: 'prompt is required', fields: ['prompt'] });
        }

        if (errors.length > ZERO) throw AppError.badRequest('Error validating create Assistant', errors);
    }

    /**
     * This method creates a new instance of this DTO class with the given
     * properties from body or query parameters.
     * @param object
     * @returns A new instance of this DTO
     */
    public static create(object: Record<string, unknown>): ChatAssistantDto {
        const { assistantId, prompt } = object;

        return new ChatAssistantDto(
            assistantId as string,
            prompt as string
        );
    }
}
