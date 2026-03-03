export type GroupEntity = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type GroupCreatePayload = Pick<GroupEntity, "id" | "title">;

export type GroupMemberEntity = {
  user_id: string;
  group_id: string;
};

export type GroupMemberCreatePayload = GroupMemberEntity;
