import { FastifySchema } from "fastify";

export interface PostDto {
    id: number;
    user_id: number;
    content: string;
    created_at: Date;
}

export interface CreatePostDto {
    title: string;
    content: string;
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
                    created_at: { type: 'string', format: 'date-time' },
                    username: { type: 'string' }
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

export const postsByUserSchema: FastifySchema = {
    description: 'Get all posts by a user',
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
                    created_at: { type: 'string', format: 'date-time' },
                    username: { type: 'string' }
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

export const createPostSchema: FastifySchema = {
    description: 'Create a new post',
    tags: ['Posts'],
    security: [{ bearerAuth: [] }],
    body: {
        type: 'object',
        properties: {
            content: { type: 'string' }
        }
    },
    response: {
        201: {
            description: 'Post created successfully',
            type: 'object',
            properties: {
                user_id: { type: 'number' },
                content: { type: 'string' },
                created_at: { type: 'string', format: 'date-time' },
                username: { type: 'string' }
            }
        },
        400: {
            description: 'Bad request',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        401: {
            description: 'Unauthorized - Token missing or invalid',
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

export const modifyPostSchema: FastifySchema = {
    description: 'Modify a post',
    tags: ['Posts'],
    security: [{ bearerAuth: [] }],
    body: {
        type: 'object',
        properties: {
            content: { type: 'string' }
        }
    },
    response: {
        200: {
            description: 'Post modified successfully',
            type: 'object',
            properties: {
                id: { type: 'number' },
                user_id: { type: 'number' },
                content: { type: 'string' },
                created_at: { type: 'string', format: 'date-time' },
                username: { type: 'string' }
            }
        },
        400: {
            description: 'Bad request',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        401: {
            description: 'Unauthorized - Token missing or invalid',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        404: {
            description: 'Post not found',
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

export const deletePostSchema: FastifySchema = {
    description: 'Delete a post',
    tags: ['Posts'],
    security: [{ bearerAuth: [] }],
    response: {
        200: {
            description: 'Post deleted successfully',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        401: {
            description: 'Unauthorized - Token missing or invalid',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        404: {
            description: 'Post not found',
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