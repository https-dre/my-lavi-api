import { executeServer } from "./server/server";
import { executeInClusterMode } from "./server/cluster-mode";
import { logger } from "./logger";

if(process.env.NODE_ENV == "production") {
  logger.info("Executing in cluster mode.")
  executeInClusterMode();
} else {
  executeServer();
}