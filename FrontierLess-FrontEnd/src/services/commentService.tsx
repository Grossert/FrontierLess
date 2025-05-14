
import axios from "axios";

const API_URL = "http://localhost:3000/review";

export const addReviewService = async (newReview: any) => {
    try {
        const response = await axios.post(`${API_URL}/`, newReview, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar Commentarios:", error);
        throw error;
    }
};

export const updateReviewService = async (editReview: any, commentID: number) => {
    try {
        const response = await axios.put(`${API_URL}/edit/${commentID}`, editReview, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar Commentarios:", error);
        throw error;
    }
};

export const deleteReviewService = async (projectID: number, commentID: number) => {
    try {
        const response = await axios.delete(`${API_URL}/${commentID}/${projectID}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar Commentarios:", error);
        throw error;
    }
};

export const getReviewService = async (projectID: number) => {
    try {
        const response = await axios.get(`${API_URL}/reviews/${projectID}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar Commentarios:", error);
        throw error;
    }
};

export const getReviewById = async (projectID: number) => {
    try {
        const response = await axios.get(`${API_URL}/${projectID}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar Commentarios:", error);
        throw error;
    }
};