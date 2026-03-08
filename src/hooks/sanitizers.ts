import type { FastifyReply, FastifyRequest } from "fastify";
import validator from "validator";
import type { UserCreateRequest, UserUpdateRequest } from "../types/users";
import { ValidationError } from "../errors/errors";
import type { ExpenseCreateRequest, ExpenseUpdateRequest } from "../types/expenses";
import type { GroupCreateRequest, GroupUpdateRequest } from "../types/groups";

function normalizeEmailOrThrow(email: string): string {
  const normalized = validator.normalizeEmail(email);
  if (!normalized) {
    throw new ValidationError({ message: "Email normalization failed" });
  }
  return normalized;
}

export async function sanitizeUserRequest(
  request: FastifyRequest<{ Body: UserUpdateRequest | UserCreateRequest }>,
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
    Body: ExpenseUpdateRequest | ExpenseCreateRequest;
  }>,
  _reply: FastifyReply,
) {
  if (!request.body) return;

  if (request.body.title !== undefined) {
    request.body.title = validator.escape(request.body.title.trim());
  }

  if (request.body.description != undefined) {
    request.body.description = validator.escape(request.body.description.trim());
  }
}

export async function sanitizeGroupRequest(
  request: FastifyRequest<{ Body: GroupUpdateRequest | GroupCreateRequest }>,
  reply: FastifyReply,
) {
  if (!request.body) return;

  if (request.body.title !== undefined) {
    request.body.title = validator.escape(request.body.title.trim());
  }
}
