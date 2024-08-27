// src\routes.ts

import { Router } from 'express';

import { TodoRoutes } from './features/todos';
import { AuthRoutes } from './features/auth';
import { AssistantRoutes } from './features/assistants';
import { AssistantConfigRoutes } from './features/assistant-config';

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/auth', AuthRoutes.routes);
        router.use('/todos', TodoRoutes.routes);
        router.use('/assistant', AssistantRoutes.routes);
        router.use('/assistant/config', AssistantConfigRoutes.routes);

        // rest of routes
        // ...

        return router;
    }
}
