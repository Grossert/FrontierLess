import { useState, useEffect } from 'react';
//Contexts
import { useProject } from '@/contexts/ProjectContext';
//Components
import Select from '../Select';
import Accordion from "./components/Accordion";
import H2 from '../H2';
import Comments from '../Comments';
import SaveButton from './components/SaveButton';
import CancelButton from './components/CancelButton';
import DeleteButton from './components/DeleteButton';
import Button from '../Button';
//Types
import iStep from "@/types/iStep";
import iProject from '@/types/iProject';
import { useStep } from '@/contexts/StepContext';

interface Props {
    sProject: iProject,
    findProject?: boolean,
}

export default function Project({ sProject, findProject }: Props) {
    const { project, setProject, addProject, updateProject, followProject } = useProject();
    const { addStep, updateStep } = useStep();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProject(project.map((proj) => proj.id === sProject.id ? { ...proj, [name]: value } : proj));
    };

    const handleStepChange = (updatedStep: iStep, index: number) => {
        setProject(project.map(proj =>
            proj.id === sProject.id
                ? {
                    ...proj,
                    steps: proj.steps?.map((step, i) => i === index ? updatedStep : step)
                }
                : proj
        ));
    };

    const handleFollowProject = async () => {
        const followProj = {
            projectId: sProject.id
        }
        try {
            await followProject(followProj);
        } catch (err) {
            console.log(err)
        }
    }

    const saveProject = async () => {
        if (sProject.id && sProject.id !== 0) {
            await updateProject(sProject.id, sProject);
        } else {
            if (!sProject.destination || !sProject.exchangeType) {
                alert("Favor insira um destino e um tipo de intercâmbio");
                return;
            }
            await addProject(sProject);
        }

        for (const step of sProject.steps) {
            if (!step.name || !step.description) {
                alert("Favor insira um nome e descrição para cada etapa");
                return;
            }

            if (step.id && step.id !== 0) {
                await updateStep(step.id, step);
            } else {
                await addStep(step);
            }
        }
    };


    const onAddStep = () => {
        const newStep: iStep = {
            name: "",
            cost: 0,
            description: "",
            ProjectId: sProject.id
        };
        setProject(project.map((proj) =>
            proj.id === sProject.id ?
                {
                    ...proj,
                    steps: [...(proj.steps || []), newStep]
                }
                : proj
        ));
    };

    return (
        <>
            <form onSubmit={saveProject}>
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="flex justify-between">
                        <input
                            id="destination"
                            name="destination"
                            type="text"
                            onChange={handleChange}
                            value={sProject.destination}
                            placeholder='Destino'
                            className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                            disabled={findProject}
                        />
                        <H2>{sProject.User?.name}</H2>
                    </div>

                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Select
                            id="status"
                            name="status"
                            label="Status"
                            disabled={findProject}
                            select={sProject.status}
                            onChange={handleChange}>
                            <option value="progredindo">Progredindo</option>
                            <option value="hiato">Hiato</option>
                            <option value="finalizado">Finalizado</option>
                            <option value="abandonado">Abandonado</option>
                        </Select>

                        <Select
                            id="exchangeType"
                            name="exchangeType"
                            label="Tipo"
                            disabled={findProject}
                            select={sProject.exchangeType}
                            onChange={handleChange}>
                            <option value=""></option>
                            <option value="idioma">Idioma</option>
                            <option value="escola">Escola</option>
                            <option value="faculdade">Faculdade</option>
                            <option value="pós-graduação">Pós-graduação</option>
                            <option value="pesquisa">Pesquisa</option>
                        </Select>
                        
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Custo total</label>
                            <h2 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {Number(sProject.budget ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </h2>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="w-full text-center mb-4">
                        <button
                            disabled={findProject}
                            type="button"
                            onClick={onAddStep}
                            title="Adicionar Etapa"
                            className="mt-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-blue-900">
                            + Etapas
                        </button>
                    </div>
                    {sProject.steps?.map((step, i) => (
                        <Accordion key={i} step={step} findProject={findProject} onChange={handleStepChange} index={i} />
                    ))}
                </div>

                {!findProject && (
                    <div className="mt-4 pb-4 flex flex-col md:flex-row items-center justify-between border-b border-gray-900/10">
                        <DeleteButton project={sProject} />
                        <div className="flex flex-col md:flex-row space-x-1">
                            <SaveButton onSave={saveProject} />
                            <CancelButton />
                        </div>
                    </div>
                )}

                {findProject && (
                    <Button type="button" onClick={handleFollowProject}>
                        Seguir Projeto
                    </Button>
                )}
            </form>
            <div className='w-full'>
                <Comments sProject={sProject} />
            </div>
        </>
    );

}
