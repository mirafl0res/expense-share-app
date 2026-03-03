export type User = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type UserCreateRequest = {
  username: string;
  email: string;
  password: string;
};


