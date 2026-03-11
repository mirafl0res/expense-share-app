import { NotFoundError } from "../errors/errors";
import { GroupMapper } from "../mappers/groups";
import * as groupRepository from "../repository/groups";
import type { Group, GroupCreateRequest, GroupUpdateRequest } from "../types/groups";

export async function createGroup(data: GroupCreateRequest): Promise<Group> {
  const testUserId = "11111111-1111-1111-1111-111111111111";
  const newGroup: Group = {
    id: crypto.randomUUID(),
    title: data.title,
    createdBy: testUserId,
  };

  const result = await groupRepository.insertGroup(GroupMapper.toEntity(newGroup));

  return GroupMapper.toDomain(result);
}

export async function getGroupById(id: string): Promise<Group> {
  const result = await groupRepository.getGroupById(id);
  if (!result) {
    throw new NotFoundError({ message: "Group not found" });
  }
  return GroupMapper.toDomain(result);
}

export async function updateGroup(id: string, data: GroupUpdateRequest): Promise<Group | null> {
  const updates = GroupMapper.toPartialEntity(data);

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
