// src\features\assistants\presentation\routes.ts

import { Router } from 'express';

import { AssistantController } from './controller';
import { AuthDatasourceImpl, AuthMiddleware, AuthRepositoryImpl } from '../../auth';
import { AssistantDatasourceImpl, AssistantRepositoryImpl } from '../infrastructure';
import { AssistantConfigDatasourceImpl, AssistantConfigRepositoryImpl } from '../../assistant-config';

export class AssistantRoutes {
    static get routes(): Router {
        const router = Router();

        const assistantConfigDatasource = new AssistantConfigDatasourceImpl();
        const assistantConfigRepository = new AssistantConfigRepositoryImpl(assistantConfigDatasource)

        //* This datasource can be change
        const datasource = new AssistantDatasourceImpl();
        const repository = new AssistantRepositoryImpl(datasource);
        const controller = new AssistantController(repository, assistantConfigRepository);

        // * Authentication middleware
        const authDatasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(authDatasource);
        const authMiddleware = new AuthMiddleware(authRepository);

        router.post('/', [authMiddleware.validateJWT], controller.create);

        // rest of operations
        // ...

        return router;
    }
}
