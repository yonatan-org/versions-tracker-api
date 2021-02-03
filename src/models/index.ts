import * as sequelize from "sequelize";
import { VersionFactory } from "./Version.model";

export const dbConfig = new sequelize.Sequelize(
  (process.env.DB_NAME = "postgres"),
  (process.env.DB_USER = "postgres"),
  (process.env.DB_PASSWORD = "somePassword"),
  {
    port: Number(process.env.DB_PORT) || 5432,
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000,
    },
    logging: console.log,
  }
);

dbConfig.sync({
  force: false,
});

// THIS ONES ARE THE ONES YOU NEED TO USE ON YOUR CONTROLLERS
export const VersionModel = VersionFactory(dbConfig);

// THIS ONES ARE THEVersion.modelNEED TO USE ON YOUR CONTROLLERS
