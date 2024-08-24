import { type ValidationType, AppError, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

export class CreateAssistantDto implements CoreDto<CreateAssistantDto> {
    private constructor(
        public readonly name: string,
        public readonly version: string
    ) {
        this.validate(this);
    }

    public validate(dto: CreateAssistantDto): void {
        const errors: ValidationType[] = [];

        if (!dto.name || dto.name.length === ZERO) {
            throw AppError.badRequest('This entity requires a name', [{ constraint: 'name is required', fields: ['name'] }]);
        }
        if (!dto.version || dto.version.length === ZERO) {
            throw AppError.badRequest('This entity requires a version', [{ constraint: 'version is required', fields: ['version'] }]);
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
        const { name, version } = object;
        return new CreateAssistantDto(name as string, version as string);
    }
}
