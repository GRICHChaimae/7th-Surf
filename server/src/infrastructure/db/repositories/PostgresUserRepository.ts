import { UserRepository } from "../../../domain/ports/UserRepository";
import { User } from "../../../domain/entities/User";
import { pool } from "../connection"

export class PostgresUserRepository implements UserRepository {

  async findByEmail(email: string): Promise<boolean> {
    const result = await pool.query(
      `
        SELECT 1
        FROM users
        WHERE email = $1
        LIMIT 1
      `,
      [email]
    );

    return result.rows.length > 0;
  }

  async save(user: User): Promise<void> {
    await pool.query(
      `
      INSERT INTO users (firstName, lastName, email, password)
      VALUES ($1, $2, $3, $4)
      `,
      [
        user.firstName,
        user.lastName,
        user.email,
        user.password
      ]
    );
  }
}