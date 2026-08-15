import express from "express";
import { UserLoginController, UserRegisterController } from "../Controller/userauth";
import { UserProfileController,GetAllUsersController } from "../Controller/userRelatedData";
import middlewareToken from "../Helper/TokenMiddleware";
import { AcceptFriendRequestController, FriendRequestController, FriendsListController, 
    GetPendingRequestsController, RejectFriendRequestController} from "../Controller/FriendRequest";
import { CreateConversationController, GetMyConversationsController ,SendMessageController
       , GetMessagesController, MarkMessagesSeenController, GetLatestConversationsController,
       GetUnreadMessageCountController, GetConversationUnreadCountController} from "../Controller/Messages";   
const userRouter = express.Router();

userRouter.post("/register",UserRegisterController);
userRouter.post("/login",UserLoginController);
// User Profile
userRouter.get("/profile", middlewareToken, UserProfileController);
userRouter.get(
    "/users",
    middlewareToken,
    GetAllUsersController
);

//  Friend Request Routes
userRouter.post("/friend-request/send", middlewareToken, FriendRequestController);
userRouter.get("/friend-requests", middlewareToken, GetPendingRequestsController);
userRouter.post("/friend-request/accept", middlewareToken, AcceptFriendRequestController);
userRouter.post("/friend-request/reject", middlewareToken, RejectFriendRequestController);
userRouter.get("/friends",middlewareToken,FriendsListController);

// Message Controller
// Conversation
userRouter.post( "/conversation/create",middlewareToken, CreateConversationController);
userRouter.get("/conversations", middlewareToken,  GetMyConversationsController);
// Messages
userRouter.post( "/message/send",middlewareToken,SendMessageController);
userRouter.get( "/messages/:conversationId", middlewareToken,GetMessagesController);
userRouter.put( "/messages/seen",middlewareToken,MarkMessagesSeenController);
// Latest Conversation
userRouter.get("/conversations/latest", middlewareToken, GetLatestConversationsController);
// Unread Count
userRouter.get("/messages/unread-count",middlewareToken, GetUnreadMessageCountController );
userRouter.get("/conversations/unread-count",middlewareToken,GetConversationUnreadCountController );

// 

export default userRouter;