import { DatabaseError } from "../errors/errors";
import db from "./db";
import type {
  UserCreatePayload,
  UserEntity,
  UserUpdatePayload,
} from "./types/users";

export async function insertUser(user: UserCreatePayload): Promise<UserEntity> {
  try {
    const [result] = await db<UserEntity[]>`
    INSERT INTO users ${db(user)}
    RETURNING *
    `;

    if (!result) {
      throw new DatabaseError({ message: "insertUser: No row returned" });
    }

    return result;
  } catch (error) {
    throw new DatabaseError({
      message: "insertUser: Database error",
      cause: error,
    });
  }
}

export async function getUserById(
  id: string,
  includeDeleted: boolean = false,
): Promise<UserEntity | null> {
  try {
    const [result] = await db<UserEntity[]>`
    SELECT * FROM users
    WHERE id = ${id}
    ${includeDeleted ? db`` : db`AND deleted_at IS NULL`}
    `;

    return result ?? null;
  } catch (error) {
    throw new DatabaseError({
      message: "getUserById: Database error",
      cause: error,
    });
  }
}

export async function updateUser(
  id: string,
  updates: UserUpdatePayload,
  includeDeleted: boolean = false,
): Promise<UserEntity | null> {
  try {
    const [result] = await db<UserEntity[]>`
    UPDATE users
    SET ${db(updates)}
    WHERE id = ${id}
    ${includeDeleted ? db`` : db`AND deleted_at IS NULL`}
    RETURNING *
    `;

    return result ?? null;
  } catch (error) {
    throw new DatabaseError({
      message: "updateUser: Database error",
      cause: error,
    });
  }
}

export async function softDeleteUser(id: string): Promise<boolean> {
  try {
    const [result] = await db<{ deleted_at: string }[]>`
    UPDATE users
    SET deleted_at = now()
    WHERE id = ${id} AND deleted_at IS NULL
    RETURNING deleted_at
    `;

    return !!result;
  } catch (error) {
    throw new DatabaseError({
      message: "softDeleteUser: Database error",
      cause: error,
    });
  }
}

export async function hardDeleteUser(id: string): Promise<boolean> {
  try {
    const [result] = await db<{ id: string }[]>`
    DELETE FROM users 
    WHERE id = ${id}
    RETURNING id
    `;

    return !!result;
  } catch (error) {
    throw new DatabaseError({
      message: "hardDeleteUser: Database error",
      cause: error,
    });
  }
}
