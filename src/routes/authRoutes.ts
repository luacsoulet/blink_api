import { FastifyInstance } from "fastify";
import { loginUser, registerUser } from "../controllers/authControllers";
import { loginSchema, registerSchema } from "../dtos/authDtos";

export default async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/login', {
        schema: loginSchema
    }, loginUser);
    fastify.post('/register', {
        schema: registerSchema
    }, registerUser);
}