import { FastifySchema } from "fastify";

export interface PostDto {
    id: number;
    user_id: number;
    content: string;
    created_at: Date;
}

export const postsSchema: FastifySchema = {
    description: 'Get all posts',
    tags: ['Posts'],
    response: {
        200: {
            description: 'Posts fetched successfully',
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    user_id: { type: 'number' },
                    content: { type: 'string' },
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
            description: 'No posts found',
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