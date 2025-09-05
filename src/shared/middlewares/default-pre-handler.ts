import { FastifyReply, FastifyRequest } from "fastify";

export const defaultPreHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const header = req.headers["Authorization"] as string;
  if (!header.startsWith("Bearer "))
    return reply
      .code(400)
      .send({
        details: "Sessão inválida.",
        err: "'Authorization' header must start with 'Bearer '",
      });
  const token = header.split(" ")[1];
  req.contextData = { token };
};
