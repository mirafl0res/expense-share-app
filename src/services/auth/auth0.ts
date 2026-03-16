import axios from "axios";
import { verifyAndDecodeJwt } from "../../auth/jwks";
import { AuthenticationError, InternalError } from "../../errors/errors";
import type {
  User,
  UserCreateRequest,
  Auth0TokenRequestParams,
  Auth0TokenResponse,
  AuthCodeExchangeRequest,
} from "../../types";

import type { FastifyRequest } from "fastify";
import * as userService from "../users";
import { getAuth0Config, getRedirectUri } from "./helpers";

export async function handleAuthCallback(code: string) {
  const tokens = await getTokensFromAuth0Callback(code);
  const auth0UserProfile = await getUserProfileFromIdToken(tokens.id_token);

  await userService.createOrLoginUser(auth0UserProfile);

  return auth0UserProfile;
}

// TODO[auth]: refactor - simplify functions!
export async function getTokensFromAuth0Callback(
  code: string,
): Promise<Auth0TokenResponse> {
  const redirectUri = getRedirectUri();

  return exchangeAuthCodeForTokens({ code, redirectUri });
}

export async function exchangeAuthCodeForTokens({
  code,
  redirectUri,
}: AuthCodeExchangeRequest) {
  const { tokenUrl, clientId, clientSecret } = getAuth0Config();

  if (!redirectUri) {
    throw new InternalError({ message: "Missing redirectUri" });
  }

  const response = await postToAuth0TokenEndpoint({
    tokenUrl,
    clientId,
    clientSecret,
    code,
    redirectUri,
  });

  console.log("response:", response);
  console.log("response.data:", response.data);
  return response.data;
}

async function postToAuth0TokenEndpoint(params: Auth0TokenRequestParams) {
  const { tokenUrl, clientId, clientSecret, code, redirectUri } = params;

  return axios.post(
    tokenUrl,
    {
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    },
    { headers: { "content-type": "application/json" } },
  );
}

export async function getUserProfileFromIdToken(
  idToken: string,
): Promise<UserCreateRequest> {
  const { payload } = await verifyAndDecodeJwt(idToken);
  const { email, nickname, sub } = payload;

  return {
    email: email as string,
    username: (nickname as string) ?? email,
    auth0Sub: sub as string,
  };
}

/**
|--------------------------------------------------
| Get from request
|--------------------------------------------------
*/
export async function getAuth0SubFromRequest(request: FastifyRequest) {
  const auth0Sub = request.jwtTokenPayload?.sub as string | undefined;
  console.log(request.jwtTokenPayload);
  if (!auth0Sub) {
    throw new AuthenticationError({
      message: "Missing user auth0Sub in JWT payload",
    });
  }

  return auth0Sub;
}

// TODO[epic=auth-separation] Refactor – make auth-agnostic (not tied to Auth0)
export async function getAuthenticatedUserFromRequest(
  request: FastifyRequest,
): Promise<User> {
  const auth0Sub = await getAuth0SubFromRequest(request);
  const user = await userService.getUserByAuth0Sub(auth0Sub);

  if (!user) {
    throw new AuthenticationError({
      message: "Authenticated user not found in database",
    });
  }

  return user;
}
