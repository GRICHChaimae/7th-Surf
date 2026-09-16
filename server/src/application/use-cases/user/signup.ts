import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/ports/UserRepository";
import { PasswordHasher } from "../../../domain/ports/PasswordHasher";

interface SignupInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export class Signup {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async execute(input: SignupInput): Promise<void> {
    const existingUser =
      await this.userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const passwordHash =
      await this.passwordHasher.hash(input.password);

    const user: User = {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: passwordHash,
      role: input.role
    };

    await this.userRepository.save(user);
  }
}