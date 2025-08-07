import { UserResponseType, UserType } from "@/types/User.type";
import fs from "fs/promises";

const userDBPath = "database/users.json";

export const getUsers = async (): Promise<UserResponseType[]> => {
  const users: UserType[] = [];
  await fs
    .readFile(userDBPath, "utf8")
    .then((u) => JSON.parse(u))
    .then((u) => users.push(...u));
  return users;
};

export const addUsers = async (user: UserType) => {
  const USERS = await getUsers();
  USERS.push(user);
  await fs.writeFile(userDBPath, JSON.stringify(USERS), { encoding: "utf8" });
  return await getUserByEmail(user.email);
};

export const getUserByEmail = async (
  email: string
): Promise<UserResponseType | undefined> => {
  const USERS = await getUsers();
  const user = USERS.find((u) => u.email === email);
  if (user) delete user.password;
  return user;
};

export const getUserForLogin = async (
  email: string
): Promise<UserType | undefined> => {
  const USERS = await getUsers();
  const user = USERS.find((u) => u.email === email);
  return user as UserType;
};
