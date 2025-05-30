import { FastifyInstance } from "fastify";
import { getPostsByUser, getUserById, getUsers } from "../controllers/userControllers";
import { userByIdSchema, userPostsSchema, usersSchema } from "../dtos/userDtos";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/', {
        schema: usersSchema
    }, getUsers);

    fastify.get('/:id', {
        schema: userByIdSchema
    }, getUserById);

    fastify.get('/:id/posts', {
        schema: userPostsSchema
    }, getPostsByUser);
}