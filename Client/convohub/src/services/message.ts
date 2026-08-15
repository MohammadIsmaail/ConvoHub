import api from "./api";

export const getMessages = async (
    conversationId: string
) => {
    const response = await api.get(
        `/user/messages/${conversationId}`
    );

    return response.data;
};

//
export const sendMessage = async (
    conversationId: string,
    content: string
) => {
    const response = await api.post(
        "/user/message/send",
        {
            conversationId,
            content
        }
    );

    return response.data;
};