import { SQL } from "bun";

const db = new SQL({ url: process.env.DATABASE_URL });

async function testConnection() {
  try {
    const result = await db`SELECT 1 as test`;
    console.log("Connection successful:", result);
  } catch (err) {
    console.error("Connection failed:", err);
  }
}

testConnection();