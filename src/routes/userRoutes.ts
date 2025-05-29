import { FastifyInstance } from "fastify";
import { getUserById, getUsers } from "../controllers/userControllers";
import { userByIdSchema, usersSchema } from "../dtos/userDtos";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/users', {
        schema: usersSchema
    }, getUsers);
    fastify.get('/users/:id', {
        schema: userByIdSchema
    }, getUserById);
}