"use client";

import { createContext, useContext, useState } from 'react';
//Types
import iStep from '@/types/iStep';
import iProject from '@/types/iProject';
//Services
import { addItemsService, updateItemsService, deleteItemsService, getItemsService } from "@/services/projectStepsServices"
//Contexts
import { useProject } from './ProjectContext';

interface Props {
    children: React.ReactNode;
}

interface StepContextType {
    addStep: (newStep: iStep) => void;
    deleteStep: (stepID: any) => void;
    updateStep: (stepID: any, updateStep: iStep) => void;
    getSteps: (onProjects: iProject[]) => Promise<iProject[]>;
}

export const StepContext = createContext<StepContextType | undefined>(undefined);

export default function StepProvider({ children }: Props) {
    const { setProject } = useProject();

    const addStep = async (newStep: iStep) => {
        try {
            const data = await addItemsService(newStep);
            console.log(data.message)
        } catch (error) {
            console.log(error)
        }
    };

    const deleteStep = async (stepID: any) => {
        try {
            const data = await deleteItemsService(stepID);
            console.log(data.message)
        } catch (error) {
            console.log(error)
        }
    };

    const updateStep = async (stepID: any, updateStep: iStep) => {
        try {
            const data = await updateItemsService(stepID, updateStep);
            console.log(data.message)
        } catch (error) {
            console.log(error)
        }
    };

    const getSteps = async (onProjects: iProject[]) => {
        if (onProjects.length === 0) return [];

        const results = await Promise.allSettled(onProjects.map(proj =>
            getItemsService(proj.id || -1).then(steps => ({
                ...proj,
                steps: steps,
                quantSteps: steps.length,
            })).catch(error => {
                console.error(`Erro ao buscar etapas para o projeto ID ${proj.id}:`, error);
                return {
                    ...proj,
                    steps: [],
                    quantSteps: 0,
                };
            })
        ));

        return results.map((result, index) =>
            result.status === "fulfilled" ? result.value : {
                ...onProjects[index],
                steps: [],
                quantSteps: 0,
            }
        );
    };



    return (
        <StepContext.Provider value={{ addStep, updateStep, getSteps, deleteStep }}>
            {children}
        </StepContext.Provider>
    );
}

export const useStep = () => {
    const context = useContext(StepContext);
    if (context === undefined) {
        throw new Error("useStep must be used within a StepProvider");
    }
    return context;
};