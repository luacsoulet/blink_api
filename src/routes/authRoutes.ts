import { FastifyInstance } from "fastify";
import { loginUser } from "../controllers/authControllers";
import { loginSchema } from "../dtos/authDtos";

export default async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/login', {
        schema: loginSchema
    }, loginUser);
}