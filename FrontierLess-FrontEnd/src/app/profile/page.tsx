'use client';

import { useEffect, useState } from 'react';

// Contexts
import { useProject } from '@/contexts/ProjectContext';
import { useStep } from '@/contexts/StepContext';
import { useComment } from '@/contexts/CommentContext';
import { useUser } from '@/contexts/UserContext';

// Components
import Card from '@/components/Card';
import Project from '@/components/Project';
import LoadingScreen from '@/components/LoadingScreen';

// Types
import iProject from '@/types/iProject';

// Services
import { getProfile } from '@/services/profileService';
import { followerProjectsService } from '@/services/projectServices';

export default function ProfilePage() {
  const { project, setProject, addProject } = useProject();
  const { getSteps } = useStep();
  const { getComments } = useComment();
  const { user } = useUser();

  const [userProjects, setUserProjects] = useState<iProject[]>([]);
  const [followedProjects, setFollowedProjects] = useState<iProject[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
        setLoading(true);
        try {
        const profileData = await getProfile();
        const followers = await followerProjectsService(user.id);

        const allProjects = [...profileData.userProjects, ...followers];
        const withComments = await getComments(allProjects);
        const withSteps = await getSteps(withComments);

        // Logs para depuração
        console.log('User ID:', user.id);
        console.log('Projetos:', withSteps.map(p => ({ id: p.id, uid: p.User?.id })));

        // Correção: compara com id corretamente
        const userP = withSteps.filter(p => p.User?.id === user.id);
        const followedP = withSteps.filter(p => p.User?.id !== user.id);

        setUserProjects(userP);
        setFollowedProjects(followedP);
        setProject(withSteps);
        } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        } finally {
        setLoading(false);
        }
    };

    fetchData();
    }, [user?.id]);


  const openProject = (selectedProj: iProject) => {
    const updatedProjects = project.map((proj) =>
      proj.id === selectedProj.id
        ? { ...proj, selected: true }
        : { ...proj, selected: false }
    );
    setProject(updatedProjects);
  };

    const hAddProject = () => {
        const newProject: iProject = {
            destination: "",
            exchangeType: "",
            User: {
                id: user?.id || -1,
                email: user?.email || "",
                name: user?.name || "",
            },
            steps: [],
            comments: [],
            quantComments: 0,
            quantSteps: 0,
            averageGrade: 0
        }
        addProject(newProject);
    };

  return (
    <div className="h-[calc(100vh-80px)] p-4">
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="flex h-full gap-4">
          {/* Lado esquerdo - Listas */}
          <div className="w-1/2 flex flex-col gap-6 overflow-auto">
            {/* Botão e Filtros */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <select className="border px-3 py-1">
                  <option value="Seguindo">Seguindo</option>
                  <option value="S1">S1</option>
                </select>
                <select className="border px-3 py-1">
                  <option value="Seguidores">Seguidores</option>
                  <option value="A1">A1</option>
                </select>
              </div>
            </div>

            {/* Projetos do usuário */}
            <div>
              <h2 className="text-2xl font-semibold mb-2">Seus Projetos</h2>
              <button type="button" onClick={hAddProject} title="Cria Projeto" className="hover:text-blue-900 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    + Projetos
                </button>
              {userProjects.length === 0 ? (
                <p>Você não possui projetos.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {userProjects.map((proj) => (
                    <Card
                      key={proj.id}
                      project={proj}
                      onClick={() => openProject(proj)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Projetos Seguidos */}
            <div>
              <h2 className="text-2xl font-semibold mb-2">Projetos Seguidos</h2>
              {followedProjects.length === 0 ? (
                <p>Você não está seguindo projetos.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {followedProjects.map((proj) => (
                    <Card
                      key={proj.id}
                      project={proj}
                      onClick={() => openProject(proj)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Lado direito - Detalhes do projeto */}
          <div className="w-1/2 border rounded-lg p-4 overflow-auto">
            {project?.find((proj) => proj.selected) ? (
              <Project
                key={project.find((proj) => proj.selected)?.id}
                sProject={project.find((proj) => proj.selected)!}
              />
            ) : (
              <p className="text-gray-500">
                Selecione um projeto para visualizar os detalhes.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
