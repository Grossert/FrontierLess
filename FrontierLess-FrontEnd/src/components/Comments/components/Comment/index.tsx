import { useState, useEffect } from 'react';
//Components
import StarAvaliation from "@/components/StarAvaliation";
import CommentSettings from "../CommentSettings";
//Services
import { getUserById } from "@/services/userServices";
//Contexts
import { useProject } from '@/contexts/ProjectContext';
import { useComment } from '@/contexts/CommentContext';

//Types
import iUser from "@/types/iUser";
import iProject from '@/types/iProject';

interface Props {
    comment: any;
    projectID: any;
}

export default function Comment({ comment, projectID }: Props) {
    const [user, setUser] = useState<iUser | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.description);
    const [editedGrade, setEditedGrade] = useState(comment.grade);
    const [currentComment, setCurrentComment] = useState(comment);
    const [isVisible, setIsVisible] = useState(true);

    const { updateComment, deleteComment } = useComment();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const usr = await getUserById(comment.UserId);
                setUser(usr);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, [comment.UserId]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleUpdate = async (commentID: number) => {
        const nComment = {
            description: editedComment,
            grade: editedGrade
        };
        await updateComment(nComment, commentID);
        setIsEditing(false);
        setCurrentComment({ ...currentComment, ...nComment });
    };

    const handleDelete = async () => {
        await deleteComment(projectID, comment.id)
        setIsEditing(false);
        setIsVisible(false);
    };

    if (!isVisible) return null;
    const formattedDate = new Date(currentComment.updatedAt).toLocaleDateString('pt-BR');

    return (
        <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 w-full">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">{user?.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{formattedDate}</p>
                </div>
                <div className="flex space-x-5">
                    {isEditing ? (
                        <StarAvaliation grade={editedGrade} onChange={setEditedGrade} disabled={false} />
                    ) : (
                        <StarAvaliation grade={currentComment.grade} disabled={true} />
                    )}
                    <CommentSettings onEdit={handleEdit} onRemove={handleDelete} />
                </div>
            </div>
            <div className="w-full break-words">
                {isEditing ? (
                    <div>
                        <textarea
                            value={editedComment}
                            onChange={(e) => setEditedComment(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
                        />
                        <button
                            onClick={() => handleUpdate(comment.id)}
                            className="text-sm bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-1 px-2 rounded mt-2">
                            Salvar
                        </button>
                    </div>
                ) : (
                    <p>{currentComment.description}</p>
                )}
            </div>
        </article>
    );
}
