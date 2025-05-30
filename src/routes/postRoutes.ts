import { FastifyInstance } from "fastify";
import { createPost, deletePost, getPosts, modifyPost } from "../controllers/postControllers";
import { createPostSchema, deletePostSchema, modifyPostSchema, postsSchema } from "../dtos/postDtos";
import { authenticate } from "../middleware/authMiddleware";

export default async function postRoutes(fastify: FastifyInstance) {
    fastify.get('/', {
        schema: postsSchema
    }, getPosts);

    fastify.post('/', {
        schema: createPostSchema,
        preHandler: [authenticate]
    }, createPost);

    fastify.put('/:id', {
        schema: modifyPostSchema,
        preHandler: [authenticate]
    }, modifyPost);

    fastify.delete('/:id', {
        schema: deletePostSchema,
        preHandler: [authenticate]
    }, deletePost);
}