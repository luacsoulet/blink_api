import { FastifySchema } from "fastify";

export interface UserDto {
    id: number;
    username: string;
    email: string;
    description: string;
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
                    description: { type: 'string' },
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
                description: { type: 'string' },
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

export const userPostsSchema: FastifySchema = {
    description: 'Get all posts by a user',
    tags: ['Users'],
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }
        }
    },
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

export const modifyUserSchema: FastifySchema = {
    description: 'Modify a user',
    tags: ['Users'],
    security: [{ bearerAuth: [] }],
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }
        }
    },
    body: {
        type: 'object',
        properties: {
            username: { type: 'string', nullable: true },
            email: { type: 'string', nullable: true },
            description: { type: 'string', nullable: true }
        }
    },
    response: {
        200: {
            description: 'User modified successfully',
            type: 'object',
            properties: {
                id: { type: 'number' },
                username: { type: 'string' },
                email: { type: 'string' },
                description: { type: 'string' },
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
        401: {
            description: 'Unauthorized - Token missing or invalid',
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

export const deleteUserSchema: FastifySchema = {
    description: 'Delete a user',
    tags: ['Users'],
    security: [{ bearerAuth: [] }],
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }
        }
    },
    response: {
        200: {
            description: 'User deleted successfully',
            type: 'object',
            properties: {
                message: { type: 'string' }
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

export const searchUsersByUsernameSchema: FastifySchema = {
    description: 'Search users by username prefix',
    tags: ['Users'],
    querystring: {
        type: 'object',
        required: ['username'],
        properties: {
            username: {
                type: 'string',
                description: 'Username prefix to search for'
            }
        }
    },
    response: {
        200: {
            description: 'Users found successfully',
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    username: { type: 'string' },
                    email: { type: 'string' },
                    description: { type: 'string' },
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
};