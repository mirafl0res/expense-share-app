export type UserEntity = {
  id: string;
  username: string;
  email: string;
  password_hash: string; // TODO[epic=authentication]: make optional when implementing Auth0
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
};

export type UserEntityPayload = Pick<UserEntity, "id" | "username" | "email" | "password_hash">;

// export type UserCreatePayload = Pick<
//   UserEntity,
//   "id" | "username" | "email" | "password_hash"
// >;

// export type UserUpdatePayload = Partial<
//   Pick<UserEntity, "username" | "email" | "password_hash">
// >;
