import { InternalError } from "../errors/errors";
import { processAuth0Callback } from "../services/auth0";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function authCallbackHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const { code } = request.query as { code?: string };
  if (!code) {
    throw new InternalError({
      message: "Missing code parameter in callback",
    });
  }

  try {
    const user = await processAuth0Callback(code);
    reply.status(200).send(user);
  } catch (error) {
    throw new InternalError({ message: "Auth0 callback failed", cause: error });
  }
}
