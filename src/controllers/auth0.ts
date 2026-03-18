import { InternalError } from "../errors/errors";
import type { FastifyReply, FastifyRequest } from "fastify";
import * as auth0Helpers from "../services/auth/helpers";
import * as authService from "../services/auth/auth0";
import * as userService from "../services/users";

export async function redirectToAuth0Authorization(
  _request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const authorizeUrl = auth0Helpers.buildAuth0AuthorizeUrl();

  reply.redirect(authorizeUrl);
}

export async function processAuth0AuthorizationCallback(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const { code } = request.query as { code?: string };

  if (!code) {
    throw new InternalError({ message: "Missing code parameter in callback" });
  }

  const { userInfo } = await authService.processAuth0TokenExchange(code);

  const { user, isNew } = await userService.createOrLoginUser(userInfo);

  reply.status(isNew ? 201 : 200).send(user);
}
