import express from "express";
import { UserLoginController, UserRegisterController } from "../Controller/userauth";
import { UserProfileController } from "../Controller/userRelatedData";
import middlewareToken from "../Helper/TokenMiddleware";
import { AcceptFriendRequestController, FriendRequestController, FriendsListController, 
    GetPendingRequestsController, RejectFriendRequestController} from "../Controller/FriendRequest";
const userRouter = express.Router();

userRouter.post("/register",UserRegisterController);
userRouter.post("/login",UserLoginController);
// User Profile
userRouter.get("/profile", middlewareToken, UserProfileController);

//  Friend Request Routes
userRouter.post("/friend-request/send", middlewareToken, FriendRequestController);
userRouter.get("/friend-requests", middlewareToken, GetPendingRequestsController);
userRouter.post("/friend-request/accept", middlewareToken, AcceptFriendRequestController);
userRouter.post("/friend-request/reject", middlewareToken, RejectFriendRequestController);
userRouter.get("/friends",middlewareToken,FriendsListController

// Message Controller
 

);

export default userRouter;