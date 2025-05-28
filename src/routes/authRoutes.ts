import { FastifyInstance } from "fastify";
import { loginUser } from "../controllers/authControllers";

export default async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/login', loginUser);
}