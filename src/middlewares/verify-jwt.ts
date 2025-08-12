import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken';

export const VerifyJwtPlugin = async (req: FastifyRequest, reply: FastifyReply) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return reply.code(401)
      .send({ error: "Invalid token", details: "Token não definido ou inválido"})
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY!);

    (req as any).contextData = decoded;
  } catch (err) {
    return reply.code(401).send({ error: err, details: "JWT inválido ou não autorizado."})
  }
}
