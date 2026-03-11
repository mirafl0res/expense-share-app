import { InternalError } from "../../errors/errors";

export function getRedirectUri(): string {
  const redirectUri = Bun.env.REDIRECT_URI;
  if (!redirectUri) {
    throw new InternalError({
      message: "Missing REDIRECT_URI environment variable",
    });
  }
  return redirectUri;
}

export function getAuth0Config() {
  const tokenUrl = Bun.env.AUTH0_TOKEN_URL;
  const clientId = Bun.env.AUTH0_CLIENT_ID;
  const clientSecret = Bun.env.AUTH0_CLIENT_SECRET;
  if (!tokenUrl || !clientId || !clientSecret) {
    throw new InternalError({ message: "Missing Auth0 env variables" });
  }
  return { tokenUrl, clientId, clientSecret };
}
