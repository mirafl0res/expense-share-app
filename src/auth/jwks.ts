import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";
import { InternalError } from "../errors/errors";

const AUTH0_JWKS_URI = Bun.env.AUTH0_JWKS_URI;
if (!AUTH0_JWKS_URI) {
  throw new InternalError({ message: "No JWKS_URI provided" });
}

const JWKS = createRemoteJWKSet(new URL(AUTH0_JWKS_URI));

export async function verifyAndDecodeJwt(
  token: string,
): Promise<{ payload: JWTPayload }> {
  const { payload } = await jwtVerify(token, JWKS, {
    algorithms: ["RS256"],
  });

  if (!payload) {
    throw new InternalError({
      message: "JWT verification failed: no payload",
    });
  }

  return { payload };
}
