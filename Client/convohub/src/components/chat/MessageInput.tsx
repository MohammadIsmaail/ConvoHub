"use client";

import { useState } from "react";

const MessageInput = () => {

    const [message, setMessage] = useState("");

    const handleSend = () => {

        if (!message.trim()) return;

        console.log(message);

        setMessage("");
    };

    return (
        <div className="border-top p-3">

            <div className="input-group">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                />

                <button
                    className="btn btn-primary"
                    onClick={handleSend}
                >
                    Send
                </button>

            </div>

        </div>
    );
};

export default MessageInput;