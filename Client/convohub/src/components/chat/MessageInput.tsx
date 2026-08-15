"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { addMessage } from "@/redux/slices/conversationSlice";

import { sendMessage } from "@/services/message";

const MessageInput = () => {

    const [content, setContent] = useState("");

    const dispatch = useDispatch();

    const { selectedConversation } = useSelector(
        (state: RootState) => state.conversation
    );

    const handleSendMessage = async () => {

        if (!content.trim()) return;

        if (!selectedConversation) return;

        try {

            const response = await sendMessage(
                selectedConversation.conversationId,
                content
            );

            if (response.success) {

                dispatch(
                    addMessage(response.data)
                );

                setContent("");
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="border-top p-3">

            <div className="input-group">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message..."
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
                    }
                />

                <button
                    className="btn btn-primary"
                    onClick={handleSendMessage}
                >
                    Send
                </button>

            </div>

        </div>
    );
};

export default MessageInput;