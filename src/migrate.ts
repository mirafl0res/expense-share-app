import { SQL } from "bun";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

async function runMigrations() {
  const db = new SQL({}); // Uses DATABASE_URL from environment

  try {
    const migrationsDir = join(import.meta.dir, "migrations");
    const files = await readdir(migrationsDir);
    const sqlFiles = files
      .filter((file) => file.endsWith(".sql"))
      .sort();

    console.log(`Found ${sqlFiles.length} migrations.`);

    for (const file of sqlFiles) {
      console.log(`Running migration: ${file}...`);
      const filePath = join(migrationsDir, file);
      const sql = await readFile(filePath, "utf-8");
      
      // Execute the SQL
      await db.exec(sql);
      console.log(`Successfully ran ${file}`);
    }

    console.log("All migrations completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:");
    console.error(error);
    process.exit(1);
  }
}

runMigrations();
