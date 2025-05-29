import fastify, { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import jwt from '@fastify/jwt';
import postgres from '@fastify/postgres';
import { config } from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';

config();

const app: FastifyInstance = fastify({
    logger: {
        transport: {
            target: 'pino-pretty'
        }
    }
});

app.register(postgres, {
    connectionString: process.env.DATABASE_URL
});

app.register(swagger, {
    swagger: {
        info: {
            title: 'Blink API Documentation',
            description: 'Complete documentation of the Blink API, a minimalistic social media platform',
            version: '1.0.0',
            contact: {
                name: 'API Support',
                url: 'https://github.com/luacsoulet/blink_api/issues',
                email: 'lucasmagalhaes45200@gmail.com'
            },
            license: {
                name: 'ISC',
                url: 'https://opensource.org/licenses/ISC'
            }
        },
        externalDocs: {
            description: 'For more information, visit our repository',
            url: 'https://github.com/luacsoulet/blink_api'
        },
        host: 'localhost:4000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            {
                name: 'Authentication',
                description: 'Endpoints related to user authentication'
            },
            {
                name: 'Users',
                description: 'User management'
            }
        ],
        securityDefinitions: {
            apiKey: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
                description: 'Add your JWT token with the Bearer prefix. Example: "Bearer your_jwt_token"'
            }
        },
        definitions: {
            LoginRequest: {
                type: 'object',
                properties: {
                    email: {
                        type: 'string',
                        example: 'user@example.com'
                    },
                    password: {
                        type: 'string',
                        example: 'password123'
                    }
                }
            },
            LoginResponse: {
                type: 'object',
                properties: {
                    token: {
                        type: 'string',
                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                    },
                    user: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'number',
                                example: 1
                            },
                            email: {
                                type: 'string',
                                example: 'user@example.com'
                            },
                            username: {
                                type: 'string',
                                example: 'johndoe'
                            },
                            is_admin: {
                                type: 'boolean',
                                example: false
                            }
                        }
                    }
                }
            },
            RegisterRequest: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', minLength: 6 }
                }
            },
            RegisterResponse: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    username: { type: 'string' },
                    email: { type: 'string' }
                }
            }
        }
    }
});

app.register(swaggerUi, {
    routePrefix: '/api/v1/api-docs',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    }
});

app.register(jwt, {
    secret: process.env.JWT_SECRET || 'your-secret-key'
});

app.register(authRoutes, { prefix: '/api/v1/auth' });
app.register(userRoutes, { prefix: '/api/v1/users' });
app.register(postRoutes, { prefix: '/api/v1/posts' });
app.get('/api/v1/ping', async () => {
    return { status: 'ok' };
});

export default app;