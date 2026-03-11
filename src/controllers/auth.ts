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
  const auth0UserProfile = await processAuth0Callback(code);
  createOrLoginUser(auth0UserProfile);
  // TODO: if user exists, send another reply? 
  reply.status(200).send(auth0UserProfile);
}
