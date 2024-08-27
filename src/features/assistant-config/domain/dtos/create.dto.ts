import { AppError, DEFAULT_AGENT_TYPE, DEFAULT_MODEL, DEFAULT_TEMPERATURE, DEFAULT_TOPP, ValidationType, ZERO } from "../../../../core";
import { CoreDto } from "../../../shared";

export class CreateAssistantConfigDto implements CoreDto<CreateAssistantConfigDto> {

    constructor(
        public readonly assistantId: string,
        public readonly instructions: string,
        public readonly tools: Array<string> = [],
        public readonly temperature: number = DEFAULT_TEMPERATURE,
        public readonly topP: number = DEFAULT_TOPP,
        public readonly agentType: string = DEFAULT_AGENT_TYPE,
        public readonly model: string = DEFAULT_MODEL,
        public readonly deployedAt: Date | null = null,
        public readonly lastActiveAt: Date | null = null
    ) {
        this.validate(this)
    }

    validate(dto: CreateAssistantConfigDto): void {
        const errors: ValidationType[] = [];
        const { assistantId, instructions } = dto;

        if (!assistantId || assistantId.length === ZERO) {
            errors.push({ constraint: 'assistantId is required', fields: ['assistantId'] });
        }

        if (!instructions || instructions.length === ZERO) {
            errors.push({ constraint: 'instructions is required', fields: ['instructions'] });
        }

        if (errors.length > ZERO) throw AppError.badRequest('Error validating create AssistantConfig', errors);
    }

    /**
     * This method creates a new instance of this DTO class with the given
     * properties from body or query parameters.
     * @param object
     * @returns A new instance of this DTO
     */
    public static create(object: Record<string, unknown>): CreateAssistantConfigDto {
        const {
            assistantId,
            instructions,
            tools = [],
            temperature = DEFAULT_TEMPERATURE,
            topP = DEFAULT_TOPP,
            agentType = DEFAULT_AGENT_TYPE,
            model = DEFAULT_MODEL,
            deployedAt = null,
            lastActiveAt = null
        } = object;

        return new CreateAssistantConfigDto(
            assistantId as string,
            instructions as string,
            tools as Array<string>,
            temperature as number,
            topP as number,
            agentType as string,
            model as string,
            deployedAt as Date | null,
            lastActiveAt as Date | null
        );
    }
}