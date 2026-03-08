import type { GroupEntity, GroupEntityPayload } from "../repository/types/groups";
import type { Group, GroupUpdateRequest } from "../types/groups";

export const GroupMapper = {
  toDomain(entity: GroupEntity): Group {
    return {
      id: entity.id,
      title: entity.title,
      createdBy: entity.created_by,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at ?? undefined,
      deletedAt: entity.deleted_at ?? undefined,
    };
  },
  toEntity(group: Group): GroupEntityPayload {
    return {
      id: group.id,
      title: group.title,
      created_by: group.createdBy,
    };
  },
  toPartialEntity(updates: GroupUpdateRequest): Partial<GroupEntityPayload> {
    const payload: Partial<GroupEntityPayload> = {};

    if (!updates.title !== undefined) payload.title = updates.title;

    return payload;
  },
};
