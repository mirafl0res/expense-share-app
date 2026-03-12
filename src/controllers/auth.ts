import { InternalError } from "../errors/errors";
import * as authService from "../services/auth/auth0";
import type { FastifyReply, FastifyRequest } from "fastify";
import * as userService from "../services/users";
import { handleAuthCallback } from "../services/auth/auth0";

export async function authCallbackHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const { code } = request.query as { code?: string };

  if (!code) {
    throw new InternalError({ message: "Missing code parameter in callback" });
  }

  const userProfile = await handleAuthCallback(code);
  
  reply.status(200).send(userProfile);
}
