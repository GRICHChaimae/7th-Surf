import { CreateUser } from "../entities/User";
import { User } from "../entities/User";

export interface UserRepository {
  save(user: CreateUser): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
