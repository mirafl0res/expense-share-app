import { DatabaseError } from "../errors";
import db from "./db";
import type {
  GroupCreatePayload,
  GroupEntity,
  GroupUpdatePayload,
} from "./types/groups";

export async function insertGroup(
  group: GroupCreatePayload,
): Promise<GroupEntity> {
  const [result] = await db<GroupEntity[]>`
  INSERT INTO expense_groups ${db(group)}
  RETURNING *
  `;

  if (!result) {
    throw new DatabaseError({ message: "Failed to insert group" });
  }

  return result;
}

export async function getGroupById(
  id: string,
  includeDeleted: boolean = false,
): Promise<GroupEntity | null> {
  const [result] = await db`
  SELECT * FROM expense_groups
  WHERE id = ${id}
  ${includeDeleted ? db`` : db`AND deleted_at IS NULL`}
  `;

  return result ?? null;
}

export async function updateGroup(
  id: string,
  updates: GroupUpdatePayload,
  includeDeleted: boolean = false,
): Promise<GroupEntity | null> {
  const [result] = await db<GroupEntity[]>`
  UPDATE expense_groups
  SET ${db(updates)}
  WHERE id = ${id}
  ${includeDeleted ? db`` : db`AND deleted_at IS NULL`}
  RETURNING *
  `;

  return result ?? null;
}

export async function softDeleteGroup(id: string): Promise<boolean> {
  const [result] = await db<{ deleted_at: string }[]>`
  UPDATE expense_groups
  SET deleted_at = now()
  WHERE id = ${id} AND deleted_at IS NULL
  RETURNING deleted_at
  `;

  return !!result;
}


export async function hardDeleteGroup(id: string): Promise<boolean> {
  const [result] = await db<{ id: string }[]>`
  DELETE FROM expense_groups 
  WHERE id = ${id}
  RETURNING id
  `;

  return !!result;
}