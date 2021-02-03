import { Request, Response } from "express";
import { omitBy, isUndefined } from "lodash";

export const omitMiddleware = () => (req: Request, res: Response, next: Function) => {
  req.query = omitBy(req.query, isUndefined);
  req.params = omitBy(req.params, isUndefined);
  req.body = omitBy(req.body, isUndefined);

  return next();
};

