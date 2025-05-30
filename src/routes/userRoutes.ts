import { FastifyInstance } from "fastify";
import { getPostsByUser, getUserById, getUsers, modifyUser } from "../controllers/userControllers";
import { modifyUserSchema, userByIdSchema, userPostsSchema, usersSchema } from "../dtos/userDtos";
import { authenticate } from "../middleware/authMiddleware";

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

    fastify.put('/:id', {
        schema: modifyUserSchema,
        preHandler: [authenticate]
    }, modifyUser);
}