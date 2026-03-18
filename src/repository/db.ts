import { SQL } from "bun";

const connectionString = Bun.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

const db = new SQL(connectionString);

export default db;