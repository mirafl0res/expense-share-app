export type Group = {
  id: string;
  title: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
  createdBy: string;
};

export type GroupCreateRequest = Pick<Group, "title">;
export type GroupUpdateRequest = GroupCreateRequest;
