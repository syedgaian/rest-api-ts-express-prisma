// src\features\assistants\presentation\controller.ts

import { type NextFunction, type Request, type Response } from 'express';

import { type SuccessResponse, HttpCode, ONE, TEN } from '../../../core';
import { PaginationDto, type PaginationResponseEntity } from '../../shared';

import {
    ChatResponseEntity,
    ChatWithAssistant,
    ChatWithAssistantDto,
    CreateAssistant,
    CreateAssistantDto,
    CreateAssistantWithConfig,
    CreateAssistantWithConfigDto,
    type AssistantConfigEntity,
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
    status?: string
    config?: AssistantConfigEntity
}

interface CreateQueryParams {
    withConfig: boolean
}

interface ChatRequestBody {
    prompt: string,
    assistantId: string,
    threadId?: string
}

interface RequestQuery {
    page: string;
    limit: string;
}

export class AssistantController {
    //* Dependency injection
    constructor(
        private readonly assistantRepository: AssistantRepository,
    ) { }


    public create = (
        req: Request<unknown, unknown, RequestBody, CreateQueryParams>,
        res: Response<SuccessResponse<AssistantEntity>>,
        next: NextFunction
    ): void => {
        const { name, version, description, status, config = {} } = req.body;
        const { withConfig = false } = req.query;
        if (withConfig) {
            const createWithConfigDto = CreateAssistantWithConfigDto.create({ name, version, description, status, config });
            new CreateAssistantWithConfig(this.assistantRepository)
                .execute(createWithConfigDto)
                .then((assistant) => res.status(HttpCode.CREATED).json({ data: assistant }))
                .catch(next);

        } else {
            const createDto = CreateAssistantDto.create({ name, version, description, status });
            new CreateAssistant(this.assistantRepository)
                .execute(createDto)
                .then((assistant) => res.status(HttpCode.CREATED).json({ data: assistant }))
                .catch(next);
        }
    };

    public chatWithAssistant = (
        req: Request<unknown, unknown, ChatRequestBody>,
        res: Response<SuccessResponse<ChatResponseEntity>>,
        next: NextFunction
    ) => {
        const { prompt, assistantId, threadId } = req.body;

        const chatWithAssistantDto = ChatWithAssistantDto.create({ prompt, assistantId, threadId });
        new ChatWithAssistant(this.assistantRepository)
            .execute(chatWithAssistantDto)
            .then((data) => res.status(HttpCode.OK).json({ data }))
            .catch(next)
    }

}
