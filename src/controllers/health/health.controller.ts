import { Request, Response, Router } from "express";

import { asyncHandlerWrapper } from "../../utils/asyncHandlerWrapper";

/**
 *  Health check.
 * @route GET /
 */
const index = (req: Request, res: Response) => {
	res.json({ status: "ok" });
};

export const getHealthController = () => {
	const homeRouter = Router();

	homeRouter.get("/", asyncHandlerWrapper(index));

	return homeRouter;
};