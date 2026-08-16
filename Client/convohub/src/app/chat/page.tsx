"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/chat/Sidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageContainer from "@/components/chat/MessageContainer";
import MessageInput from "@/components/chat/MessageInput";

import { RootState } from "@/redux/store";
import store from "@/redux/store";

import { connectSocket } from "@/services/socket";

import { setOnlineUsers } from "@/redux/slices/onlineUsersSlice";
import {
    addMessage,
    updateMessageSeen,
} from "@/redux/slices/conversationSlice";

import {
    setTyping,
    stopTyping,
} from "@/redux/slices/typingSlice";

const ChatPage = () => {
    const dispatch = useDispatch();

    const token = useSelector(
        (state: RootState) => state.auth.token
    );

    useEffect(() => {
        if (!token) return;

        const socket = connectSocket(token);

        // Duplicate listeners remove
        socket.off("onlineUsers");
        socket.off("newMessage");
        socket.off("userTyping");
        socket.off("userStopTyping");
        socket.off("messagesSeen");

        socket.on("onlineUsers", (users) => {
            dispatch(setOnlineUsers(users));
        });

        socket.on("newMessage", (message) => {
            dispatch(addMessage(message));
        });

        socket.on("userTyping", () => {
            dispatch(setTyping());
        });

        socket.on("userStopTyping", () => {
            dispatch(stopTyping());
        });

        socket.on("messagesSeen", () => {
            const { messages } =
                store.getState().conversation;

            messages.forEach((msg: any) => {
                if (!msg.isSeen) {
                    dispatch(
                        updateMessageSeen(msg._id)
                    );
                }
            });
        });

        return () => {
            socket.off("onlineUsers");
            socket.off("newMessage");
            socket.off("userTyping");
            socket.off("userStopTyping");
            socket.off("messagesSeen");
        };
    }, [token, dispatch]);

    return (
        <ProtectedRoute>
            <div className="container-fluid vh-100">
                <div className="row h-100">
                    <div className="col-md-4 border-end p-0">
                        <Sidebar />
                    </div>

                    <div className="col-md-8 p-0 d-flex flex-column">
                        <ChatHeader />

                        <MessageContainer />

                        <MessageInput />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default ChatPage;