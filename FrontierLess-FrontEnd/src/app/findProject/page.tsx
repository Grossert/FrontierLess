'use client';

import { useState, useEffect } from 'react';
// Contexts
import { useProject } from "@/contexts/ProjectContext";
import { useStep } from '@/contexts/StepContext';
import { useComment } from '@/contexts/CommentContext';
// Components
import Card from "@/components/Card";
import FormSearch from "@/components/FormSearch";
import Project from "@/components/Project";
import LoadingScreen from '@/components/LoadingScreen';
// Types
import iProject from "@/types/iProject";


export default function FindProject() {
    const { project, setProject, getProjects } = useProject();
    const { getSteps } = useStep();
    const { getComments } = useComment();

    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ destination: '', status: '', exchangeType: '' });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getProjects();
                const uComment = await getComments(data);
                const uProject = await getSteps(uComment);
                setProject(uProject);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleFilterChange = (filterName: string, value: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value.toLowerCase(),
        }));
    };

    const filteredProjects = project.filter(proj =>
        proj.destination
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(filters.destination.toLowerCase()) && // Garante consistência no valor do input
        (filters.status === '' || (proj.status || '').toLowerCase() === filters.status) &&
        (filters.exchangeType === '' || proj.exchangeType.toLowerCase() === filters.exchangeType)
    );


    const openProject = (selectedProj: iProject) => {
        const updatedProjects = project.map((proj) =>
            proj.id === selectedProj.id ? { ...proj, selected: true } : { ...proj, selected: false }
        );
        setProject(updatedProjects);
    };

    const findProject = true;

    return (
        <div className="container mx-auto min-h-screen flex flex-col items-center justify-center">
            <div className="p-4 max-w-xl w-full">
                <FormSearch
                    onFilterChange={(filterName: string, value: string) => handleFilterChange(filterName, value)}
                />
            </div>

            <div className="flex space-x-4 w-full p-4">
                <div className="w-full flex flex-col space-y-4">
                    <section className="w-full min-h-screen flex flex-col items-center shadow-lg p-4 bg-white rounded-lg">
                        <div className="w-full text-center mb-4">
                            <p className="hover:text-blue-900 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Projetos</p>
                        </div>
                        {loading ? (
                            <LoadingScreen />
                        ) : (
                            filteredProjects.map((proj) => (
                                <Card key={proj.id} project={proj} onClick={() => openProject(proj)} />
                            ))
                        )}
                    </section>
                </div>

                <section className="w-full min-h-screen shadow-lg p-4 bg-white rounded-lg" id="projectContainer">
                    {project?.find((proj) => proj.selected) ? (
                        <Project
                            key={project.find((proj) => proj.selected)?.id}
                            sProject={project.find((proj) => proj.selected)!}
                            findProject={findProject}
                        />
                    ) : (
                        <div className="text-gray-500 flex justify-center">Nenhum projeto selecionado</div>
                    )}
                </section>
            </div>
        </div>
    );
}
