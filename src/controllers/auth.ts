import { InternalError } from "../errors/errors";
import { processAuth0Callback } from "../services/auth0";
import type { FastifyReply, FastifyRequest } from "fastify";
import { createOrLoginUser } from "../services/users";

export async function authCallbackHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  console.log("received", request.query);
  const { code } = request.query as { code?: string };
  if (!code) {
    throw new InternalError({
      message: "Missing code parameter in callback",
    });
  }

  try {
    const auth0UserProfile = await processAuth0Callback(code);
    createOrLoginUser(auth0UserProfile);
    reply.status(200).send(auth0UserProfile);
  } catch (error) {
    throw new InternalError({ message: "Auth0 callback failed", cause: error });
  }
}
