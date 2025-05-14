import axios from "axios";

const API_URL = "http://localhost:3000/notification";

export const getNotification = async () => {
    try {
        const response = await axios.get(API_URL, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar notificação:", error);
        throw error;
    }
};
