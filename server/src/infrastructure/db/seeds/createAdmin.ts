import "dotenv/config";

import { pool } from "../connection";
import { BcryptPasswordHasher } from "../../security/BcryptPasswordHasher";

async function createAdmin(): Promise<void> {
  const firstName = process.env.ADMIN_FIRST_NAME;
  const lastName = process.env.ADMIN_Last_NAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!firstName || !lastName || !email || !password) {
    throw new Error(
      "Missing ADMIN_FIRST_NAME, ADMIN_Last_NAME, ADMIN_EMAIL or ADMIN_PASSWORD environment variable."
    );
  }

  const passwordHasher = new BcryptPasswordHasher();

  const existingAdmin = await pool.query(
    `SELECT id FROM users WHERE email = $1`,
    [email]
  );

  if (existingAdmin.rows.length > 0) {
    console.log(`User with email ${email} already exists.`);
    return;
  }

  const passwordHash = await passwordHasher.hash(password);

  await pool.query(
    `INSERT INTO users (firstName, lastName, email, password, role)
    VALUES ($1, $2, $3, $4, $5)`,
    [
      firstName,
      lastName,
      email,
      passwordHash,
      "admin",
    ]
  );

  console.log(`Admin ${email} created successfully.`);
}

createAdmin()
  .catch((error) => {
    console.error("Failed to create admin:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });