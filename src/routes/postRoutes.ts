import { FastifyInstance } from "fastify";
import { createPost, getPosts } from "../controllers/postControllers";
import { createPostSchema, postsSchema } from "../dtos/postDtos";
import { authenticate } from "../middleware/authMiddleware";

export default async function postRoutes(fastify: FastifyInstance) {
    fastify.get('/', {
        schema: postsSchema
    }, getPosts);

    fastify.post('/', {
        schema: createPostSchema,
        preHandler: [authenticate]
    }, createPost);
}