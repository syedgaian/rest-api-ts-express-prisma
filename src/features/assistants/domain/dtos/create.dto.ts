import { type ValidationType, AppError, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';
import { type AssistantConfigEntity, AssistantStatus } from '../entities';

export class CreateAssistantDto implements CoreDto<CreateAssistantDto> {
    private constructor(
        public readonly name: string,
        public readonly version: string,
        public readonly description: string,
        public readonly status: AssistantStatus
    ) {
        this.validate(this);
    }

    public validate(dto: CreateAssistantDto): void {
        const errors: ValidationType[] = [];
        const { name, version, description, status } = dto;

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



        if (errors.length > ZERO) throw AppError.badRequest('Error validating create Assistant', errors);
    }

    /**
     * This method creates a new instance of this DTO class with the given
     * properties from body or query parameters.
     * @param object
     * @returns A new instance of this DTO
     */
    public static create(object: Record<string, unknown>): CreateAssistantDto {
        const { name, version, description, status = AssistantStatus.ACTIVE } = object;

        return new CreateAssistantDto(
            name as string,
            version as string,
            description as string,
            status as AssistantStatus
        );
    }

    isAssistantStatus(value: string): value is AssistantStatus {
        return Object.values<string>(AssistantStatus).includes(value);
    }
}
