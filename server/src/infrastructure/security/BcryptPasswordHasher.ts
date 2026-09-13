import bcrypt from "bcrypt";
import { PasswordHasher } from "../../domain/ports/PasswordHasher";

export class BcryptPasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
}