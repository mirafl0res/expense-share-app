export type User = {
  id: string;
  auth0Sub?: string;
  username: string;
  email: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type UserPublic = Pick<User, "id" | "username">;

export type UserCreateRequest = {
  auth0Sub: string;
  username: string;
  email: string;
  password?: string;
};
