import axios from "axios";

const API_URL = "http://localhost:3000/auth";

export const login = async (formData: any) => {
    try {
        const response = await axios.post(API_URL + "/login", formData, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axios.get(API_URL + "/logout")
        return response.data;
    } catch (error) {
        throw error;
    }
};