import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserCreateRequest, UserUpdateRequest } from "../types/users";
import { services } from "../services";
import { NotFoundError } from "../errors";

export async function createUser(
  request: FastifyRequest<{ Body: UserCreateRequest }>,
  reply: FastifyReply,
): Promise<void> {
  const newUser = await services.users.createUser(request.body);
  reply.status(201).send(newUser);
}

export async function getUserById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const user = await services.users.getUserById(request.params.id);
  if (!user) {
    throw new NotFoundError({ message: "User not found" });
  }

  reply.status(200).send(user);
}

export async function updateUser(
  request: FastifyRequest<{ Params: { id: string }; Body: UserUpdateRequest }>,
  reply: FastifyReply,
): Promise<void> {
  const updatedUser = await services.users.updateUser(
    request.params.id,
    request.body,
  );
  if (!updatedUser) {
    throw new NotFoundError({ message: "User not found" });
  }

  reply.status(200).send(updatedUser);
}

export async function deleteUser(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const deleted = await services.users.softDeleteUser(request.params.id);
  if (!deleted) {
    throw new NotFoundError({ message: "User not found" });
  }

  reply.status(204).send(deleted);
}
