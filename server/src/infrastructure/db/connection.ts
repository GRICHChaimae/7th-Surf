import { Pool } from "pg";


export const pool = new Pool({
  // connectionString: process.env.DATABASE_URL
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

console.log("DB config:", {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

export async function checkDBConnection(): Promise<void> {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("PostgreSQL connected:", result.rows[0])

  } catch (error) {
    console.error("PostgreSQL connection failed:", error);
    throw error;
  }
}