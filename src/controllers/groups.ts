import type { FastifyReply, FastifyRequest } from "fastify";
import type { GroupCreateRequest, GroupUpdateRequest } from "../types/groups";
import * as groupService from "../services/groups";

export async function createGroup(
  request: FastifyRequest<{ Body: GroupCreateRequest }>,
  reply: FastifyReply,
): Promise<void> {
  const newGroup = await groupService.createGroup(request.body);
  reply.status(201).send(newGroup);

}

export async function getGroupById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const group = await groupService.getGroupById(request.params.id);

  reply.status(200).send(group);
}

export async function updateGroup(
  request: FastifyRequest<{ Params: { id: string }; Body: GroupUpdateRequest }>,
  reply: FastifyReply,
): Promise<void> {
  const updatedGroup = await groupService.updateGroup(
    request.params.id,
    request.body,
  );
  
  reply.status(200).send(updatedGroup);
}

export async function deleteGroup(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const deleted = await groupService.hardDeleteGroup(request.params.id);

  reply.status(204).send(deleted);
}

export async function softDeleteGroup(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
): Promise<void> {
  const deleted = await groupService.softDeleteGroup(request.params.id);
  
  reply.status(204).send(deleted);
}
