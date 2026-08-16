"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getFriends } from "@/services/friend";
import { createConversation } from "@/services/conversation";
import { getMessages } from "@/services/message";
import { getSocket } from "@/services/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";

import {setSelectedConversation,setMessages,} from "@/redux/slices/conversationSlice";

const Sidebar = () => {
    const [friends, setFriends] = useState<any[]>([]);
    const dispatch = useDispatch();
     const { token, isLoading } = useSelector(
        (state: RootState) => state.auth
    );
    const fetchFriends = async () => {
    try {
        const response = await getFriends();

        console.log("Friends API Response:", response);

        if (response.success) {
            setFriends(response.data);
        }
    } catch (error) {
        console.log(error);
    }
};

    const handleSelectFriend = async (friend: any) => {
        try {
            const response = await createConversation(friend._id);
            if (response.success) {
                dispatch(
                    setSelectedConversation({
                        conversationId: response.data._id,
                        friend,
                    })
                );
            const socket = getSocket();
            if (socket) {
                socket.emit("joinConversation",response.data._id);
            }
                const messageResponse = await getMessages(
                    response.data._id
                );

                if (messageResponse.success) {
                    dispatch(
                        setMessages(messageResponse.data)
                    );
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

useEffect(() => {
    if (!isLoading && token) {
        fetchFriends();
    }
}, [token, isLoading]);

    return (
    <div
        className="d-flex flex-column h-100 border-end bg-white"
        style={{ minHeight: "100vh" }}
    >
        {/* Header */}
        <div className="p-3 border-bottom">
            <h2 className="fw-bold mb-0">
                Chats
            </h2>
        </div>

        {/* Search */}
        <div className="p-3">
            <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search friend..."
            />
        </div>

        {/* Buttons */}
        <div className="px-3 pb-3 d-flex gap-2">
            <Link
                href="/friends"
                className="btn btn-primary flex-fill"
            >
                Add Friends
            </Link>

            <Link
                href="/requests"
                className="btn btn-warning flex-fill"
            >
                Requests
            </Link>
        </div>

        {/* Friend List */}
        <div className="flex-grow-1 overflow-auto">
            {friends.length === 0 ? (
                <div className="text-center text-muted mt-4">
                    No Friends Found
                </div>
            ) : (
                friends.map((friend) => (
                    <div
                        key={friend._id}
                        onClick={() =>
                            handleSelectFriend(friend)
                        }
                        className="border-bottom p-3"
                        style={{
                            cursor: "pointer",
                            transition: "0.2s",
                        }}
                    >
                        <div className="d-flex align-items-center">
                            {/* Avatar */}
                            <div
                                className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-3"
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                }}
                            >
                                {friend.name
                                    ?.charAt(0)
                                    ?.toUpperCase()}
                            </div>

                            {/* Name */}
                            <div>
                                <h6 className="mb-1 fw-bold">
                                    {friend.name}
                                </h6>

                                <small className="text-success">
                                    Online
                                </small>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
);
};

export default Sidebar;