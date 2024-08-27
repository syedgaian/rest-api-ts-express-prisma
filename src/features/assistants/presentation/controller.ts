// src\features\assistants\presentation\controller.ts

import { type NextFunction, type Request, type Response } from 'express';

import { type SuccessResponse, HttpCode, ONE, TEN } from '../../../core';
import { PaginationDto, type PaginationResponseEntity } from '../../shared';

import {
    CreateAssistant,
    CreateAssistantDto,
    type AssistantConfigEntity,
    type AssistantEntity,
    type AssistantRepository
} from '../domain';
import { AssistantConfigRepository, CreateAssistantConfig, CreateAssistantConfigDto } from '../../assistant-config';

interface Params {
    id: string;
}

interface RequestBody {
    name: string;
    version: string;
    description: string;
    status?: string
    config?: AssistantConfigEntity
}

interface CreateQueryParams {
    withConfig: boolean
}

interface RequestQuery {
    page: string;
    limit: string;
}

export class AssistantController {
    //* Dependency injection
    constructor(
        private readonly assistantRepository: AssistantRepository,
        private readonly assistantConfigRepository: AssistantConfigRepository
    ) { }


    public create = (
        req: Request<unknown, unknown, RequestBody, CreateQueryParams>,
        res: Response<SuccessResponse<AssistantEntity>>,
        next: NextFunction
    ): void => {
        const { name, version, description, status, config = {} } = req.body;
        const { withConfig = false } = req.query;
        const createDto = CreateAssistantDto.create({ name, version, description, status });
        new CreateAssistant(this.assistantRepository)
            .execute(createDto)
            .then((assistant) => {
                if (withConfig) {
                    const createConfigDto = CreateAssistantConfigDto.create({ assistantId: assistant.id, ...config });
                    new CreateAssistantConfig(this.assistantConfigRepository)
                        .execute(createConfigDto)
                        .then((config) => {
                            return res.status(HttpCode.CREATED).json({ data: { ...assistant, config } })
                        })
                        .catch(next);
                } else {
                    return res.status(HttpCode.CREATED).json({ data: assistant })
                }
            })
            .catch(next);
    };

}
