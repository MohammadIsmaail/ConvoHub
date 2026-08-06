import express from "express";
import { UserLoginController, UserRegisterController } from "../Controller/userauth";
import { UserProfileController } from "../Controller/userRelatedData";
import middlewareToken from "../Helper/TokenMiddleware";
const userRouter = express.Router();

userRouter.post("/register",UserRegisterController);
userRouter.post("/login",UserLoginController);
userRouter.get("/profile", middlewareToken, UserProfileController);

export default userRouter;