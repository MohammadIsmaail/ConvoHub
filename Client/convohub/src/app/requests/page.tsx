"use client";

import { useEffect, useState } from "react";
import {
    getPendingRequests,
    acceptRequest,
    rejectRequest,
} from "@/services/friend";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ProtectedRoute from "@/components/ProtectedRoute";

const RequestsPage = () => {
    const [requests, setRequests] =
        useState<any[]>([]);

    const { token, isLoading } = useSelector(
        (state: RootState) => state.auth
    );

    const fetchRequests = async () => {
        try {
            const response =
                await getPendingRequests();

            console.log(response);

            if (response.success) {
                setRequests(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAccept = async (
        requestId: string
    ) => {
        const response =
            await acceptRequest(requestId);

        alert(response.message);

        fetchRequests();
    };

    const handleReject = async (
        requestId: string
    ) => {
        const response =
            await rejectRequest(requestId);

        alert(response.message);

        fetchRequests();
    };

    useEffect(() => {
        if (!isLoading && token) {
            fetchRequests();
        }
    }, [token, isLoading]);

    return (
        <ProtectedRoute>
            <div className="container py-4">
                <h2>Pending Requests</h2>

                {requests.length === 0 ? (
                    <div className="alert alert-info">
                        No Pending Requests
                    </div>
                ) : (
                    requests.map((request) => (
                        <div
                            key={request._id}
                            className="card mb-3"
                        >
                            <div className="card-body d-flex justify-content-between">
                                <div>
                                    <h5>
                                        {request.sender.name}
                                    </h5>

                                    <p>
                                        {
                                            request.sender
                                                .email
                                        }
                                    </p>
                                </div>

                                <div>
                                    <button
                                        className="btn btn-success me-2"
                                        onClick={() =>
                                            handleAccept(
                                                request._id
                                            )
                                        }
                                    >
                                        Accept
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            handleReject(
                                                request._id
                                            )
                                        }
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </ProtectedRoute>
    );
};

export default RequestsPage;