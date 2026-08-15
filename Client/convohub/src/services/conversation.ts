import api from "./api";

export const createConversation = async (receiverId: string) => {
    const response = await api.post("/user/conversation/create",{ receiverId });
    return response.data;
};