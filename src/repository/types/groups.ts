export type GroupEntity = {
  id: string;
  title: string;
  created_at?: string | null;
  deleted_at?: string | null;
  updated_at?: string | null;
  created_by: string;
};

export type GroupCreatePayload = Pick<GroupEntity, "id" | "title">;
export type GroupUpdatePayload = Partial<Pick<GroupEntity, "title">>;

export type GroupMemberEntity = {
  user_id: string;
  group_id: string;
};

export type GroupMemberCreatePayload = GroupMemberEntity;
