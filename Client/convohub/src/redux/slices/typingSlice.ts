import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isTyping: false,
};

const typingSlice = createSlice({
    name: "typing",
    initialState,
    reducers: {
        setTyping: (state) => {
            state.isTyping = true;
        },
        stopTyping: (state) => {
            state.isTyping = false;
        },
    },
});

export const {
    setTyping,
    stopTyping,
} = typingSlice.actions;

export default typingSlice.reducer;