import { type ValidationType, AppError, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';
import { type AssistantConfigEntity, AssistantStatus } from '../entities';

export class CreateAssistantWithConfigDto implements CoreDto<CreateAssistantWithConfigDto> {
    private constructor(
        public readonly name: string,
        public readonly version: string,
        public readonly description: string,
        public readonly status: AssistantStatus,
        public readonly config: AssistantConfigEntity
    ) {
        this.validate(this);
    }

    public validate(dto: CreateAssistantWithConfigDto): void {
        const errors: ValidationType[] = [];
        const { name, version, description, status, config } = dto;

        if (!name || name.length === ZERO) {
            errors.push({ constraint: 'name is required', fields: ['name'] });
        }

        if (!version || version.length === ZERO) {
            errors.push({ constraint: 'version is required', fields: ['version'] });
        }

        if (!description || description.length === ZERO) {
            errors.push({ constraint: "description is a required field!", fields: ["description"] })
        }

        if (!this.isAssistantStatus(status)) {
            errors.push({ constraint: "provide valid value for status i.e active, inactive etc", fields: ["status"] })
        }

        if (!config) {
            errors.push({ constraint: "assistant config is a required field! ", fields: ["config"] })
        }

        if (errors.length > ZERO) throw AppError.badRequest('Error validating create Assistant', errors);
    }

    /**
     * This method creates a new instance of this DTO class with the given
     * properties from body or query parameters.
     * @param object
     * @returns A new instance of this DTO
     */
    public static create(object: Record<string, unknown>): CreateAssistantWithConfigDto {
        const { name, version, description, status = AssistantStatus.ACTIVE, config } = object;

        return new CreateAssistantWithConfigDto(
            name as string,
            version as string,
            description as string,
            status as AssistantStatus,
            config as AssistantConfigEntity
        );
    }

    isAssistantStatus(value: string): value is AssistantStatus {
        return Object.values<string>(AssistantStatus).includes(value);
    }
}
