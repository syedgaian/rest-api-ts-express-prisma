// src/features/auth/infrastructure/local.datasource.impl.ts

import { AppError, ONE, basicEncript, basicJWT } from '../../../core';
import {
    UserEntity,
    AuthEntity,
    type RegisterUserDto,
    type AuthDatasource,
    type LoginUserDto
} from '../domain';
import { PrismaClient } from '@prisma/client'

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
