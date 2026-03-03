export type UserEntity = {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type UserEntityPayload = Pick<
  UserEntity,
  "id" | "username" | "email" | "password_hash"
>;