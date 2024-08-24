// src\features\assistants\domain\entities\assistant.entity.ts

import { AppError, ZERO } from '../../../../core';
import { AssistantMetadataEntity } from './assistantMetadata.entity';

export class AssistantEntity {
    constructor(
        public id: string,
        public name: string,
        public version: string,
        public description: string | null = null,
        public status: string = 'active',
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
        public metadata: AssistantMetadataEntity | null = null
    ) { }

    public static fromJson(obj: Record<string, unknown>): AssistantEntity {
        const {
            id, name, version, description = null, status = 'active',
            createdAt = new Date(), updatedAt = new Date(), metadata = null
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
        return new AssistantEntity(
            id as string,
            name as string,
            version as string,
            description as string | null,
            status as string,
            new Date(createdAt as string),
            new Date(updatedAt as string),
            metadata ? AssistantMetadataEntity.fromJson(metadata as Record<string, unknown>) : null
        );
    }
}
