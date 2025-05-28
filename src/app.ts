import fastify, { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import jwt from '@fastify/jwt';
import postgres from '@fastify/postgres';
import { config } from 'dotenv';
import authRoutes from './routes/authRoutes';

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
            description: 'Documentation for the Blink social media API',
            version: '1.0.0'
        },
        host: 'localhost:4000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
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
app.get('/api/v1/ping', async () => {
    return { status: 'ok' };
});

export default app;