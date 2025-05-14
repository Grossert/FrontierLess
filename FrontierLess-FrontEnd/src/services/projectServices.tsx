import iProject from "@/types/iProject";
import axios from "axios";

const API_URL = "http://localhost:3000/project";

export const addProjectService = async (newProject: iProject) => {
    try {
        const response = await axios.post(API_URL, newProject, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao criar projetos:", error);
        throw error;
    }
};

export const deleteProjectService = async (projectID: number) => {
    try {
        const response = await axios.delete(`${API_URL}/${projectID}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao deletar projetos:", error);
        throw error;
    }
};

export const updateProjectService = async (projectID: number, projectUpdate: iProject) => {
    try {
        const response = await axios.put(`${API_URL}/${projectID}`, projectUpdate, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao deletar projetos:", error);
        throw error;
    }
};

export const getAllProjectsService = async () => {
    try {
        const response = await axios.get(API_URL + "/projects", {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar projetos:", error);
        throw error;
    }
};

export const followProjectService = async (followProj: any) => {
    try {
        const response = await axios.post(`${API_URL}/follow`, followProj, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao seguir projetos:", error);
        throw error;
    }
};

export const followerProjectsService = async (userID: number) => {
    try {
        const response = await axios.get(`${API_URL}/followedprojects/${userID}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar projetos:", error);
        throw error;
    }
};

export const unfollowProjectsService = async (projectID: number) => {
    try {
        const response = await axios.delete(`${API_URL}/unfollow/${projectID}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao deletar projetos:", error);
        throw error;
    }
};
