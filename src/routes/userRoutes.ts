import { FastifyInstance } from "fastify";
import { getUsers } from "../controllers/userControllers";
import { usersSchema } from "../dtos/userDtos";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/users', {
        schema: usersSchema
    }, getUsers);
}