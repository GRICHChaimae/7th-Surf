import jwt from "jsonwebtoken";
import { TokenService } from "../../domain/ports/TokenService";

export class JwtTokenService implements TokenService {
  generateAccessToken(userId: string, role: string): string {
    return jwt.sign(
      {
        userId,
        role,
      },
      process.env.JWT_ACCESS_SECRET!,
      {
        expiresIn: "15m",
      }
    );
  }

  generateRefreshToken(userId: string): string {
    return jwt.sign(
      {
        userId,
      },
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: "7d",
      }
    );
  }

  verifyAccessToken(token: string): {
    userId: string;
    role: string;
  } {
    return jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!
    ) as {
      userId: string;
      role: string;
    };
  }

  verifyRefreshToken(token: string): {
    userId: string;
  } {
    return jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET!
    ) as {
      userId: string;
    };
  }
}