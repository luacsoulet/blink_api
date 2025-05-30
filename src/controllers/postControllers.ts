import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePostDto } from "../dtos/postDtos";
import { AuthenticatedUser } from "../middleware/authMiddleware";

export const getPosts = async (request: FastifyRequest, reply: FastifyReply) => {
    const client = await request.server.pg.connect();
    try {
        const { rows } = await client.query('SELECT * FROM posts ORDER BY created_at DESC');
        return rows;
    } finally {
        client.release();
    }
}

export const createPost = async (request: FastifyRequest, reply: FastifyReply) => {
    const { content } = request.body as CreatePostDto;
    const token = request.headers.authorization;
    if (!token) {
        return reply.code(401).send({ message: 'Unauthorized' });
    }
    const decoded = await request.jwtVerify<AuthenticatedUser>();

    const client = await request.server.pg.connect();

    try {
        const { rows } = await client.query('INSERT INTO posts (user_id, content, created_at, username) VALUES ($1, $2, $3, $4) RETURNING *', [decoded.id, content, new Date(), decoded.username]);
        return rows[0];
    } finally {
        client.release();
    }
}