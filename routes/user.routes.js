import { Router } from "express";
import {
  handleUserLogin,
  handleUserLogout,
  handleUserSignup,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/signup", handleUserSignup);
userRouter.post("/login", handleUserLogin);
userRouter.post("/logout", verifyJwt, handleUserLogout);

export default userRouter;
