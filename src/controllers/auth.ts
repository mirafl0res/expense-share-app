import { InternalError } from "../errors/errors";
import * as authService from "../services/auth";
import type { FastifyReply, FastifyRequest } from "fastify";
import * as userService from "../services/users";

export async function authCallbackHandler(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  console.log(
    "authCallbackHandler initialized. Received authorization code from request.query:",
    request.query,
  );
  const { code } = request.query as { code?: string };
  if (!code) {
    throw new InternalError({
      message: "Missing code parameter in callback",
    });
  }

  const tokens = await authService.getTokensFromAuth0Callback(code);
  console.log(
    "Received tokens from Auth0 callback (getTokensTromAuth0Callback):",
    tokens,
  );
  const auth0UserProfile = await authService.getUserProfileFromIdToken(
    tokens.id_token,
  );
  console.log(
    "auth0UserProfile from getUserProfileFromIdToken",
    auth0UserProfile,
  );
  userService.createOrLoginUser(auth0UserProfile);
  reply.status(200).send(auth0UserProfile); // TODO: if user exists, send another reply?
}
