import type { FastifyReply, FastifyRequest } from "fastify";
import { AuthenticationError } from "../errors/errors";

export async function verifyAuth0Secret(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const secret = request.headers["x-auth0-secret"];
  if (!secret) {
    throw new AuthenticationError({ message: "Missing x-auth0-secret header" });
  }
  if (secret !== Bun.env.AUTH0_ACTION_SECRET) {
    throw new AuthenticationError({ message: "Invalid x-auth0-secret header" });
  }
}
