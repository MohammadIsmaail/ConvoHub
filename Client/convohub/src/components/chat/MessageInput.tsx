"use client";

import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { getSocket } from "@/services/socket";

const MessageInput = () => {
    const [content, setContent] = useState("");

    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

    const handleTyping = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setContent(e.target.value);

        if (!selectedConversation) return;

        const socket = getSocket();

        socket?.emit(
            "typing",
            (selectedConversation as any).conversationId
        );

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            socket?.emit(
                "stopTyping",
                (selectedConversation as any)
                    .conversationId
            );
        }, 1000);
    };

    return (
        <div className="border-top p-3 bg-white">
            <div className="input-group">

                <input
                    type="text"
                    className="form-control rounded-start-pill"
                    placeholder="Type a message..."
                    value={content}
                    onChange={handleTyping}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSendMessage();
                        }
                    }}
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