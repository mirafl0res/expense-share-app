import type { FastifyReply, FastifyRequest } from "fastify";
import validator from "validator";
import { ValidationError } from "../errors/errors";
import type {
  UserCreateRequest,
  GroupCreateRequest,
  ExpenseCreateRequest,
} from "../types";

function normalizeEmailOrThrow(email: string): string {
  const normalized = validator.normalizeEmail(email);
  if (!normalized) {
    throw new ValidationError({ message: "Email normalization failed" });
  }
  return normalized;
}

export async function sanitizeUserRequest(
  request: FastifyRequest<{ Body: Partial<UserCreateRequest> }>,
  _reply: FastifyReply,
) {
  if (!request.body) return;

  if (request.body.username !== undefined) {
    request.body.username = validator.escape(request.body.username.trim());
  }

  if (request.body.email !== undefined) {
    request.body.email = normalizeEmailOrThrow(request.body.email);
  }

  if (request.body.password !== undefined) {
    request.body.password = request.body.password.trim();
  }
}

export async function sanitizeExpenseRequest(
  request: FastifyRequest<{
    Body: Partial<ExpenseCreateRequest>;
  }>,
  _reply: FastifyReply,
) {
  if (!request.body) return;

  if (request.body.title !== undefined) {
    request.body.title = validator.escape(request.body.title.trim());
  }

  if (request.body.description != undefined) {
    request.body.description = validator.escape(
      request.body.description.trim(),
    );
  }
}

export async function sanitizeGroupRequest(
  request: FastifyRequest<{ Body: Partial<GroupCreateRequest> }>,
  reply: FastifyReply,
) {
  if (!request.body) return;

  if (request.body.title !== undefined) {
    request.body.title = validator.escape(request.body.title.trim());
  }
}
