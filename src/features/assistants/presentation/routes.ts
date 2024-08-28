// src\features\assistants\presentation\routes.ts

import { Router } from 'express';

import { AssistantController } from './controller';
import { AuthDatasourceImpl, AuthMiddleware, AuthRepositoryImpl } from '../../auth';
import { AssistantDatasourceImpl, AssistantRepositoryImpl } from '../infrastructure';

export class AssistantRoutes {
    static get routes(): Router {
        const router = Router();

        //* This datasource can be change
        const datasource = new AssistantDatasourceImpl();
        const repository = new AssistantRepositoryImpl(datasource);
        const controller = new AssistantController(repository);

        // * Authentication middleware
        const authDatasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(authDatasource);
        const authMiddleware = new AuthMiddleware(authRepository);

        router.post('/', [authMiddleware.validateJWT], controller.create);
        router.post("/chat", controller.chatWithAssistant);

        // rest of operations
        // ...

        return router;
    }
}
