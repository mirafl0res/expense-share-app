export type Group = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type GroupCreateRequest = Pick<Group, "title">;
