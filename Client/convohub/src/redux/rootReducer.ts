import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice"
import conversationReducer from "./slices/conversationSlice";
import onlineUsersReducer from "@/redux/slices/onlineUsersSlice";
import notificationReducer from "@/redux/slices/notificationSlice";

export const rootReducer=combineReducers({
    auth:authReducer,
    conversation:conversationReducer,
    onlineUsers: onlineUsersReducer,
    notification: notificationReducer
    // {
    //     token:"",
    //     user:{},
    //     isAuthenticated:true

    // }
})

