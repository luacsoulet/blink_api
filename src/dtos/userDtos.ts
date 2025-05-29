import { FastifySchema } from "fastify";

export interface UserDto {
    id: number;
    username: string;
    email: string;
    created_at: Date;
}

export const usersSchema: FastifySchema = {
    description: 'Get all users',
    tags: ['Users'],
    response: {
        200: {
            description: 'Users fetched successfully',
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    username: { type: 'string' },
                    email: { type: 'string' },
                    created_at: { type: 'string', format: 'date-time' }
                }
            }
        },
        400: {
            description: 'Bad request',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        404: {
            description: 'No users found',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        500: {
            description: 'Internal server error',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
}

export const userByIdSchema: FastifySchema = {
    description: 'Get a user by id',
    tags: ['Users'],
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }
        }
    },
    response: {
        200: {
            description: 'User fetched successfully',
            type: 'object',
            properties: {
                id: { type: 'number' },
                username: { type: 'string' },
                email: { type: 'string' },
                created_at: { type: 'string', format: 'date-time' }
            }
        },
        400: {
            description: 'Bad request',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        404: {
            description: 'User not found',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        500: {
            description: 'Internal server error',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
}