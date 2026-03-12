export type UserEntity = {
  id: string;
  auth0_sub: string | null;
  username: string;
  email: string;
  password_hash: string | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
};

export type UserEntityPayload = Pick<
  UserEntity,
  "id" | "auth0_sub" | "username" | "email" | "password_hash"
>;

// export type UserCreatePayload = Pick<
//   UserEntity,
//   "id" | "username" | "email" | "password_hash"
// >;

// export type UserUpdatePayload = Partial<
//   Pick<UserEntity, "username" | "email" | "password_hash">
// >;
