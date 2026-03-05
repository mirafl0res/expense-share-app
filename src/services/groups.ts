import { GroupMapper } from "../mappers";
import repository from "../repository";
import type { Group, GroupCreateRequest } from "../types/groups";

export async function createGroup(data: GroupCreateRequest): Promise<Group> {
  const testUserId = "11111111-1111-1111-1111-111111111111";
  const newGroup: Group = {
    id: crypto.randomUUID(),
    title: data.title,
    createdBy: testUserId,
  };

  const result = await repository.groups.insertGroup(
    GroupMapper.toEntity(newGroup),
  );

  return GroupMapper.toDomain(result);
}
