import { Router } from "express";
import { handleUserSignup } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/", handleUserSignup);

export default userRouter;
