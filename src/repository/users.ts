import { DatabaseError } from "../errors";
import db from "./db";
import type {
  UserCreatePayload,
  UserEntity,
  UserUpdatePayload,
} from "./types/users";


/**
|--------------------------------------------------
| *TODO[epic=repository]: more functions...
|  - getUsersByGroup
|  -
|
|--------------------------------------------------
*/

export async function insertUser(user: UserCreatePayload): Promise<UserEntity> {
  const [result] = await db<UserEntity[]>`
    INSERT INTO users ${db(user)}
    RETURNING *
    `;

  if (!result) {
    throw new DatabaseError({ message: "Failed to insert user" });
  }

  return result;
}

export async function getUserById(
  id: string,
  includeDeleted: boolean = false,
): Promise<UserEntity | null> {
  const [result] = await db<UserEntity[]>`
  SELECT * FROM users
  WHERE id = ${id}
  ${includeDeleted ? db`` : db`AND deleted_at IS NULL`}
  `;

  return result ?? null;
}

export async function updateUser(
  id: string,
  updates: UserUpdatePayload,
  includeDeleted: boolean = false,
): Promise<UserEntity | null> {
  const [result] = await db<UserEntity[]>`
  UPDATE users
  SET ${db(updates)}
  WHERE id = ${id}
  ${includeDeleted ? db`` : db`AND deleted_at IS NULL`}
  RETURNING *
  `;

  return result ?? null;
}

export async function softDeleteUser(id: string): Promise<boolean> {
  const [result] = await db<{ deleted_at: string }[]>`
  UPDATE users
  SET deleted_at = NOW()
  WHERE id = ${id} AND deleted_at IS NULL
  RETURNING deleted_at
  `;

  return !!result;
}
