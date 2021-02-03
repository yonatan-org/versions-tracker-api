import { Request, Response, Router } from "express";

import { asyncHandlerWrapper } from "../..//utils/asyncHandlerWrapper";

/**
 * Home page.
 * @route GET /
 */
const index = (req: Request, res: Response) => {
  res.send("Welcome to home page");
};

export const getHomeController = () => {
  const homeRouter = Router();

  homeRouter.get("/", asyncHandlerWrapper(index));

  return homeRouter;
};