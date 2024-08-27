// src\features\assistants-config\presentation\controller.ts

import { type NextFunction, type Request, type Response } from 'express';

import { type SuccessResponse, HttpCode, ONE, TEN } from '../../../core';
import { PaginationDto, type PaginationResponseEntity } from '../../shared';

import {
    CreateAssistantConfig,
    CreateAssistantConfigDto,
    type AssistantConfigEntity,
    type AssistantConfigRepository
} from '../domain';

interface Params {
    id: string;
}

interface RequestBody {
    assistantId: string,
    tools?: Array<string>,
    temperature?: number,
    topP?: number,
    agentType?: string,
    model?: string,
    deployedAt?: Date | null,
    lastActiveAt?: Date | null
}

interface RequestQuery {
    page: string;
    limit: string;
}

export class AssistantConfigController {
    //* Dependency injection
    constructor(private readonly repository: AssistantConfigRepository) { }


    public create = (
        req: Request<unknown, unknown, RequestBody>,
        res: Response<SuccessResponse<AssistantConfigEntity>>,
        next: NextFunction
    ): void => {
        const { assistantId, tools = [], temperature, topP, agentType, model, deployedAt, lastActiveAt } = req.body;
        const createDto = CreateAssistantConfigDto.create({ assistantId, tools, temperature, topP, agentType, model, deployedAt, lastActiveAt });
        new CreateAssistantConfig(this.repository)
            .execute(createDto)
            .then((result) => res.status(HttpCode.CREATED).json({ data: result }))
            .catch(next);
    };

}
