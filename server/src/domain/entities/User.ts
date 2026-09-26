export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "admin"
}

export type CreateUser = Omit<User, "id">;