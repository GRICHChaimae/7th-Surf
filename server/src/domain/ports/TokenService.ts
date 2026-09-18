export interface TokenService {
  generateAccessToken(userId: string, role: string): string;
  generateRefreshToken(userId: string): string;

  verifyAccessToken(token: string): {
    userId: string;
    role: string;
  };

  verifyRefreshToken(token: string): {
    userId: string;
  };
}