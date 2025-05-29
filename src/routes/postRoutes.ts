import { FastifyInstance } from "fastify";
import { getPosts } from "../controllers/postControllers";
import { postsSchema } from "../dtos/postDtos";

export default async function postRoutes(fastify: FastifyInstance) {
    fastify.get('/', {
        schema: postsSchema
    }, getPosts);
}