import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedConversation: null,
    messages: [] as any[],
};

const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        setSelectedConversation: (state, action) => {
            state.selectedConversation = action.payload;
        },

        setMessages: (state, action) => {
            state.messages = action.payload;
        },

        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        updateMessageSeen: (state, action) => {
        state.messages = state.messages.map((msg) =>
        msg._id === action.payload
            ? { ...msg, isSeen: true }
            : msg
          );
        },

        clearMessages: (state) => {
            state.messages = [];
        },

        clearConversation: (state) => {
            state.selectedConversation = null;
            state.messages = [];
        },
    },
});

export const {
    setSelectedConversation,
    setMessages,
    addMessage,
    updateMessageSeen,
    clearMessages,
    clearConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer;