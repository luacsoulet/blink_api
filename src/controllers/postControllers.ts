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

export const modifyPost = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const { content } = request.body as CreatePostDto;

    const token = request.headers.authorization;
    if (!token) {
        return reply.code(401).send({ message: 'Unauthorized' });
    }
    const decoded = await request.jwtVerify<AuthenticatedUser>();

    const client = await request.server.pg.connect();

    try {
        const { rows } = await client.query('UPDATE posts SET content = $1 WHERE id = $2 AND user_id = $3 RETURNING *', [content, id, decoded.id]);
        if (rows.length === 0) {
            return reply.code(404).send({ message: 'Post not found' });
        }
        return rows[0];
    } finally {
        client.release();
    }
}

export const deletePost = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const token = request.headers.authorization;
    if (!token) {
        return reply.code(401).send({ message: 'Unauthorized' });
    }
    const decoded = await request.jwtVerify<AuthenticatedUser>();
    const client = await request.server.pg.connect();
    try {
        const { rows } = await client.query('DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING *', [id, decoded.id]);
        if (rows.length === 0) {
            return reply.code(404).send({ message: 'Post not found' });
        }
        return reply.code(200).send({ message: 'Post deleted successfully' });
    } finally {
        client.release();
    }
}