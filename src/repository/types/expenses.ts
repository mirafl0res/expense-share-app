export type ExpenseEntity = {
  id: string;
  created_by: string;
  expense_group_id: string;
  payer_id: string;
  title: string;
  description: string | null;
  amount: number;
  split_type: string;
  expense_date: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
};

export type ExpenseEntityPayload = Pick<
  ExpenseEntity,
  | "id"
  | "created_by"
  | "expense_group_id"
  | "payer_id"
  | "title"
  | "description"
  | "amount"
  | "split_type"
  | "expense_date"
>;

export type ParticipantEntity = {
  expense_id: string;
  participant_user_id: string;
  share_amount: number;
  created_at: string;
};

export type ParticipantEntityPayload = Pick<
  ParticipantEntity,
  "expense_id" | "participant_user_id" | "share_amount"
>;
