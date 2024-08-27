// src\features\assistants\domain\entities\assistant.entity.ts

import { AppError, ZERO } from '../../../../core';
import { AssistantConfigEntity } from '../../../assistant-config/domain/entities/assistant-config.entity';

export enum AssistantStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}

export class AssistantEntity {
    constructor(
        public id: string,
        public name: string,
        public version: string,
        public description: string,
        public status: AssistantStatus = AssistantStatus.ACTIVE,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
        public configId: string | null = null,
        public config: AssistantConfigEntity | null = null
    ) { }

    public static fromJson(obj: Record<string, unknown>): AssistantEntity {

        const {
            id, name, version, description, status = 'active',
            createdAt = new Date(), updatedAt = new Date(), configId = null, config = null
        } = obj;

        if (!id) {
            throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);
        }
        if (!name || (name as string).length === ZERO) {
            throw AppError.badRequest('This entity requires a name', [{ constraint: 'name is required', fields: ['name'] }]);
        }
        if (!version || (version as string).length === ZERO) {
            throw AppError.badRequest('This entity requires a version', [{ constraint: 'version is required', fields: ['version'] }]);
        }
        if (!description || (description as string).length === ZERO) {
            throw AppError.badRequest('This entity requires a description', [{ constraint: 'description is required', fields: ['description'] }]);
        }

        return new AssistantEntity(
            id as string,
            name as string,
            version as string,
            description as string,
            status as AssistantStatus,
            new Date(createdAt as string),
            new Date(updatedAt as string),
            configId as string | null,
            config ? AssistantConfigEntity.fromJson(config as Record<string, unknown>) : null
        );
    }
}
