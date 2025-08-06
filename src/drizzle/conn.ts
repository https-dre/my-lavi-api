import { drizzle } from "drizzle-orm/node-postgres";
import { logger } from "../logger";

export const db = drizzle(process.env.DATABASE_URL!);

export const check_db = async () => {
  logger.info("Checking database connection...");
  await db.execute("SELECT 1");
  logger.info("Database connection ok!");

}