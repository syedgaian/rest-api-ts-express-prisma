// src\features\todos\presentation\controller.ts

import { type NextFunction, type Request, type Response } from 'express';

import { type SuccessResponse, HttpCode, ONE, TEN } from '../../../core';
import { PaginationDto, type PaginationResponseEntity } from '../../shared';

import {
    CreateAssistant,
    CreateAssistantDto,
    type AssistantEntity,
    type AssistantRepository
} from '../domain';

interface Params {
    id: string;
}

interface RequestBody {
    name: string;
    version: string;
    description: string;
}

interface RequestQuery {
    page: string;
    limit: string;
}

export class AssistantController {
    //* Dependency injection
    constructor(private readonly repository: AssistantRepository) { }


    public create = (
        req: Request<unknown, unknown, RequestBody>,
        res: Response<SuccessResponse<AssistantEntity>>,
        next: NextFunction
    ): void => {
        const { name, version, description } = req.body;
        const createDto = CreateAssistantDto.create({ name, version, description });
        new CreateAssistant(this.repository)
            .execute(createDto)
            .then((result) => res.status(HttpCode.CREATED).json({ data: result }))
            .catch(next);
    };

}
