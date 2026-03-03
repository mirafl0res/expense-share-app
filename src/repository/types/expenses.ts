export type ExpenseEntity = {
  id: string;
  group_id: string;
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

export type ExpenseCreatePayload = Pick<
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

export type ExpenseUpdatePayload = Partial<
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
