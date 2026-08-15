"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const MessageContainer = () => {
    const { messages } = useSelector(
        (state: RootState) => state.conversation
    );

    const currentUser = useSelector(
        (state: RootState) => state.auth.user as any
    );

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
                        typeof message.sender === "object"
                            ? message.sender?._id
                            : message.sender;

                    const currentUserId = currentUser?._id;

                    const isMe = senderId === currentUserId;

                    console.log("Current User =>", currentUserId);
                    console.log("Sender =>", senderId);
                    console.log("isMe =>", isMe);

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
                                        borderRadius: "15px",
                                    }}
                                >
                                    <div>
                                        {message.content}
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
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default MessageContainer;