import iStep from "@/types/iStep";
import axios from "axios";

const API_URL = "http://localhost:3000/project-item";

export const addItemsService = async (newStep: iStep) => {
    try {
        const response = await axios.post(API_URL, newStep, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao criar Etapa:", error);
        throw error;
    }
}

export const deleteItemsService = async (stepID: number) => {
    try {
        const response = await axios.delete(`${API_URL}/${stepID}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao deletar Etapa:", error);
        throw error;
    }
}

export const updateItemsService = async (stepID: number, updateStep: iStep) => {
    try {
        const response = await axios.put(`${API_URL}/${stepID}`, updateStep, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar Etapa:", error);
        throw error;
    }
}

export const getItemsService = async (projectID: number) => {
    try {
        const response = await axios.get(`${API_URL}/project-items/${projectID}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar Etapas:", error);
        throw error;
    }
};
