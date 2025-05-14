"use client";

import { createContext, useContext, useState } from 'react';
//Context
import { useProject } from './ProjectContext';
//Types
import iComment from '@/types/iComment';
import iProject from '@/types/iProject';
//Services
import { addReviewService, getReviewService, updateReviewService, deleteReviewService } from '@/services/commentService';


interface Props {
    children: React.ReactNode;
}

interface CommentContextType {
    addComment: (newCommet: iComment) => void;
    deleteComment: (projectId: any, commentID: any) => void;
    updateComment: (comment: iComment, commentID: any) => void;
    getComments: (onProjects: iProject[]) => Promise<iProject[]>
}

export const CommentContext = createContext<CommentContextType | undefined>(undefined);

export default function CommentProvider({ children }: Props) {
    const { setProject } = useProject();

    const addComment = async (newComment: iComment) => {
        try {
            const data = await addReviewService(newComment);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateComment = async (comment: iComment, commentID: any) => {
        try {
            const data = await updateReviewService(comment, commentID);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteComment = async (projectID: any, commentID: any) => {
        try {
            const data = await deleteReviewService(projectID, commentID);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const getComments = async (onProjects: iProject[]) => {
        if (onProjects.length === 0) return [];

        const results = await Promise.allSettled(onProjects.map(proj =>
            getReviewService(proj.id || -1).then(comments => ({
                ...proj,
                comments: comments,
                quantComments: comments.length,
                averageGrade: comments.reduce((acc: any, comment: any) => acc + comment.grade, 0) / comments.length
            })).catch(error => {
                return {
                    ...proj,
                    comments: [],
                    quantComments: 0,
                    averageGrade: 0
                };
            })
        ));

        return results.map((result, index) =>
            result.status === "fulfilled" ? result.value : {
                ...onProjects[index],
                comments: [],
                quantComments: 0,
                averageGrade: 0
            }
        );
    };

    return (
        <CommentContext.Provider value={{ addComment, deleteComment, updateComment, getComments }}>
            {children}
        </CommentContext.Provider>
    );
}

export const useComment = () => {
    const context = useContext(CommentContext);
    if (context === undefined) {
        throw new Error("useComment must be used within a CommentProvider");
    }
    return context;
};
