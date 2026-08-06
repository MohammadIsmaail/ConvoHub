import express from "express";
import { UserLoginController, UserRegisterController } from "../Controller/userauth";
const userRouter = express.Router();

userRouter.post("/register",UserRegisterController);
userRouter.post("/login",UserLoginController);

export default userRouter;