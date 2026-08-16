"use client";

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getSocket } from "@/services/socket";

const MessageContainer = () => {
    const { messages, selectedConversation } =
        useSelector(
            (state: RootState) =>
                state.conversation
        );

    const currentUser = useSelector(
        (state: RootState) => state.auth.user as any
    );

    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto Scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    // Auto Seen
    useEffect(() => {
        if (!selectedConversation) return;

        const socket = getSocket();

        socket?.emit(
            "markSeen",
            (selectedConversation as any)
                .conversationId
        );
    }, [messages, selectedConversation]);

    return (
        <div
            className="flex-grow-1 p-4"
            style={{
                height: "calc(100vh - 140px)",
                overflowY: "auto",
                background: "#f5f5f5",
            }}
        >
            {messages.length === 0 ? (
                <div className="text-center mt-5">
                    No Messages Found
                </div>
            ) : (
                messages.map((message: any) => {
                    const senderId =
                        typeof message.sender ===
                        "object"
                            ? message.sender?._id
                            : message.sender;

                    const currentUserId =
                        currentUser?._id;

                    const isMe =
                        senderId === currentUserId;

                    return (
                        <div
                            key={message._id}
                            className={`d-flex mb-3 ${
                                isMe
                                    ? "justify-content-end"
                                    : "justify-content-start"
                            }`}
                        >
                            <div
                                style={{
                                    maxWidth: "60%",
                                }}
                            >
                                <div
                                    className={`px-3 py-2 shadow-sm ${
                                        isMe
                                            ? "bg-primary text-white"
                                            : "bg-white"
                                    }`}
                                    style={{
                                        borderRadius:
                                            "15px",
                                    }}
                                >
                                    <div>
                                        {
                                            message.content
                                        }
                                    </div>

                                    <div
                                        className={`small mt-1 ${
                                            isMe
                                                ? "text-light"
                                                : "text-secondary"
                                        }`}
                                    >
                                        {new Date(
                                            message.createdAt
                                        ).toLocaleTimeString(
                                            [],
                                            {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }
                                        )}
                                    </div>

                                    {isMe && (
                                        <div
                                            className={`small text-end mt-1 ${
                                                message.isSeen
                                                    ? "text-warning"
                                                    : "text-light"
                                            }`}
                                            style={{
                                                fontSize:
                                                    "11px",
                                            }}
                                        >
                                            {message.isSeen
                                                ? "✓✓ Seen"
                                                : "✓ Sent"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })
            )}

            <div ref={bottomRef} />
        </div>
    );
};

export default MessageContainer;