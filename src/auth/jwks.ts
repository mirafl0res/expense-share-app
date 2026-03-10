import { createRemoteJWKSet, jwtVerify } from "jose";
import { InternalError } from "../errors/errors";

const AUTH0_JWKS_URI = Bun.env.AUTH0_JWKS_URI;
if (!AUTH0_JWKS_URI) {
  throw new InternalError({ message: "No JWKS_URI provided" });
}

const JWKS = createRemoteJWKSet(new URL(AUTH0_JWKS_URI));

export async function verifyJwt(token: string) {
  try {
    const { payload, protectedHeader } = await jwtVerify(token, JWKS, {
      algorithms: ["RS256"],
    });

    return { payload, protectedHeader };
  } catch (error) {
    throw new InternalError({
      message: "JWT verification failed",
      cause: error,
    });
  }
}
