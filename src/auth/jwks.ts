import { createRemoteJWKSet, jwtVerify } from "jose";
import { InternalError } from "../errors/errors";

const AUTH0_JWKS_URI = Bun.env.AUTH0_JWKS_URI;
if (!AUTH0_JWKS_URI) {
  throw new InternalError({ message: "No JWKS_URI provided" });
}

const JWKS = createRemoteJWKSet(new URL(AUTH0_JWKS_URI));

export async function verifyAndDecodeJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      algorithms: ["RS256"],
    });

    return { payload };
  } catch (error) {
    throw new InternalError({
      message: "JWT verification failed",
      cause: error,
    });
  }
}
