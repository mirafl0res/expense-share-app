import axios from "axios";
import { InternalError } from "../../errors/errors";

export function getAuth0Config() {
  const config = {
    domain: Bun.env.AUTH0_DOMAIN as string,
    clientId: Bun.env.AUTH0_CLIENT_ID as string,
    clientSecret: Bun.env.AUTH0_CLIENT_SECRET as string,
    redirectUri: Bun.env.AUTH0_REDIRECT_URI as string,
    scope: Bun.env.AUTH0_SCOPES as string,
    audience: Bun.env.AUTH0_AUDIENCE as string,
    tokenUrl: Bun.env.AUTH0_TOKEN_URL as string,
    jwksUri: Bun.env.AUTH0_JWKS_URI as string,
    rolesClaim: Bun.env.AUTH0_ROLES_CLAIM as string,
  };

  for (const [key, value] of Object.entries(config)) {
    if (!value) {
      throw new InternalError({
        message: `Missing Auth0 environment variable: ${key}`,
      });
    }
  }

  return config;
}

export function buildAuth0AuthorizeUrl(): string {
  const { domain, clientId, redirectUri, scope, audience } = getAuth0Config();

  const authorizeUrl = new URL(`https://${domain}/authorize`);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", scope);
  authorizeUrl.searchParams.set("audience", audience);

  return authorizeUrl.toString();
}

export async function postToTokenEndpoint(params: Record<string, string>) {
  const { tokenUrl, clientId, clientSecret } = getAuth0Config();

  const data = {
    client_id: clientId,
    client_secret: clientSecret,
    ...params,
  };

  const form = new URLSearchParams(data);

  return axios.post(tokenUrl, form, {
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
}
