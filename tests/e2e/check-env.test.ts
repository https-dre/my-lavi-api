import { describe, it, expect } from "vitest";
import { config } from "dotenv";
import path from "path";
import { logger } from "../../src/logger";

const envPath = path.resolve(process.cwd(), ".env");
config({ path: envPath });

logger.info("Variáveis carregadas.");
logger.info("Lendo process.env.DATABASE_URL");

describe("Verificação do dotenv", () => {
  it("deve carregar as variáveis de ambiente do arquivo .env", () => {
    expect(process.env.DATABASE_URL).toBeDefined();
    expect(typeof process.env.DATABASE_URL).toBe("string");
  });
});
