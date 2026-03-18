import { NotFoundError, ValidationError } from "../errors/errors";
import { UserMapper } from "../mappers/users";
import * as userRepository from "../repository/users";
import type { User, UserCreateRequest } from "../types/users";

export async function createOrLoginUser(
  data: UserCreateRequest,
): Promise<{ user: User; isNew: boolean }> {
  const existingUser = await userRepository.getUserByAuth0Sub(data.auth0Sub);

  if (existingUser) {
    return { user: UserMapper.toDomain(existingUser), isNew: false };
  }

  const isRegisteredEmail = await userRepository.getUserByEmail(data.email);

  if (isRegisteredEmail) {
    throw new ValidationError({
      message: "Unable to process request",
    });
  }

  const userData: User = {
    id: crypto.randomUUID(),
    auth0Sub: data.auth0Sub ?? undefined,
    username: data.username,
    email: data.email,
    password: data.password ?? undefined,
  };

  const userEntityPayload = UserMapper.toEntityPayload(userData);
  
  const result = await userRepository.insertUser(userEntityPayload);

  return { user: UserMapper.toDomain(result), isNew: true };
}

export async function getUserById(id: string): Promise<User> {
  const result = await userRepository.getUserById(id);

  if (!result) {
    throw new NotFoundError({ message: "User not found" });
  }

  return UserMapper.toDomain(result);
}

export async function getUserByAuth0Sub(auth0Sub: string): Promise<User> {
  const result = await userRepository.getUserByAuth0Sub(auth0Sub);

  if (!result) {
    throw new NotFoundError({ message: "User not found" });
  }

  return UserMapper.toDomain(result);
}

export async function updateUser(
  id: string,
  updates: Partial<UserCreateRequest>,
): Promise<User> {
  const updateFields = UserMapper.toPartialEntityPayload(updates);

  const result = await userRepository.updateUser(id, updateFields);

  if (!result) {
    throw new NotFoundError({ message: "User not found" });
  }

  return UserMapper.toDomain(result);
}

export async function softDeleteUser(id: string): Promise<boolean> {
  const deleted = await userRepository.softDeleteUser(id);

  if (!deleted) {
    throw new NotFoundError({ message: "User not found" });
  }

  return deleted;
}

export async function hardDeleteUser(id: string): Promise<boolean> {
  const deleted = await userRepository.hardDeleteUser(id);

  if (!deleted) {
    throw new NotFoundError({ message: "User not found" });
  }

  return deleted;
}
