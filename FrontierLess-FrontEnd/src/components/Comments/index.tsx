import React, { useState } from 'react';
//contexts
import { useProject } from "@/contexts/ProjectContext";
import { useComment } from '@/contexts/CommentContext';
import { useUser } from '@/contexts/UserContext';
//Components
import H2 from "../H2";
import Button from "../Button";
import TextArea from "../TextArea";
import StarAvaliation from "../StarAvaliation";
import Comment from "./components/Comment";
//Types
import iProject from '@/types/iProject';
import iComment from '@/types/iComment';

interface Props {
    sProject: iProject;
}

export default function Comments({ sProject }: Props) {
    const { project, setProject } = useProject();
    const { user } = useUser();
    const { addComment } = useComment();

    const [textAreaValue, setTextAreaValue] = useState("");
    const [selectedGrade, setSelectedGrade] = useState<number | null>(null);

    const onAddComment = () => {
        if (!textAreaValue.trim()) return;

        const newComment: iComment = {
            grade: selectedGrade ?? 0,
            description: textAreaValue,
            UserId: user?.id,
            ProjectId: sProject.id,
            updatedAt: new Date
        }

        setProject(project.map((proj) =>
            proj.id === sProject.id ?
                {
                    ...proj,
                    comments: [...(proj.comments || []), newComment]
                }
                : proj
        ));

        addComment(newComment);
        setTextAreaValue("");
        setSelectedGrade(0)
    };

    return (
        <section className="bg-white dark:bg-gray-900 py-4 lg:py-8 w-full max-w-2xl mx-auto flex-col">
            <div className="flex justify-between items-center">
                <H2>Comentários</H2>
            </div>

            <div className="py-2 px-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="mb-3">
                    <StarAvaliation onChange={setSelectedGrade} />
                </div>
                <TextArea
                    id="comment"
                    name="comment"
                    value={textAreaValue}
                    onChange={(e: any) => setTextAreaValue(e.target.value)}
                    placeholder="Deixe seu comentário..."
                />
            </div>
            <Button type="button" onClick={onAddComment}>Postar comentário</Button>


            {Array.isArray(sProject.comments) && sProject.comments.length > 0 ? (
                sProject.comments.map((cmt, index) => {
                    return (
                        <Comment key={index} comment={cmt} projectID={sProject.id} />
                    );
                })) :
                (
                    <div className="text-gray-500 p-4">Nenhum comentario Encontrado</div>
                )}
        </section>
    );
}
