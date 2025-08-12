import { verify_env } from "./env-config";
import { logger } from "./logger";
import { check_db } from "./drizzle/conn";
import { buildApp } from "./buildApp";

const run = async () => {
  verify_env();
  await check_db();

  const app = buildApp();

  const port_from_env = process.env.PORT!;
  const current_port = port_from_env ? port_from_env : "5555";

  app.listen({ port: Number(current_port) }, (err, address) => {
    if (err) {
      throw err;
    }

    logger.info("Server running at: " + address);
  });
};

run();
