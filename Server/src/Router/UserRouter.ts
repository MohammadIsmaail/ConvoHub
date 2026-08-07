import express from "express";
import { UserLoginController, UserRegisterController } from "../Controller/userauth";
import { UserProfileController } from "../Controller/userRelatedData";
import middlewareToken from "../Helper/TokenMiddleware";
import { AcceptFriendRequestController, FriendRequestController, GetPendingRequestsController } from "../Controller/FriendRequest";
const userRouter = express.Router();

userRouter.post("/register",UserRegisterController);
userRouter.post("/login",UserLoginController);
userRouter.get("/profile", middlewareToken, UserProfileController);
userRouter.post("/friend-request/send", middlewareToken, FriendRequestController);
userRouter.get("/friend-requests", middlewareToken, GetPendingRequestsController);
userRouter.post("/friend-request/accept", middlewareToken, AcceptFriendRequestController);

export default userRouter;