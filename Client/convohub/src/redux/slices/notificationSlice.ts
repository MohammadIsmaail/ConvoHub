// notificationSlice.ts banate hain. 🔥Ye unread messages aur notifications store karega.

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: [] as any[]
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {

        setNotifications: (state, action) => {
            state.notifications = action.payload;
        },

        addNotification: (state, action) => {
            state.notifications.push(action.payload);
        },

        clearNotifications: (state) => {
            state.notifications = [];
        }

    }
});

export const {
    setNotifications,
    addNotification,
    clearNotifications
} = notificationSlice.actions;

export default notificationSlice.reducer;


// Redux Structure Ab

// {
//   auth: {
//     token: "...",
//     user: {...},
//     isAuthenticated: true
//   },

//   conversation: {
//     selectedConversation: null,
//     messages: []
//   },

//   onlineUsers: {
//     onlineUsers: []
//   },

//   notification: {
//     notifications: []
//   }
// }