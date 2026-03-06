import { NotFoundError } from "../errors";
import { UserMapper } from "../mappers";
import * as repository from "../repository/users";
import type {
  User,
  UserCreateRequest,
  UserUpdateRequest,
} from "../types/users";

export async function createUser(userData: UserCreateRequest): Promise<User> {
  const newUser: User = {
    id: crypto.randomUUID(),
    username: userData.username,
    email: userData.email,
  };

  const result = await repository.insertUser(
    UserMapper.toEntity(newUser),
  );

  return UserMapper.toDomain(result);
}

export async function getUserById(id: string): Promise<User | null> {
  const result = await repository.getUserById(id);
  if (!result) {
    throw new NotFoundError({ message: "User not found" });
  }
  return UserMapper.toDomain(result);
}

export async function updateUser(
  id: string,
  updates: UserUpdateRequest,
): Promise<User | null> {
  const updateFields = UserMapper.toPartialEntity(updates);

  const result = await repository.updateUser(id, updateFields);
  if (!result) {
    throw new NotFoundError({ message: "User not found" });
  }

  return UserMapper.toDomain(result);
}

export async function softDeleteUser(id: string): Promise<boolean> {
  const deleted = await repository.softDeleteUser(id);
  if (!deleted) {
    throw new NotFoundError({ message: "User not found" });
  }

  return deleted;
}

export async function hardDeleteUser(id: string): Promise<boolean> {
  const deleted = await repository.hardDeleteUser(id);
  if (!deleted) {
    throw new NotFoundError({ message: "User not found" });
  }

  return deleted;
}
