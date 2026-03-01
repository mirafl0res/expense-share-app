export type UserEntity = {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type ExpenseEntity = {
  id: string;
  group_id: string;
  payer_id: string;
  title: string;
  amount: number;
  split_type: string;
  expense_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type NewExpenseInput = Pick<
  ExpenseEntity,
  | "id"
  | "group_id"
  | "payer_id"
  | "title"
  | "amount"
  | "split_type"
  | "expense_date"
>;

export type GroupEntity = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type GroupMemberEntity = {
  user_id: string;
  group_id: string;
};
