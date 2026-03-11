import axios from "axios";
import { verifyAndDecodeJwt } from "../auth/jwks";
import { InternalError } from "../errors/errors";
import type { UserCreateRequest } from "../types";
import type {
  Auth0AccessTokenPayload,
  Auth0TokenRequestParams,
  Auth0TokenResponse,
  AuthCodeExchangeRequest,
} from "../types/auth0";

export async function extractUserInfoFromIdToken(
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

function getRedirectUri(): string {
  const redirectUri = Bun.env.REDIRECT_URI;
  if (!redirectUri) {
    throw new InternalError({
      message: "Missing REDIRECT_URI environment variable",
    });
  }
  return redirectUri;
}

function getAuth0Config() {
  const tokenUrl = Bun.env.AUTH0_TOKEN_URL;
  const clientId = Bun.env.AUTH0_CLIENT_ID;
  const clientSecret = Bun.env.AUTH0_CLIENT_SECRET;
  if (!tokenUrl || !clientId || !clientSecret) {
    throw new InternalError({ message: "Missing Auth0 env variables" });
  }
  return { tokenUrl, clientId, clientSecret };
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
  return response.data;
}

export async function getTokensFromAuth0Callback(
  authorizationCode: string,
): Promise<Auth0TokenResponse> {
  const redirectUri = getRedirectUri();
  return exchangeAuthCodeForTokens({ code: authorizationCode, redirectUri });
}

export async function getUserProfileFromIdToken(
  idToken: string,
): Promise<UserCreateRequest> {
  return extractUserInfoFromIdToken(idToken);
}

export async function processAuth0Callback(
  code: string,
): Promise<UserCreateRequest> {
  try {
    const redirectUri = getRedirectUri();
    const tokenResponse = await exchangeAuthCodeForTokens({
      code,
      redirectUri,
    });

    console.log("TOKEN RESPONSE:", tokenResponse);

    const auth0UserProfile = await extractUserInfoFromIdToken(
      tokenResponse.id_token,
    );

    console.log("auth0UserProfile (processAuth0Callback):", auth0UserProfile); //FIXME[epic=logs] - remove before production

    return auth0UserProfile;
  } catch (error) {
    throw new InternalError({
      message: "Failed to process Auth0 callback",
      cause: error,
    });
  }
}
