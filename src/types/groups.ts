export type Group = {
  id: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  createdBy: string;
};

export type GroupCreateRequest = Pick<Group, "title">;

export type GroupUpdateRequest = Partial<GroupCreateRequest>;
