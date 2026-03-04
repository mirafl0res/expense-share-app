export type User = {
  id: string;
  username: string;
  email: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
};

export type UserCreateRequest = {
  username: string;
  email: string;
  password: string;
};

export type UserUpdateRequest = UserCreateRequest;
