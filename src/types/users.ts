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

export type UserCreateRequest = {
  username: string;
  email: string;
  password?: string;
};

export type UserUpdateRequest = Partial<UserCreateRequest>;
