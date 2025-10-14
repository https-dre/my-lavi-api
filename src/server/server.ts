import { verify_env } from "../env-config";
import { logger } from "../logger";
import { check_db } from "../database/conn";
import { buildElysiaApp } from "../http/buildElysiaApp";

export const executeServer = async () => {
  verify_env();
  await check_db();

  const app = buildElysiaApp();

  const port_from_env = process.env.PORT!;
  const current_port = port_from_env ? port_from_env : "5555";

  logger.info(`Server running at: http://localhost:${current_port}`);
  app.listen(Number(current_port));
};
