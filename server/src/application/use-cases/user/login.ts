import { UserRepository } from "../../../domain/ports/UserRepository";
import { PasswordHasher } from "../../../domain/ports/PasswordHasher";
import { TokenService } from "../../../domain/ports/TokenService";

interface LoginInput {
  email: string;
  password: string;
}

export class Login {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenService: TokenService,
  ) {}

  async execute(input: LoginInput) {
    const existingUser = await this.userRepository.findByEmail(input.email);

    if (!existingUser) {
      throw new Error("Invalid credentials");
    }

    const passwordMatches = await this.passwordHasher.compare(
      input.password,
      existingUser.password,
    );

    if (!passwordMatches) {
      throw new Error("Invalid credentials");
    }

    const accessToken = this.tokenService.generateAccessToken(
      existingUser.id,
      existingUser.role,
    );

    const refreshToken = this.tokenService.generateRefreshToken(
      existingUser.id,
    );

    return {
      accessToken,
      refreshToken,
      existingUser,
    };
  }
}
