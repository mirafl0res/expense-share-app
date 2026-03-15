import { NotFoundError, ValidationError } from "../errors/errors";
import { UserMapper } from "../mappers/users";
import * as userRepository from "../repository/users";
import type { User, UserCreateRequest } from "../types/users";

export async function createOrLoginUser(
  userData: UserCreateRequest,
): Promise<User> {
  const existingUser = await userRepository.getUserByAuth0Sub(
    userData.auth0Sub!,
  );

  if (existingUser) {
    return UserMapper.toDomain(existingUser);
  }

  const isRegisteredEmail = await userRepository.getUserByEmail(userData.email);

  if (isRegisteredEmail) {
    throw new ValidationError({
      message: "User with this email already exists",
    });
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    auth0Sub: userData.auth0Sub ?? undefined,
    username: userData.username,
    email: userData.email,
    password: userData.password ?? undefined,
  };

  const userEntityPayload = UserMapper.toEntityPayload(newUser);
  const result = await userRepository.insertUser(userEntityPayload);

  return UserMapper.toDomain(result);
}

export async function getUserById(id: string): Promise<User | null> {
  const result = await userRepository.getUserById(id);

  if (!result) {
    throw new NotFoundError({ message: "User not found" });
  }

  return UserMapper.toDomain(result);
}

export async function getUserByAuth0Sub(
  auth0Sub: string,
): Promise<User | null> {
  const result = await userRepository.getUserByAuth0Sub(auth0Sub);

  if (!result) {
    throw new NotFoundError({ message: "User not found" });
  }

  return UserMapper.toDomain(result);
}

export async function updateUser(
  id: string,
  updates: Partial<UserCreateRequest>,
): Promise<User | null> {
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
