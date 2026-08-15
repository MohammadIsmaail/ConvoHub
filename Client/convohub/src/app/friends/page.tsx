"use client";

import { useEffect, useState } from "react";
import { getAllUsers, sendFriendRequest,} from "@/services/friend";

const FriendsPage = () => {
    const [users, setUsers] = useState<any[]>([]);

    const fetchUsers = async () => {
        try {
           const response = await getAllUsers();

console.log("All Users Response =>", response);

            if (response.success) {
                setUsers(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSendRequest = async (
        receiverId: string
    ) => {
        try {
            const response =
                await sendFriendRequest(receiverId);

            alert(response.message);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

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

                                <h5>
                                    {user.name}
                                </h5>

                                <p>
                                    {user.email}
                                </p>

                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        handleSendRequest(
                                            user._id
                                        )
                                    }
                                >
                                    Send Request
                                </button>

                            </div>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
};

export default FriendsPage;