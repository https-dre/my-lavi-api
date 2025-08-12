import { drizzle } from "drizzle-orm/node-postgres";
import { describe, it, expect } from "vitest";
import { config } from "dotenv";

config();

describe("PostgreSQL: SELECT 1", () => {
  it('must be ok', async () => {
    if(!process.env.DATABASE_URL) {
      throw new Error("Missing DATABASE_URL!")
    }
    const db = drizzle(process.env.DATABASE_URL!);

    try {
      await db.execute("SELECT 1");
    } catch (err) {
      throw err;
    }
  })
})