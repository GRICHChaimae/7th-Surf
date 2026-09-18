import { TokenService } from "../../../domain/ports/TokenService";
import { UserRepository } from "../../../domain/ports/UserRepository";

export class RefreshAccessToken {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository
  ) {}

  async execute(refreshToken: string) {
    const payload =
      this.tokenService.verifyRefreshToken(refreshToken);

    const user = await this.userRepository.findByEmail(
      payload.userId
    );

    if (!user) {
      throw new Error("User not found");
    }

    const accessToken =
      this.tokenService.generateAccessToken(
        user.id,
        user.role
      );

    const newRefreshToken =
      this.tokenService.generateRefreshToken(user.id);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}