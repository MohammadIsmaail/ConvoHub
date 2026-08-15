"use client";

import { useEffect, useState } from "react";
import {getPendingRequests,acceptRequest,rejectRequest} from "@/services/friend";

const RequestsPage = () => {

    const [requests, setRequests] =
        useState<any[]>([]);

    const fetchRequests = async () => {
        try {

            const response =
                await getPendingRequests();

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
        try {

            const response =
                await acceptRequest(requestId);

            alert(response.message);

            fetchRequests();

        } catch (error) {
            console.log(error);
        }
    };

    const handleReject = async (
        requestId: string
    ) => {
        try {

            const response =
                await rejectRequest(requestId);

            alert(response.message);

            fetchRequests();

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div className="container py-4">

            <h2 className="mb-4">
                Pending Requests
            </h2>

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
                        <div className="card-body d-flex justify-content-between align-items-center">

                            <div>
                                <h5>
                                    {request.sender.name}
                                </h5>

                                <p className="mb-0">
                                    {request.sender.email}
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
    );
};

export default RequestsPage;