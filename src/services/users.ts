import { NotFoundError } from "../errors";
import { UserMapper } from "../mappers";
import repository from "../repository";
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

  const result = await repository.users.insertUser(
    UserMapper.toEntity(newUser),
  );

  return UserMapper.toDomain(result);
}

export async function getUserById(id: string): Promise<User | null> {
  const result = await repository.users.getUserById(id);
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

  const result = await repository.users.updateUser(id, updateFields);
  if (!result) {
    throw new NotFoundError({ message: "User not found" });
  }

  return UserMapper.toDomain(result);
}

export async function softDeleteUser(id: string): Promise<boolean> {
  const result = await repository.users.softDeleteUser(id);
  return result;
}
