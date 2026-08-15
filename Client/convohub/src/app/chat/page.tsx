"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/chat/Sidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageContainer from "@/components/chat/MessageContainer";
import MessageInput from "@/components/chat/MessageInput";

import { RootState } from "@/redux/store";
import { connectSocket } from "@/services/socket";

import { setOnlineUsers } from "@/redux/slices/onlineUsersSlice";
import { addMessage } from "@/redux/slices/conversationSlice";

const ChatPage = () => {

    const dispatch = useDispatch();

    const token = useSelector(
        (state: RootState) => state.auth.token
    );

    useEffect(() => {

        if (!token) return;

        const socket = connectSocket(token);

        // Online Users
        socket.on("onlineUsers", (users) => {
            dispatch(setOnlineUsers(users));
        });

        // Real Time Message Receive
        socket.on("newMessage", (message) => {
            dispatch(addMessage(message));
        });

        return () => {
            socket.off("onlineUsers");
            socket.off("newMessage");
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