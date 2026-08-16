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

    const dispatch = useDispatch();

    const { token, isLoading } = useSelector(
        (state: RootState) => state.auth
    );

    const fetchFriends = async () => {
        try {
            const response = await getFriends();

            console.log(
                "Friends API Response:",
                response
            );

            if (response.success) {
                // Duplicate friends remove
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

                setFriends(uniqueFriends);
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

            console.log(
                "Conversation Response =>",
                response
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
                }

                const messageResponse =
                    await getMessages(
                        response.data._id
                    );

                console.log(
                    "Messages Response =>",
                    messageResponse
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

    return (
        <div
            className="d-flex flex-column border-end bg-white"
            style={{ height: "100vh" }}
        >
            <div className="p-3 border-bottom">
                <h3 className="fw-bold mb-0">
                    Chats
                </h3>
            </div>

            <div className="p-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search friend..."
                />
            </div>

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

            <div className="flex-grow-1 overflow-auto">
                {friends.length === 0 ? (
                    <div className="text-center mt-4 text-muted">
                        No Friends Found
                    </div>
                ) : (
                    friends.map((friend) => (
                        <div
                            key={friend._id}
                            className="border-bottom p-3"
                            style={{
                                cursor: "pointer",
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
                                        width: "50px",
                                        height: "50px",
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