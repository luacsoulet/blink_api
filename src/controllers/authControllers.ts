import { FastifyReply, FastifyRequest } from "fastify";
import { LoginDto } from "../dtos/authDtos";
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

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return reply.code(401).send({ message: 'Invalid credentials' });
        }

        const token = await reply.jwtSign({
            id: user.id,
            email: user.email,
            username: user.username,
            is_admin: user.is_admin
        });

        return { token, user: { id: user.id, email: user.email, username: user.username, is_admin: user.is_admin } };
    } finally {
        client.release();
    }
}