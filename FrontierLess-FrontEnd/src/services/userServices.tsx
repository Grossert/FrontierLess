import axios from "axios";
import { login } from "./authServices";

const API_URL = "http://localhost:3000/user";

export const createUser = async (formData: any) => {
    try {
        const response = await axios.post(API_URL, formData);
        const lg = await login(formData);
        console.log(lg)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserById = async (UserId: number) => {
    try {
        const response = await axios.get(`${API_URL}/${UserId}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
