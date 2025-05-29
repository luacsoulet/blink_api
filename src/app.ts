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
    openapi: {
        info: {
            title: 'Blink API Documentation',
            description: 'Complete documentation of the Blink API, a minimalistic social media platform',
            version: '1.0.0',
            contact: {
                name: 'API Support',
                url: 'https://github.com/luacsoulet/blink_api',
                email: 'lucasmagalhaes45200@gmail.com'
            }
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    }
});

app.register(swaggerUi, {
    routePrefix: '/api/v1/api-docs',
    uiConfig: {
        docExpansion: 'list',
        persistAuthorization: true
    },
    staticCSP: true
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