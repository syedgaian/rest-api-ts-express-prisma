// src\features\assistants\presentation\routes.ts

import { Router } from 'express';

import { AssistantConfigController } from './controller';
import { AuthDatasourceImpl, AuthMiddleware, AuthRepositoryImpl } from '../../auth';
import { AssistantConfigDatasourceImpl, AssistantConfigRepositoryImpl } from '../infrastructure';

export class AssistantRoutes {
    static get routes(): Router {
        const router = Router();

        //* This datasource can be change
        const datasource = new AssistantConfigDatasourceImpl();
        const repository = new AssistantConfigRepositoryImpl(datasource);
        const controller = new AssistantConfigController(repository);

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
