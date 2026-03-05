export type UserEntity = {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
};

export type UserCreatePayload = Pick<
  UserEntity,
  "id" | "username" | "email" | "password_hash"
>;

export type UserUpdatePayload = Partial<
  Pick<UserEntity, "username" | "email" | "password_hash">
>;
