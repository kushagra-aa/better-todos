import { UserType } from "@/types/User.type";
import fs from "fs/promises";

const userDBPath = "database/users.json";

export const getUsers = async () => {
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
export const getUserByEmail = async (email: string) => {
  const USERS = await getUsers();
  return USERS.find((u) => u.email === email);
};
