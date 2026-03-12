import type { FastifyRequest } from "fastify";
import { AuthenticationError } from "../errors/errors";
import { verifyAndDecodeJwt } from "./jwks";

function hasValidSub(payload: Record<string, unknown>): boolean {
  return typeof payload.sub === "string" && payload.sub.trim() !== "";
}

function extractToken(request: FastifyRequest): string {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AuthenticationError({
      message: "Missing or invalid Authorization header",
    });
  }

  return authHeader.slice(7);
}

export async function extractAndValidatePayload(
  request: FastifyRequest,
): Promise<Record<string, unknown>> {
  const token = extractToken(request);

  const { payload } = await verifyAndDecodeJwt(token);
  
  if (!hasValidSub(payload)) {
    throw new AuthenticationError({ message: "Missing user auth0Sub" });
  }

  console.log("Extracted payload (extractAndValidatePayload)", payload); //*FIXME - remove before production
  
  return payload;
}
