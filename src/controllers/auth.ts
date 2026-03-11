import { InternalError } from "../errors/errors";
import {
  getTokensFromAuth0Callback,
  getUserProfileFromIdToken,
} from "../services/auth";
import type { FastifyReply, FastifyRequest } from "fastify";
import { createOrLoginUser } from "../services/users";

export async function authCallbackHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  console.log("RECEIVED:", request.query);
  const { code } = request.query as { code?: string };
  if (!code) {
    throw new InternalError({
      message: "Missing code parameter in callback",
    });
  }

  const tokens = await getTokensFromAuth0Callback(code);
  const auth0UserProfile = await getUserProfileFromIdToken(tokens.id_token);

  createOrLoginUser(auth0UserProfile);
  reply.status(200).send(auth0UserProfile); // TODO: if user exists, send another reply?
}
