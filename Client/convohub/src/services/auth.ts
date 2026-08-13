import { RegisterData } from "@/types/auth";
import { LoginData } from "@/types/auth";
import api from "./api";


// export const registerUser = async (data: {
//     name: string;
//     email: string;
//     password: string;
// }) => {
//     const response = await api.post("/user/register", data);

//     return response.data;
// };

export const registerUser = async (data: RegisterData) => {
    const response = await api.post("/user/register", data);
    return response.data;
};


export const loginUser = async (data: LoginData) => {
    const response = await api.post("/user/login", data);

    return response.data;
};