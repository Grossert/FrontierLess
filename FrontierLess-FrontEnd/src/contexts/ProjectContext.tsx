"use client";

import { createContext, useContext, useState } from 'react';
//Services
import { addProjectService, deleteProjectService, updateProjectService, getAllProjectsService, followProjectService } from "@/services/projectServices";
//Types
import iProject from "@/types/iProject";

interface Props {
    children: React.ReactNode;
}

interface ProjectContextType {
    project: iProject[];
    setProject: (projects: iProject[]) => void;
    addProject: (newProject: iProject) => void;
    deleteProject: (id: number) => void;
    updateProject: (projectID: number, projectUpdate: iProject) => void;
    getProjects: () => Promise<iProject[]>
    followProject: (followProj: any) => void
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export default function ProjectProvider({ children }: Props) {
    const [project, setProject] = useState<iProject[]>([]);

    const addProject = async (newProject: iProject) => {
        try {
            if (newProject.destination === "" && newProject.exchangeType === "") {
                setProject((prevProjects) => [...prevProjects, newProject]);
                return;
            }
            const data = await addProjectService(newProject);
            console.log(data.message)

        } catch (error) {
            console.log(error)
        }
    }

    const updateProject = async (projectID: number, updatedProject: iProject) => {
        try {
            const data = await updateProjectService(projectID, updatedProject);
            console.log(data.message)

        } catch (error) {
            console.log(error)
        }
    };

    const deleteProject = async (projectId: number) => {
        const data = await deleteProjectService(projectId);
        if (data) {
            setProject((prevProjects: iProject[]) => prevProjects.filter(proj => proj.id !== projectId));
        }
    };

    const getProjects = async () => {
        const projects = await getAllProjectsService();
        setProject(projects.projects)
        return projects.projects
    };

    const followProject = async (followProj: any) => {
        const res = await followProjectService(followProj);
        console.log('Seguindo Projeto >>>: ' + res)
    };

    return (
        <ProjectContext.Provider
            value={{
                project,
                setProject,
                addProject,
                deleteProject,
                updateProject,
                getProjects,
                followProject
            }}>
            {children}
        </ProjectContext.Provider>
    );
}

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error("useProject must be used within a ProjectProvider");
    }
    return context;
};
