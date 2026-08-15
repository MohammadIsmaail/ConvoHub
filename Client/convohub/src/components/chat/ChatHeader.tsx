"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ChatHeader = () => {

    const { selectedConversation } = useSelector(
        (state: RootState) => state.conversation
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

    return (
        <div className="border-bottom p-3 d-flex align-items-center">
            <div>
                <h5 className="mb-0">
                    {selectedConversation.friend.name}
                </h5>

                <small className="text-success">
                    Online
                </small>
            </div>
        </div>
    );
};

export default ChatHeader;