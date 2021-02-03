import { Request, Response } from "express";
import logger from "@cider/logger";
import { v4 as uuidv4 } from "uuid";

export const loggerMiddleware = () => (req: Request, res: Response, next: Function) => {
  const requestId: string = req.get("X-Request-ID") || uuidv4();

  if (process.env.REQUEST_LEVEL_LOGGING) logger.info({ requestId: requestId, method: req.method, originalUrl: req.originalUrl });

  return next();
};

