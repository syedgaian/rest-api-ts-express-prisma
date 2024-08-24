### Built with

- Node
- Typescript
- Express
- ESLint & Prettier
- Environment Variables
- Unit testing with Jest & Supertest
- Clean Architecture
- Repository Pattern
- Adapter Pattern
- Use Cases
- DTOs (Data Transfer Objects)

## Project Structure

```bash
root/
│
├── dist/
├── node_modules/
├── src/
│   ├── core/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── errors/
│   │   └── types/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── domain/
│   │   │   │   ├── datasources/
│   │   │   │   ├── dtos/
│   │   │   │   ├── entities/
│   │   │   │   ├── repositories/
│   │   │   │   └── usecases/
│   │   │   │
│   │   │   ├── infrastructure/
│   │   │   │   ├── local.datasource.impl.ts
│   │   │   │   └── repository.impl.ts
│   │   │   │
│   │   │   └── presentation/
│   │   │       ├── controller.ts
│   │   │       └── routes.ts
│   │   │
│   │   ├── shared/
│   │   │   ├── domain/
│   │   │   │   ├── dtos/
│   │   │   │   ├── entities/
│   │   │   └── presentation/
│   │   │       └── middlewares/
│   │   │
│   │   ├── todos/
│   │   │   ├── domain/
│   │   │   │   ├── datasources/
│   │   │   │   ├── dtos/
│   │   │   │   ├── entities/
│   │   │   │   ├── repositories/
│   │   │   │   └── usecases/
│   │   │   │
│   │   │   ├── infrastructure/
│   │   │   │   ├── local.datasource.impl.ts
│   │   │   │   └── repository.impl.ts
│   │   │   │
│   │   │   └── presentation/
│   │   │       ├── controller.ts
│   │   │       └── routes.ts
│   │   └── ...
│   ├── app.test.ts
│   ├── app.ts
│   ├── routes.ts
│   ├── server.ts
│   └── testServer.ts
├── .env
├── .env.template
├── .env.test
├── ...
├── package.json
└── ...
```
