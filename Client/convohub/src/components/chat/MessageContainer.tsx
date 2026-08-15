"use client";

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const MessageContainer = () => {

    const { messages } = useSelector(
        (state: RootState) => state.conversation
    );

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

    return (
        <div
            className="flex-grow-1 p-3"
            style={{
                height: "calc(100vh - 140px)",
                overflowY: "auto"
            }}
        >

            {messages.length === 0 ? (
                <div className="text-center mt-5">
                    No Messages Found
                </div>
            ) : (
                messages.map((message: any) => (

                    <div
                        key={message._id}
                        className="mb-3"
                    >
                        <div className="badge text-bg-primary p-2">
                            {message.content}
                        </div>
                    </div>

                ))
            )}

            <div ref={bottomRef}></div>

        </div>
    );
};

export default MessageContainer;