import { Router } from "express";
import {
  handleGenerateShortUrl,
  handleGetAllUrls,
  handleGetAnalytics,
  handleVisitUrl,
} from "../controllers/url.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const urlRouter = Router();

urlRouter.post("/", verifyJwt, handleGenerateShortUrl);
urlRouter.get("/", verifyJwt, handleGetAllUrls);
urlRouter.get("/:shortId", handleVisitUrl);
urlRouter.get("/analytics/:shortId", verifyJwt, handleGetAnalytics);

export default urlRouter;
