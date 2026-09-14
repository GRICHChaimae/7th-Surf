import { UserRepository } from "../../../domain/ports/UserRepository";
import { User } from "../../../domain/entities/User";
import { pool } from "../connection";

export class PostgresUserRepository implements UserRepository {
  async findByEmail(email: string): Promise <User | null> {
    const result = await pool.query(
      `
        SELECT id, firstName, lastName, email, password
        FROM users
        WHERE email = $1
        LIMIT 1
      `,
      [email],
    );

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    
    return row;
  }

  async save(user: User): Promise<void> {
    await pool.query(
      `
      INSERT INTO users (firstName, lastName, email, password)
      VALUES ($1, $2, $3, $4)
      `,
      [user.firstName, user.lastName, user.email, user.password],
    );
  }
}
