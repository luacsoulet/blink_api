import { FastifyInstance } from "fastify";
import { createPost, deletePost, getPosts, getPostsByUser, modifyPost } from "../controllers/postControllers";
import { createPostSchema, deletePostSchema, modifyPostSchema, postsByUserSchema, postsSchema } from "../dtos/postDtos";
import { authenticate } from "../middleware/authMiddleware";

export default async function postRoutes(fastify: FastifyInstance) {
    fastify.get('/', {
        schema: postsSchema
    }, getPosts);

    fastify.get('/user/:id', {
        schema: postsByUserSchema
    }, getPostsByUser);

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