import { FastifyReply, FastifyRequest } from "fastify";

export const getPosts = async (request: FastifyRequest, reply: FastifyReply) => {
    const client = await request.server.pg.connect();
    try {
        const { rows } = await client.query('SELECT * FROM posts');
        return rows;
    } finally {
        client.release();
    }
}