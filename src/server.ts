import dotenv from "dotenv";
import logger from "@cider/logger";

import { initializeApplication } from "./app";
import { init } from "./socket";

const launch = async () => {
  dotenv.config();

  const server = await initializeApplication();

  init(server);

  server.listen(process.env.PORT, () => {
    logger.info(`Application is running on port: ${process.env.PORT}`);
  });
};

export default launch();
