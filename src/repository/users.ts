import { DatabaseError } from "../errors/errors";
import { mapPostgresError } from "../errors/helpers";
import db from "./db";
import type { UserEntity, UserEntityPayload } from "./types/users";

export async function insertUser(user: UserEntityPayload): Promise<UserEntity> {
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
    throw mapPostgresError(error);
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
    throw mapPostgresError(error);
  }
}

export async function getUserByAuth0Sub(
  auth0Sub: string,
  includeDeleted: boolean = false,
): Promise<UserEntity | null> {
  try {
    const [result] = await db<UserEntity[]>`
    SELECT * FROM users
    WHERE auth0_sub = ${auth0Sub}
    ${includeDeleted ? db`` : db`AND deleted_at IS NULL`}
    `;

    return result ?? null;
  } catch (error) {
    throw mapPostgresError(error);
  }
}

export async function getUserByEmail(
  email: string,
  includeDeleted: boolean = false,
): Promise<UserEntity | null> {
  try {
    const [result] = await db<UserEntity[]>`
    SELECT * FROM users
    WHERE email = ${email}
    ${includeDeleted ? db`` : db`AND deleted_at IS NULL`}
    `;

    return result ?? null;
  } catch (error) {
    throw mapPostgresError(error);
  }
}

export async function updateUser(
  id: string,
  updates: Partial<UserEntityPayload>,
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
    throw mapPostgresError(error);
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
    throw mapPostgresError(error);
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
    throw mapPostgresError(error);
  }
}
