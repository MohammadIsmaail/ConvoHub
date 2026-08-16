"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ChatHeader = () => {

    const { selectedConversation } = useSelector(
        (state: RootState) => state.conversation
    );

    const { onlineUsers } = useSelector(
        (state: RootState) => state.onlineUsers
    );

    const { isTyping } = useSelector(
        (state: RootState) => state.typing
    );

    if (!selectedConversation) {
        return (
            <div className="border-bottom p-3">
                <h5 className="mb-0">
                    Select a Chat
                </h5>
            </div>
        );
    }

    const isOnline = onlineUsers.includes(
        (selectedConversation as any).friend._id
    );

    return (
        <div className="border-bottom p-3 bg-white">

            <h5 className="mb-0 fw-bold">
                {(selectedConversation as any).friend.name}
            </h5>

            {isTyping ? (
                <small className="text-primary">
                    Typing...
                </small>
            ) : (
                <small
                    className={
                        isOnline
                            ? "text-success"
                            : "text-secondary"
                    }
                >
                    ● {isOnline ? "Online" : "Offline"}
                </small>
            )}

        </div>
    );
};

export default ChatHeader;