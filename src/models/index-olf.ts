
import mongoose from "mongoose";
import logger from "@cider/logger";

import Example, { IExample } from "./Example.model";

function loadDataBase() {
  mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoReconnect: true,
  });

  mongoose.connection.on("connected", () => logger.info("database connected"));
  mongoose.connection.on("disconnected", () => logger.info("database disconnected"));
  mongoose.connection.on("error", (err) => logger.error(err));

  if (process.env.DEBUG_MONGO) { mongoose.set("debug", true); }
}

export {
  loadDataBase,
  Example,
  IExample
};
