export type UserEntity = {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type UserEntityInput = Pick<
  UserEntity,
  "id" | "username" | "email" | "password_hash"
>;

export type ExpenseEntity = {
  id: string;
  group_id: string | null;
  created_by: string | null;
  payer_id: string;
  title: string;
  amount: number;
  split_type: string;
  expense_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type ExpenseEntityInput = Pick<
  ExpenseEntity,
  | "id"
  | "group_id"
  | "created_by"
  | "payer_id"
  | "title"
  | "amount"
  | "split_type"
  | "expense_date"
>;

export type ExpenseUpdateInput = Partial<
  Pick<
    ExpenseEntity,
    "group_id" | "payer_id" | "title" | "amount" | "split_type" | "expense_date"
  >
>;

export type ExpenseParticipantEntity = {
  expense_id: string;
  participant_user_id: string | null;
  share_amount: number;
  created_at: string;
};

export type GroupEntity = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type GroupEntityInput = Pick<GroupEntity, "id" | "title">;

export type GroupMemberEntity = {
  user_id: string;
  group_id: string;
};

export type GroupMemberEntityInput = GroupMemberEntity;
