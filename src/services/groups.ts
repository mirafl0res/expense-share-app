import { NotFoundError } from "../errors/errors";
import { GroupMapper } from "../mappers/groups";
import * as groupRepository from "../repository/groups";
import type { Group, GroupCreateRequest } from "../types/groups";

export async function createGroup(
  data: GroupCreateRequest,
  userId: string,
): Promise<Group> {
  const groupData: Group = {
    id: crypto.randomUUID(),
    title: data.title,
    createdBy: userId,
  };

  const result = await groupRepository.insertGroup(
    GroupMapper.toEntityPayload(groupData),
  );

  return GroupMapper.toDomain(result);
}

export async function getGroupById(id: string): Promise<Group> {
  const result = await groupRepository.getGroupById(id);

  if (!result) {
    throw new NotFoundError({ message: "Group not found" });
  }

  return GroupMapper.toDomain(result);
}

export async function updateGroup(
  id: string,
  data: Partial<GroupCreateRequest>,
): Promise<Group> {
  const updates = GroupMapper.toPartialEntityPayload(data);

  const result = await groupRepository.updateGroup(id, updates);

  if (!result) {
    throw new NotFoundError({ message: "Group not found" });
  }

  return GroupMapper.toDomain(result);
}

export async function softDeleteGroup(id: string): Promise<boolean> {
  const deleted = await groupRepository.softDeleteGroup(id);

  if (!deleted) {
    throw new NotFoundError({ message: "Group not found" });
  }

  return deleted;
}

export async function hardDeleteGroup(id: string): Promise<boolean> {
  const deleted = await groupRepository.hardDeleteGroup(id);

  if (!deleted) {
    throw new NotFoundError({ message: "Group not found" });
  }

  return deleted;
}
