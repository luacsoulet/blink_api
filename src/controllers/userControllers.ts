import { FastifyReply, FastifyRequest } from "fastify";

export const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    const client = await request.server.pg.connect();
    try {
        const { rows } = await client.query('SELECT * FROM users');
        return rows;
    } finally {
        client.release();
    }
}