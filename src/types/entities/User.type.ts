import { PartialBy } from "@/types/common";

export enum UserRoles {
  SupAdmin = "SUPER_ADMIN",
  Admin = "ADMIN",
  Employ = "EMPLOY",
}

export type UserType = {
  username: string;
  name: string;
  role: UserRoles;
  email: string;
  password: string;
};

export type UserResponseType = PartialBy<UserType, "password">;

export type UserRegisterPayloadType = Omit<UserType, "role">;

export type UserLoginPayloadType = Omit<UserType, "role" | "username" | "name">;
