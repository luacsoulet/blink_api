import { FastifyInstance } from "fastify";
import { deleteUser, getPostsByUser, getUserById, getUsers, modifyUser, searchUsersByUsername } from "../controllers/userControllers";
import { deleteUserSchema, modifyUserSchema, searchUsersByUsernameSchema, userByIdSchema, userPostsSchema, usersSchema } from "../dtos/userDtos";
import { authenticate } from "../middleware/authMiddleware";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/', {
        schema: usersSchema
    }, getUsers);

    fastify.get('/search', {
        schema: searchUsersByUsernameSchema
    }, searchUsersByUsername);

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

    fastify.delete('/:id', {
        schema: deleteUserSchema,
        preHandler: [authenticate]
    }, deleteUser);
}