"use client";

import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { getSocket } from "@/services/socket";

const MessageInput = () => {

    const [content, setContent] = useState("");

    const { selectedConversation } = useSelector(
        (state: RootState) => state.conversation
    );

    const handleSendMessage = () => {

        if (!content.trim()) return;

        if (!selectedConversation) return;

        const socket = getSocket();

        socket?.emit("sendMessage", {
            conversationId:
                (selectedConversation as any).conversationId,
            content,
        });

        socket?.emit(
            "stopTyping",
            (selectedConversation as any).conversationId
        );

        setContent("");
    };

    return (
<div className="border-top p-3 bg-white">

    <div className="input-group">

        <input
            type="text"
            className="form-control rounded-start-pill"
            placeholder="Type a message..."
            value={content}
            onChange={(e) =>
                setContent(e.target.value)
            }
        />

        <button
            className="btn btn-primary rounded-end-pill"
            onClick={handleSendMessage}
        >
            Send
        </button>

    </div>

</div>
    );
};

export default MessageInput;