export type GroupEntity = {
  id: string;
  title: string;
  created_at: string;
  deleted_at: string | null;
  updated_at: string | null;
  created_by: string;
};

export type GroupEntityPayload = Pick<
  GroupEntity,
  "id" | "title" | "created_by"
>;

export type GroupMemberEntity = {
  user_id: string;
  group_id: string;
  created_at: string;
  added_by: string | null;
};

export type GroupMemberEntityPayload = Pick<
  GroupMemberEntity,
  "user_id" | "group_id" | "added_by"
>;
