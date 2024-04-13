import { Router } from "express";
import urlRouter from "./url.routes.js";
import userRouter from "./user.routes.js";

const v1 = Router();

v1.use("/url", urlRouter);
v1.use("/user", userRouter);

export default v1;
