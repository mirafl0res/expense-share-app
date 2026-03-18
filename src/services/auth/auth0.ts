import type { JWTPayload } from "jose";
import { getAuth0Config, postToTokenEndpoint } from "./helpers";
import { ApiClient } from "@auth0/auth0-api-js";
import axios from "axios";
import type { Auth0TokenResponse } from "../../types/auth0";
import type { UserCreateRequest } from "../../types/users";

export async function processAuth0TokenExchange(code: string) {
  const tokens = await exchangeAuthCodeForTokens(code);
  console.log("Tokens;", tokens)
  const accessTokenPayload = await validateAccessToken(tokens.access_token);

  const userInfo = await getUserInfoFromAuth0(tokens.access_token);

  return { tokens, accessTokenPayload, userInfo };
}

export async function exchangeAuthCodeForTokens(
  code: string,
): Promise<Auth0TokenResponse> {
  const { redirectUri } = getAuth0Config();

  const response = await postToTokenEndpoint({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });

  return response.data;
}

export async function exchangeRefreshTokenForTokens(refreshToken: string) {
  const response = await postToTokenEndpoint({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  return response.data;
}

async function validateAccessToken(accessToken: string): Promise<JWTPayload> {
  const { domain, audience } = getAuth0Config();

  const apiClient = new ApiClient({ domain, audience });

  const accessTokenPayload = await apiClient.verifyAccessToken({ accessToken });

  return accessTokenPayload;
}

async function getUserInfoFromAuth0(
  accessToken: string,
): Promise<UserCreateRequest> {
  const { domain } = getAuth0Config();

  const url = `https://${domain}/userinfo`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { sub, nickname, email } = response.data;

  return {
    auth0Sub: sub,
    username: nickname ?? email,
    email,
  };
}
