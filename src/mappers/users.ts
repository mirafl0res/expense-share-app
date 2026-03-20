import type { UserEntity, UserEntityPayload } from "../repository/types";

import type { User, UserCreateRequest, UserPublic } from "../types/users";

export const UserMapper = {
  toPublic(input: User | UserEntity): UserPublic {
    return {
      id: input.id,
      username: input.username,
    };
  },
  toDomain(entity: UserEntity): User {
    return {
      id: entity.id,
      auth0Sub: entity.auth0_sub ?? undefined,
      username: entity.username,
      email: entity.email,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at ?? undefined,
      deletedAt: entity.deleted_at ?? undefined,
    };
  },
  toEntityPayload(user: User): UserEntityPayload {
    return {
      id: user.id,
      auth0_sub: user.auth0Sub ?? null,
      username: user.username,
      email: user.email,
      password_hash: user.password ?? null, // TODO[epic=auth]: implement password hashing
    };
  },
  toPartialEntityPayload(
    updates: Partial<UserCreateRequest>,
  ): Partial<UserEntityPayload> {
    const { username, email, password } = updates;
    const payload: Partial<UserEntityPayload> = {};

    if (username !== undefined) payload.username = username;
    if (email !== undefined) payload.email = email;
    if (password !== undefined) payload.password_hash = password;

    return payload;
  },
};
