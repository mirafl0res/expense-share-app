import type { FastifyReply, FastifyRequest } from "fastify";
import validator from "validator";
import type { UserCreateRequest, UserUpdateRequest } from "../types/users";
import { ValidationError } from "../errors/errors";
import type {
  ExpenseCreateRequest,
  ExpenseUpdateRequest,
} from "../types/expenses";
import type { GroupCreateRequest, GroupUpdateRequest } from "../types/groups";

function normalizeEmailOrThrow(email: string): string {
  const normalized = validator.normalizeEmail(email);
  if (!normalized) {
    throw new ValidationError({ message: "Email normalization failed" });
  }
  return normalized;
}

// export function sanitizeUserCreateRequest(
//   request: FastifyRequest<{ Body: UserCreateRequest }>,
//   _reply: FastifyReply,
// ) {
//   if (!request.body) return;

//   const sanitizedUsername = validator.escape(request.body.username.trim());
//   request.body.username = sanitizedUsername;

//   const normalizedEmail = normalizeEmailOrThrow(request.body.email);
//   request.body.email = normalizedEmail;

//   const trimmedPassword = request.body.password.trim();
//   request.body.password = trimmedPassword;
// }

export function sanitizeUserRequest(
  request: FastifyRequest<{ Body: UserUpdateRequest | UserCreateRequest }>,
  _reply: FastifyReply,
) {
  if (!request.body) return;

  if (request.body.username !== undefined) {
    const sanitizedUsername = validator.escape(request.body.username.trim());
    request.body.username = sanitizedUsername;
  }

  if (request.body.email !== undefined) {
    const normalizedEmail = normalizeEmailOrThrow(request.body.email);
    request.body.email = normalizedEmail;
  }

  if (request.body.password !== undefined) {
    const trimmedPassword = request.body.password.trim();
    request.body.password = trimmedPassword;
  }
}

export function sanitizeExpenseRequest(
  request: FastifyRequest<{
    Body: ExpenseUpdateRequest | ExpenseCreateRequest;
  }>,
  _reply: FastifyReply,
) {
  if (!request.body) return;

  if (request.body.title !== undefined) {
    const sanitizedTitle = validator.escape(request.body.title.trim());
    request.body.title = sanitizedTitle;
  }

  if (request.body.description != undefined) {
    const sanitizedDescription = validator.escape(
      request.body.description.trim(),
    );
    request.body.description = sanitizedDescription;
  }
}

export function sanitizeGroupRequest(
  request: FastifyRequest<{ Body: GroupUpdateRequest | GroupCreateRequest }>,
  reply: FastifyReply,
) {
  if (!request.body) return;

  if (request.body.title !== undefined) {
    const sanitizedTitle = validator.escape(request.body.title.trim());
    request.body.title = sanitizedTitle;
  }
}
