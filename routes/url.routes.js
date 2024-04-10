import { Router } from "express";
import {
  handleGenerateShortUrl,
  handleGetAllUrls,
  handleGetAnalytics,
  handleVisitUrl,
} from "../controllers/url.controller.js";

const urlRouter = Router();

urlRouter.post("/", handleGenerateShortUrl);
urlRouter.get("/", handleGetAllUrls);
urlRouter.get("/:shortId", handleVisitUrl);
urlRouter.get("/analytics/:shortId", handleGetAnalytics);

export default urlRouter;
