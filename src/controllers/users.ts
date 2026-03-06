import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserCreateRequest, UserUpdateRequest } from "../types/users";
import * as services from "../services/users";

export async function createUser(
  request: FastifyRequest<{ Body: UserCreateRequest }>,
  reply: FastifyReply,
): Promise<void> {
  const newUser = await services.createUser(request.body);
  reply.status(201).send(newUser);
}

export async function getUserById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const user = await services.getUserById(request.params.id);
  reply.status(200).send(user);
}

export async function updateUser(
  request: FastifyRequest<{ Params: { id: string }; Body: UserUpdateRequest }>,
  reply: FastifyReply,
): Promise<void> {
  const updatedUser = await services.updateUser(
    request.params.id,
    request.body,
  );
  reply.status(200).send(updatedUser);
}

export async function deleteUser(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const deleted = await services.hardDeleteUser(request.params.id);
  reply.status(204).send(deleted);
}

export async function softDeleteUser(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const deleted = await services.softDeleteUser(request.params.id);
  reply.status(204).send(deleted);
}
