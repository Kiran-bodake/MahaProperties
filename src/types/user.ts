export type UserRole = "user" | "admin" | "super-admin";

export interface User {
  _id: string;
  phone: string;
  name?: string;
  email?: string;
  role: UserRole;
  savedProperties: string[];
  isVerified: boolean;
  createdAt: string;
}

export interface AuthSession {
  user: User;
  token: string;
}
