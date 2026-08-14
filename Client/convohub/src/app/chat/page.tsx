"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/chat/Sidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageContainer from "@/components/chat/MessageContainer";
import MessageInput from "@/components/chat/MessageInput";

const ChatPage = () => {
    return (
        <ProtectedRoute>
            <div className="container-fluid vh-100">
                <div className="row h-100">

                    {/* Sidebar */}
                    <div className="col-md-4 border-end p-0">
                        <Sidebar />
                    </div>

                    {/* Chat Area */}
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