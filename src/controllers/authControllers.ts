import { FastifyReply, FastifyRequest } from "fastify";
import { LoginDto, RegisterDto } from "../dtos/authDtos";
import bcrypt from 'bcrypt';

export const loginUser = async (request: FastifyRequest<{ Body: LoginDto }>, reply: FastifyReply) => {
    const { email, password } = request.body;

    const client = await request.server.pg.connect();
    try {
        const { rows } = await client.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        const user = rows[0];
        if (!user) {
            return reply.code(401).send({ message: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        if (!isValidPassword) {
            return reply.code(401).send({ message: 'Invalid credentials' });
        }

        const token = await reply.jwtSign({
            id: user.id,
            email: user.email,
            username: user.username,
            is_admin: user.is_admin
        }, {
            expiresIn: '2h'
        });

        return { token, user: { id: user.id, email: user.email, username: user.username, is_admin: user.is_admin } };
    } finally {
        client.release();
    }
}

export const registerUser = async (request: FastifyRequest<{ Body: RegisterDto }>, reply: FastifyReply) => {
    const { username, email, password } = request.body;

    if (!username || !email || !password) {
        return reply.code(400).send({ message: 'Missing required fields' });
    }

    const client = await request.server.pg.connect();
    try {
        const existingUser = await client.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            return reply.code(400).send({ message: 'User already exists' });
        }

        const existingUsername = await client.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (existingUsername.rows.length > 0) {
            return reply.code(400).send({ message: 'Username already exists' });
        }

        if (password.length < 6) {
            return reply.code(400).send({ message: 'Password must be at least 6 characters long' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const { rows } = await client.query(
            'INSERT INTO users(username, email, password_hash, is_admin, created_at) VALUES($1, $2, $3, $4, $5) RETURNING id, username, email, is_admin',
            [username, email, hashedPassword, false, new Date()]
        );

        return { id: rows[0].id, username: rows[0].username, email: rows[0].email };
    } finally {
        client.release();
    }
}