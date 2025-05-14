import { useState } from 'react';
//Context
import { useProject } from "@/contexts/ProjectContext";
//Components
import DeleteProjectPopup from '@/components/Popup/components/DeleteProjectPopup';
//Services
import { unfollowProjectsService } from '@/services/projectServices';


interface Props {
    project: any,
}

export default function DeleteButton({ project }: Props) {
    const { deleteProject } = useProject();

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const handleDeleteClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const hDeleteProject = async () => {
        await deleteProject(project.id);
        await unfollowProjectsService(project.id);
        setIsPopupOpen(false);
    };
    return (
        <>
            <button type="button" onClick={handleDeleteClick} className="text-sm bg-transparent hover:text-red-700 text-red-500 py-2 px-4 mb-4 md:mb-0 md:mr-4">
                Deletar projeto
            </button>
            <DeleteProjectPopup isOpen={isPopupOpen} onClose={handleClosePopup} onConfirm={hDeleteProject} />
        </>
    )
}
