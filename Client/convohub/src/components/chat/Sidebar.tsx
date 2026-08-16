"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { RootState } from "@/redux/store";

import { getFriends } from "@/services/friend";
import { createConversation } from "@/services/conversation";
import { getMessages } from "@/services/message";
import { getSocket } from "@/services/socket";

import {
    setSelectedConversation,
    setMessages,
} from "@/redux/slices/conversationSlice";

const Sidebar = () => {
    const [friends, setFriends] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    const dispatch = useDispatch();

    const { token, isLoading } = useSelector(
        (state: RootState) => state.auth
    );

    const { onlineUsers } = useSelector(
        (state: RootState) => state.onlineUsers
    );

    const { selectedConversation } = useSelector(
        (state: RootState) => state.conversation
    );

    const fetchFriends = async () => {
        try {
            const response = await getFriends();

            if (response.success) {
                const uniqueFriends = Array.from(
                    new Map(
                        response.data.map(
                            (friend: any) => [
                                friend._id,
                                friend,
                            ]
                        )
                    ).values()
                );

                setFriends(uniqueFriends as any[]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectFriend = async (
        friend: any
    ) => {
        try {
            const response =
                await createConversation(
                    friend._id
                );

            if (response.success) {
                dispatch(
                    setSelectedConversation({
                        conversationId:
                            response.data._id,
                        friend,
                    })
                );

                const socket = getSocket();

                if (socket) {
                    socket.emit(
                        "joinConversation",
                        response.data._id
                    );

                    socket.emit(
                        "markSeen",
                        response.data._id
                    );
                }

                const messageResponse =
                    await getMessages(
                        response.data._id
                    );

                if (
                    messageResponse.success
                ) {
                    dispatch(
                        setMessages(
                            messageResponse.data
                        )
                    );
                }
            }
        } catch (error) {
            console.log(
                "Select Friend Error =>",
                error
            );
        }
    };

    useEffect(() => {
        if (!isLoading && token) {
            fetchFriends();
        }
    }, [token, isLoading]);

    const filteredFriends =
        friends.filter((friend: any) =>
            friend.name
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );

    return (
        <div
            className="d-flex flex-column border-end bg-white"
            style={{ height: "100vh" }}
        >
            {/* Header */}
            <div className="p-3 border-bottom">
                <h3 className="fw-bold mb-0">
                    Chats
                </h3>
            </div>

            {/* Search */}
            <div className="p-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search friend..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
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
                {filteredFriends.length ===
                0 ? (
                    <div className="text-center mt-4 text-muted">
                        No Friends Found
                    </div>
                ) : (
                    filteredFriends.map(
                        (friend: any) => {
                            const isOnline =
                                onlineUsers.includes(
                                    friend._id
                                );

                            const isActive =
                                (selectedConversation as any)
                                    ?.friend
                                    ?._id ===
                                friend._id;

                            return (
                                <div
                                    key={
                                        friend._id
                                    }
                                    className={`border-bottom p-3 ${
                                        isActive
                                            ? "bg-light"
                                            : ""
                                    }`}
                                    style={{
                                        cursor:
                                            "pointer",
                                    }}
                                    onClick={() =>
                                        handleSelectFriend(
                                            friend
                                        )
                                    }
                                >
                                    <div className="d-flex align-items-center">
                                        <div
                                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                                            style={{
                                                width:
                                                    "50px",
                                                height:
                                                    "50px",
                                                fontWeight:
                                                    "bold",
                                            }}
                                        >
                                            {friend.name
                                                ?.charAt(
                                                    0
                                                )
                                                ?.toUpperCase()}
                                        </div>

                                        <div>
                                            <div className="fw-bold">
                                                {
                                                    friend.name
                                                }
                                            </div>

                                            <small
                                                className={
                                                    isOnline
                                                        ? "text-success"
                                                        : "text-secondary"
                                                }
                                            >
                                                ●{" "}
                                                {isOnline
                                                    ? "Online"
                                                    : "Offline"}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    )
                )}
            </div>
        </div>
    );
};

export default Sidebar;