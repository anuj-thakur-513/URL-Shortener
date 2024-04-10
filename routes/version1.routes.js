import { Router } from "express";
import urlRouter from "./url.routes.js";

const v1 = Router();

v1.use("/url", urlRouter);

export default v1;
