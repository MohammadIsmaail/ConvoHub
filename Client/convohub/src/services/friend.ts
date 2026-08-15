// src/services/user.ts

import api from "./api";

export const getFriends = async () => {
    const response = await api.get("/user/friends");
    return response.data;
};

export const getAllUsers = async () => {
    const response = await api.get("/user/users");
    return response.data;
};

export const sendFriendRequest = async (
    receiverId: string
) => {
    const response = await api.post(
        "/user/friend-request/send",
        { receiverId }
    );

    return response.data;
};

export const getPendingRequests = async () => {
    const response = await api.get(
        "/user/friend-requests"
    );

    return response.data;
};

export const acceptRequest = async (
    requestId: string
) => {
    const response = await api.post(
        "/user/friend-request/accept",
        { requestId }
    );

    return response.data;
};

export const rejectRequest = async (
    requestId: string
) => {
    const response = await api.post(
        "/user/friend-request/reject",
        { requestId }
    );

    return response.data;
};