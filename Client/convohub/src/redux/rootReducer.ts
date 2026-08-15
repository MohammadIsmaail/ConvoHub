import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import conversationReducer from "./slices/conversationSlice";
import onlineUsersReducer from "./slices/onlineUsersSlice";
import typingReducer from "./slices/typingSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    conversation: conversationReducer,
    onlineUsers: onlineUsersReducer,
    typing: typingReducer, // 👈 ye zaroor hona chahiye
    // {
    //     token:"",
    //     user:{},
    //     isAuthenticated:true

    // }
});

export default rootReducer;