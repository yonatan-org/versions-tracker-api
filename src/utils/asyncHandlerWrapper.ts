import { Request, Response } from "express";
import { get } from "lodash";

export const asyncHandlerWrapper = (fn: Function) => (req: Request, res: Response, next: Function) => {
  Promise.resolve(fn(req, res, next))
    .then((result: object) => {
      if (get(res, "headersSent", false)) return;

      return res.json({ data: result, code: 200 });
    })
    .catch((err: Error) => next(err));
};

