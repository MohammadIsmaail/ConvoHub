"use client";

import { useEffect, useState } from "react";
import { getAllUsers, sendFriendRequest } from "@/services/friend";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const FriendsPage = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [sendingId, setSendingId] = useState("");

    const { token, user } = useSelector(
        (state: RootState) => state.auth
    );

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers();

            if (response.success) {
                const filteredUsers = response.data.filter(
                    (u: any) => u._id !== user?._id
                );

                setUsers(filteredUsers);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSendRequest = async (
        receiverId: string
    ) => {
        try {
            setSendingId(receiverId);

            const response =
                await sendFriendRequest(receiverId);

            alert(response.message);

            setUsers((prev) =>
                prev.map((u) =>
                    u._id === receiverId
                        ? {
                              ...u,
                              requestSent: true,
                          }
                        : u
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUsers();
        }
    }, [token]);

    return (
        <div className="container py-4">
            <h2 className="mb-4">
                All Users
            </h2>

            <div className="row">
                {users.map((user) => (
                    <div
                        key={user._id}
                        className="col-md-4 mb-3"
                    >
                        <div className="card">
                            <div className="card-body">
                                <h5>{user.name}</h5>

                                <p>{user.email}</p>

                                {user.requestSent ? (
                                    <button
                                        className="btn btn-secondary"
                                        disabled
                                    >
                                        Request Sent
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-primary"
                                        disabled={
                                            sendingId ===
                                            user._id
                                        }
                                        onClick={() =>
                                            handleSendRequest(
                                                user._id
                                            )
                                        }
                                    >
                                        Send Request
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FriendsPage;