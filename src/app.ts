import express, { Application } from "express";
import http from "http";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerMiddleware from "swagger-express-middleware";

import { useRoutes } from "./controllers/useRoutes";
import { useErrorHandler } from "./controllers/useErrorHandler";
import { omitMiddleware, loggerMiddleware } from "./middlewares";
import { dbConfig } from "./models/index";

export const initializeApplication = async (): Promise<http.Server> => {
  const app: Application = express();

  // Add headers
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");

    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Pass to next layer of middleware
    next();
  });

  app.disable("x-powered-by");
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false, limit: "20mb" }));

  return new Promise((resolve, reject) => {
    swaggerMiddleware(
      "./src/controllers/swagger.yaml",
      app,
      async (err: Error, mdlw) => {
        if (err) return reject(err);

        try {
          await dbConfig.authenticate();
          console.log("Connection has been established successfully.");
        } catch (error) {
          console.error("Unable to connect to the database:", error);
        }

        app.use(
          "/api-explorer",
          swaggerUi.serve,
          swaggerUi.setup(null, {
            swaggerUrl: "/api-docs",
          })
        );

        app.use(mdlw.metadata());
        app.use(mdlw.files());
        app.use(mdlw.parseRequest());
        app.use(omitMiddleware());
        app.use(loggerMiddleware());

        useRoutes(app);
        useErrorHandler(app);

        return resolve(http.createServer(app));
      }
    );
  });
};
