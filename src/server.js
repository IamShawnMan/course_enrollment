import app from "./app.js";

import { config } from "./config/config.js";
import { connectionDB } from "./config/db.js";
import logger from "./utils/logger/logger.js";

const PORT = config.api.port;
const start = () => {
  try {
    connectionDB();
    app.listen(PORT, () => {
      logger.info(`Server satrted on port ${PORT}`);
    });
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    logger.info(`Error: ${error.message}`);
    process.exit(1);
  }
};

start();
