// src\features\assistants\domain\entities\assistant.entity.ts

import { AppError, ZERO } from '../../../../core';
import { AssistantConfigEntity } from './assistantMetadata.entity';

type AssistantStatus = "active" | "inactive"

export class AssistantEntity {
    constructor(
        public id: string,
        public name: string,
        public version: string,
        public description: string,
        public status: AssistantStatus = 'active',
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
        public metadataId: string | null = null,
        public metadata: AssistantConfigEntity | null = null
    ) { }

    public static fromJson(obj: Record<string, unknown>): AssistantEntity {

        const {
            id, name, version, description, status = 'active',
            createdAt = new Date(), updatedAt = new Date(), metadataId = null, metadata = null
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
            metadataId as string | null,
            metadata ? AssistantConfigEntity.fromJson(metadata as Record<string, unknown>) : null
        );
    }
}
