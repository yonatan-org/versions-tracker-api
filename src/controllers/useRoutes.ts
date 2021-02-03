import { Application } from "express";
import path from "path";
import fs from "fs";

import { getVersionsController } from "./versions/versions.controller";

const dir = path.join(process.cwd(), "public");
const mime = {
  jpg: "image/jpeg",
};

export const useRoutes = (app: Application) => {
  app.use("/versions", getVersionsController());
  app.get("/get-image", (req, res) => {
    const { fileName } = req.query;
    const file = path.join(dir, fileName + ".jpg");
    const type = mime["jpg"] || "text/plain";
    const s = fs.createReadStream(file);
    s.on("open", function () {
      res.set("Content-Type", type);
      s.pipe(res);
    });
    s.on("error", function () {
      res.set("Content-Type", "text/plain");
      res.status(404).end("Not found");
    });
  });
};
