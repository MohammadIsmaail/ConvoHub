// src/services/user.ts

import api from "./api";

export const getFriends = async () => {
    const response = await api.get("/user/friends");
    return response.data;
};