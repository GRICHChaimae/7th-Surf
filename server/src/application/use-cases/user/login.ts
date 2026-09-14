import { UserRepository } from "../../../domain/ports/UserRepository";
import { PasswordHasher } from "../../../domain/ports/PasswordHasher";

interface LoginInput {
  email: string;
  password: string;
}

export class Login {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async execute(input: LoginInput) {
    const existingUser = await this.userRepository.findByEmail(input.email);

    if (!existingUser) {
      throw new Error("Invalid credentials");
    }

    const passwordMatches = await this.passwordHasher.compare(
      input.password,
      existingUser.password
    );

    if (!passwordMatches) {
      throw new Error("Invalid credentials");
    }

    return existingUser;
  }
}