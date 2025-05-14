import axios from "axios";

const API_URL = "http://localhost:3000/profile";

export const getProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
