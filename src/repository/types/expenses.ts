export type ExpenseEntity = {
  id: string;
  created_by: string | null;
  group_id: string;
  payer_id: string | null;
  title: string;
  amount: number;
  split_type: string;
  expense_date: string;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
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
