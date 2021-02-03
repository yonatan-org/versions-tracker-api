/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response, Router } from "express";
import versionsRepository from "../../repositories/versionsRepository";
import { asyncHandlerWrapper } from "../../utils/asyncHandlerWrapper";
import { sendMessage } from "../../socket";
import versionsProvider from "./versionsProvider";
import eventsHandler from "./eventsHandler";

// const tempResponse = {
//   program1: [
//     {
//       projectName: "Program1",
//       status: "init",
//       commits: [
//         {
//           name: "deverloper1",
//           commitMessage: "commit message",
//           imageUrl: "https://randomuser.me/api/portraits/women/97.jpg",
//         },
//         {
//           name: "developer2",
//           commitMessage: "commit message 2",
//           imageUrl: "https://randomuser.me/api/portraits/women/7.jpg",
//         },
//       ],
//       versionInfo: {
//         commitId: "sdfsdfsdfsdf-sdfsdfsdf",
//         versionId: "1.24",
//         buildTime: "2017-09-29 13:28:39",
//         environment: "Production",
//       },
//     },
//     {
//       projectName: "Program1",
//       status: "complete",
//       commits: [
//         {
//           name: "developer1",
//           commitMessage: "commit message",
//           imageUrl: "https://randomuser.me/api/portraits/men/94.jpg",
//         },
//         {
//           name: "deverloper2",
//           commitMessage: "commit message 2",
//           imageUrl: "https://randomuser.me/api/portraits/women/15.jpg",
//         },
//       ],
//       versionInfo: {
//         commitId: "sdfsdfsdfsdf-sdfsdfsdf",
//         versionId: "1.25",
//         buildTime: "2017-09-29 13:28:39",
//         environment: "Production",
//       },
//     },
//   ],
// };

/**
 *  Versions.
 * @route GET /
 */
const get = async (req: Request, res: Response) => {
  const versions = await versionsProvider.getVersions();
  // const version = await versionsRepository.get(id);
  res.json(versions);
};

const getAll = async (req: Request, res: Response) => {
  const versions = await versionsRepository.findAll();
  res.json(versions);
};

/**
 *  Versions.
 * @route POST /
 */
const post = async (req: Request, res: Response) => {
  req.body.applicationName = req.body.applicationName.toLowerCase();
  const version = req.body;
  const result = await versionsRepository.save(version);
  eventsHandler.handleEvent("versionEvent", version);
  res.json({ result });
};

const sendMessageToClient = async (req: Request, res: Response) => {
  const msg = req.body;
  sendMessage(msg);
  res.json("OK");
};

export const getVersionsController = () => {
  const versionsRouter = Router();

  versionsRouter.get("/", asyncHandlerWrapper(get));
  versionsRouter.get("/getAll", asyncHandlerWrapper(getAll));
  versionsRouter.post("/", asyncHandlerWrapper(post));
  versionsRouter.post(
    "/send-message-to-client",
    asyncHandlerWrapper(sendMessageToClient)
  );

  return versionsRouter;
};
