// src/features/auth/infraestructure/local.datasource.impl.ts

import { AppError, ONE, basicEncript, basicJWT } from '../../../core';
import {
    UserEntity,
    AuthEntity,
    Role,
    type RegisterUserDto,
    type AuthDatasource,
    type LoginUserDto
} from '../domain';
import { PrismaClient } from '@prisma/client'

const USERS_MOCK = [
    {
        id: '1',
        name: 'Test User',
        email: 'test@test.com',
        emailVerified: false,
        password: 'ca0711461f3b8387d01cc0c0cf532a4fb4b5fdf0207f7902fa75580718da497a',
        role: Role.USER,
        avatar: 'https://avatars.dicebear.com/api/initials/T.svg'
    },
    {
        id: '2',
        name: 'Test User 2',
        email: 'test2@test.com',
        emailVerified: false,
        password: 'ca0711461f3b8387d01cc0c0cf532a4fb4b5fdf0207f7902fa75580718da497a',
        role: Role.USER
    }
];

export class AuthDatasourceImpl implements AuthDatasource {
    private readonly prisma = new PrismaClient({})

    public async register(dto: RegisterUserDto): Promise<AuthEntity> {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });
        if (existingUser) {
            throw AppError.badRequest('User already exists', [{ constraint: 'User already exists', fields: ['email'] }]);
        }

        const newUser = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: basicEncript.hashPassword(dto.password),
                emailVerified: false
            }
        })
        // Create the auth entity (omit the password)
        const { password, ...rest } = UserEntity.fromJson(newUser);
        const token = basicJWT.generateToken({ id: newUser.id });
        // ? Here you can verify if the token is created correctly before to send it to the client
        return new AuthEntity(rest, token);
    }

    public async login(dto: LoginUserDto): Promise<AuthEntity> {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });
        if (!existingUser) {
            throw AppError.badRequest('User with this email not found');
        }
        const isPasswordMatch = basicEncript.comparePassword(dto.password, existingUser.password);
        if (!isPasswordMatch) throw AppError.badRequest('Invalid password');
        const { password, ...rest } = UserEntity.fromJson({ ...existingUser });
        const token = basicJWT.generateToken({ id: existingUser.id });
        // ? Here you can verify if the token is created correctly before to send it to the client
        return new AuthEntity(rest, token);
    }

    public async getUserById(userId: string): Promise<UserEntity> {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!existingUser) {
            throw AppError.badRequest('User with this id not found');
        }
        return UserEntity.fromJson({ ...existingUser });
    }
}
