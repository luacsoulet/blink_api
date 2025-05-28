import { FastifySchema } from "fastify";

export interface LoginDto {
    email: string;
    password: string;
}

export const loginSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                token: { type: 'string' },
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        email: { type: 'string' },
                        username: { type: 'string' },
                        is_admin: { type: 'boolean' },
                    }
                }
            }
        }
    }
};
