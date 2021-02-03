import { Request, Response, Application } from "express";
import logger from "@cider/logger";

import { BaseError } from "../utils/errors";

export const useErrorHandler = (app: Application) => {
  app.use((err: Error, req: Request, res: Response) => {
    const { message, stack } = err;

    if (process.env.REQUEST_LEVEL_LOGGING) logger.error(`${message} ${stack}`);

    if (err instanceof BaseError) {
      return res
        .status((err as BaseError).code)
        .json({ code: (err as BaseError).code, msg: message });
    }

    return res
      .status(500)
      .json({ code: 500, msg: message || "Internal server error" });
  });
};
