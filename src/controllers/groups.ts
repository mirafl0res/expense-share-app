import type { FastifyReply, FastifyRequest } from "fastify";
import type { GroupCreateRequest, GroupUpdateRequest } from "../types/groups";
import { NotFoundError } from "../errors";
import services from "../services";

export async function createGroup(
  request: FastifyRequest<{ Body: GroupCreateRequest }>,
  reply: FastifyReply,
): Promise<void> {
  const newGroup = await services.groups.createGroup(request.body);
  reply.status(201).send(newGroup);
}

export async function getGroupById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const group = await services.groups.getGroupById(request.params.id);
  if (!group) {
    throw new NotFoundError({ message: "Group not found" });
  }
  reply.status(200).send(group);
}

export async function updateGroup(
  request: FastifyRequest<{ Params: { id: string }; Body: GroupUpdateRequest }>,
  reply: FastifyReply,
): Promise<void> {
  const updatedGroup = await services.groups.updateGroup(
    request.params.id,
    request.body,
  );

  if (!updatedGroup) {
    throw new NotFoundError({ message: "Group not found" });
  }

  reply.status(200).send(updatedGroup);
}

export async function softDeleteGroup(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const deleted = await services.groups.softDeleteGroup(request.params.id);
  if (!deleted) {
    throw new NotFoundError({ message: "Group not found" });
  }

  reply.status(204).send(deleted);
}

export async function hardDeleteGroup(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const deleted = await services.groups.hardDeleteGroup(request.params.id);
  if (!deleted) {
    throw new NotFoundError({ message: "Group not found" });
  }

  reply.status(204).send(deleted);
}
