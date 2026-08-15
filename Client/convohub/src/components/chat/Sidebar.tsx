"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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

    const fetchFriends = async () => {
        try {
            const response = await getFriends();

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
        fetchFriends();
    }, []);

    return (
        <div className="p-3">
            <h4>Chats</h4>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search friend..."
            />

            <div className="list-group">
                {friends.map((friend) => (
                    <button
                        key={friend._id}
                        className="list-group-item list-group-item-action"
                        onClick={() => handleSelectFriend(friend)}
                    >
                        {friend.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;