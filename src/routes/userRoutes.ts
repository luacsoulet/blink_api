import { FastifyInstance } from "fastify";
import { getUserById, getUsers } from "../controllers/userControllers";
import { userByIdSchema, usersSchema } from "../dtos/userDtos";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/', {
        schema: usersSchema
    }, getUsers);
    fastify.get('/:id', {
        schema: userByIdSchema
    }, getUserById);
}