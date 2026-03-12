import { DatabaseError } from "../errors/errors";
import db from "./db";
import type {
  GroupEntity,
  GroupEntityPayload,
  GroupMemberEntity,
  GroupMemberEntityPayload,
} from "./types/groups";

/**
|--------------------------------------------------
| *TODO[epic=db]: add columns to expense_group_members?
|   e.g.: created_at, role, added_by
|--------------------------------------------------
*/

export async function insertGroup(
  group: GroupEntityPayload,
): Promise<GroupEntity> {
  try {
    const [result] = await db<GroupEntity[]>`
    INSERT INTO expense_groups ${db(group)}
    RETURNING *
  `;

    if (!result) {
      throw new DatabaseError({ message: "insertGroup: No row returned" });
    }

    return result;
  } catch (error) {
    throw new DatabaseError({
      message: "insertGroup: Database error",
      cause: error,
    });
  }
}

export async function getGroupById(
  id: string,
  includeDeleted: boolean = false,
): Promise<GroupEntity | null> {
  try {
    const [result] = await db`
    SELECT * FROM expense_groups
    WHERE id = ${id}
    ${includeDeleted ? db`` : db`AND deleted_at IS NULL`}
    `;

    return result ?? null;
  } catch (error) {
    throw new DatabaseError({
      message: "getGroupById: Database error",
      cause: error,
    });
  }
}

export async function updateGroup(
  id: string,
  updates: Partial<GroupEntityPayload>,
  includeDeleted: boolean = false,
): Promise<GroupEntity | null> {
  try {
    const [result] = await db<GroupEntity[]>`
    UPDATE expense_groups
    SET ${db(updates)}
    WHERE id = ${id}
    ${includeDeleted ? db`` : db`AND deleted_at IS NULL`}
    RETURNING *
    `;

    return result ?? null;
  } catch (error) {
    throw new DatabaseError({
      message: "updateGroup: Database error",
      cause: error,
    });
  }
}

export async function softDeleteGroup(id: string): Promise<boolean> {
  try {
    const [result] = await db<{ deleted_at: string }[]>`
    UPDATE expense_groups
    SET deleted_at = now()
    WHERE id = ${id} AND deleted_at IS NULL
    RETURNING deleted_at
    `;

    return !!result;
  } catch (error) {
    throw new DatabaseError({
      message: "softDeleteGroup: Database error",
      cause: error,
    });
  }
}

export async function hardDeleteGroup(id: string): Promise<boolean> {
  try {
    const [result] = await db<{ id: string }[]>`
    DELETE FROM expense_groups 
    WHERE id = ${id}
    RETURNING id
    `;

    return !!result;
  } catch (error) {
    throw new DatabaseError({
      message: "hardDeleteGroup: Database error",
      cause: error,
    });
  }
}

/**
|--------------------------------------------------
| Join table: expense_group_members
|--------------------------------------------------
*/

export async function insertGroupMember(
  groupMember: GroupMemberEntityPayload,
): Promise<GroupMemberEntity> {
  try {
    const [result] = await db<GroupMemberEntity[]>`
    INSERT INTO expense_group_members ${db(groupMember)}
    RETURNING *
    `;

    if (!result) {
      throw new DatabaseError({ message: "insertGroup: No row returned" });
    }
    return result;
  } catch (error) {
    throw new DatabaseError({
      message: "insertGroupMember: Database error",
      cause: error,
    });
  }
}

export async function hardDeleteGroupMember(
  user_id: string,
  group_id: string,
): Promise<boolean> {
  try {
    const [result] = await db<{ user_id: string; group_id: string }[]>`
    DELETE FROM expense_group_members
    WHERE user_id = ${user_id} AND expense_group_id = ${group_id}
    RETURNING user_id, expense_group_id
    `;

    return !!result;
  } catch (error) {
    throw new DatabaseError({
      message: "hardDeleteGroupMember: Database error",
      cause: error,
    });
  }
}
