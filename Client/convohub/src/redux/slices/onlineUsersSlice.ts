// onlineUsersSlice.ts banate hain. Ye socket se aane wale online users ko Redux me store karega.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    onlineUsers: [] as any[]
};

const onlineUsersSlice = createSlice({
    name: "onlineUsers",
    initialState,
    reducers: {
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },

        clearOnlineUsers: (state) => {
            state.onlineUsers = [];
        }
    }
});

export const {
    setOnlineUsers,
    clearOnlineUsers
} = onlineUsersSlice.actions;

export default onlineUsersSlice.reducer;