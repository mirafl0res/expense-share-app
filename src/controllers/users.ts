import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserCreateRequest, UserUpdateRequest } from "../types/users";
import * as userService from "../services/users";

export async function createOrLoginUser(
  request: FastifyRequest<{ Body: UserCreateRequest }>,
  reply: FastifyReply,
): Promise<void> {
  const newUser = await userService.createOrLoginUser(request.body);
  
  reply.status(201).send(newUser);
}

export async function getUserById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const user = await userService.getUserById(request.params.id);
  
  reply.status(200).send(user);
}

export async function getUserByAuth0Sub(
  request: FastifyRequest<{ Params: { auth0Sub: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const user = await userService.getUserByAuth0Sub(request.params.auth0Sub);
  
  reply.status(200).send(user);
}

export async function updateUser(
  request: FastifyRequest<{ Params: { id: string }; Body: UserUpdateRequest }>,
  reply: FastifyReply,
): Promise<void> {
  const updatedUser = await userService.updateUser(
    request.params.id,
    request.body,
  );
  
  reply.status(200).send(updatedUser);
}

export async function deleteUser(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const deleted = await userService.hardDeleteUser(request.params.id);
  
  reply.status(204).send(deleted);
}

export async function softDeleteUser(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const deleted = await userService.softDeleteUser(request.params.id);
  
  reply.status(204).send(deleted);
}
