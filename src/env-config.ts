import { Type } from "@sinclair/typebox";
import { logger } from "./logger";
import { Value } from "@sinclair/typebox/value";

const envSchema = Type.Object({
  DATABASE_URL: Type.String({ pattern: "^postgresql://" }),
  ENCRYPT_CORE_KEY: Type.String(),
  BLIND_KEY: Type.String(),
  JWT_KEY: Type.String(),
});

export const verify_env = () => {
  logger.info("Checking Environment...");
  const errors = [...Value.Errors(envSchema, process.env)];
  if (errors.length > 0) {
    errors.map((err) => logger.fatal(`Missing ${err.path}`));
    process.exit(1);
  }
  logger.info("Environment ok!");
};
