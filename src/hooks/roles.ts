import type { FastifyReply, FastifyRequest } from "fastify";
import { ForbiddenError } from "../errors/errors";
import type { Role } from "../types/auth0";

export function requireRole(role: Role) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const roles = request.user?.["https://expense-share-app.com/roles"] || [];
    if (!roles.includes(role)) {
      throw new ForbiddenError({
        message: `Forbidden: ${role} access required`,
      });
    }
  };
}
