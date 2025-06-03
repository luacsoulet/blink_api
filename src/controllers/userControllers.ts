import { FastifyReply, FastifyRequest } from "fastify";
import { AuthenticatedUser } from "../middleware/authMiddleware";

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

export const searchUsersByUsername = async (request: FastifyRequest, reply: FastifyReply) => {
    const { username } = request.query as { username: string };

    if (!username) {
        return reply.code(400).send({ message: 'Username parameter is required' });
    }

    const client = await request.server.pg.connect();
    try {
        const { rows } = await client.query(
            'SELECT id, username, email, created_at FROM users WHERE username ILIKE $1 ORDER BY username',
            [`${username}%`]
        );

        if (rows.length === 0) {
            return reply.code(404).send({ message: 'No users found' });
        }

        return rows;
    } finally {
        client.release();
    }
};

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

export const modifyUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const { username, email, description } = request.body as { username?: string, email?: string, description?: string };

    const token = request.headers.authorization;
    if (!token) {
        return reply.code(401).send({ message: 'Unauthorized' });
    }
    const decoded = await request.jwtVerify<AuthenticatedUser>();
    const client = await request.server.pg.connect();

    try {
        const { rows } = await client.query('UPDATE users SET username = $1, email = $2, description = $3 WHERE id = $4 AND id = $5 RETURNING *', [username, email, description, id, decoded.id]);
        if (rows.length === 0) {
            return reply.code(404).send({ message: 'User not found' });
        }
        return rows[0];
    } finally {
        client.release();
    }
}

export const deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const token = request.headers.authorization;

    if (!token) {
        return reply.code(401).send({ message: 'Unauthorized' });
    }
    const decoded = await request.jwtVerify<AuthenticatedUser>();
    const client = await request.server.pg.connect();

    try {
        const { rows } = await client.query('DELETE FROM users WHERE id = $1 AND id = $2 RETURNING *', [id, decoded.id]);
        if (rows.length === 0) {
            return reply.code(404).send({ message: 'User not found' });
        }
        return reply.code(200).send({ message: 'User deleted successfully' });
    } finally {
        client.release();
    }
}