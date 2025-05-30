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

export const getUserById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const client = await request.server.pg.connect();
    try {
        const { rows } = await client.query('SELECT * FROM users WHERE id = $1', [id]);
        return rows[0];
    } finally {
        client.release();
    }
}

export const getPostsByUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const client = await request.server.pg.connect();
    try {
        const { rows } = await client.query('SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC', [id]);
        return rows;
    } finally {
        client.release();
    }
}