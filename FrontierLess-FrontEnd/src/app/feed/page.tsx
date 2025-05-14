"use client";

import React, { useState } from "react";

type Project = {
  key: number;
  pais: string;
  status: string;
  tipo: string;
  img: string;
  autor: string;
};

const initialItems: Project[] = [
  {
    key: 1,
    pais: "Austrália",
    status: "Em progresso",
    tipo: "Residencial",
    img: "/img/australia.png",
    autor: "Autor A",
  },
  {
    key: 2,
    pais: "Itália",
    status: "Concluído",
    tipo: "Comercial",
    img: "/img/imagem-roma.jpg",
    autor: "Autor B",
  },
  // Adicione mais itens conforme necessário
];

export default function Feed() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  // Simula pegar os projetos do Profile
  const [projectsFromProfile, setProjectsFromProfile] = useState(initialItems); // Aqui você pode pegar os projetos reais do Profile

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setComments([]); // Limpa os comentários ao selecionar um novo projeto
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment(""); // Limpa o campo de entrada após o envio
    }
  };

  return (
    <div className="container mx-auto p-6 flex">
      <div className="w-2/3 pr-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Feed de Projetos</h1>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {projectsFromProfile.map((item) => (
            <div
              key={item.key}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => handleProjectClick(item)}
            >
              <img src={item.img} alt={item.tipo} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{item.tipo}</h2>
                <p className="text-gray-600">{item.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`transition-all duration-500 ${selectedProject ? "w-2/3" : "w-1/3"} pl-6`}
      >
        {selectedProject ? (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">{selectedProject.tipo}</h2>

            {/* Detalhes do Projeto Selecionado */}
            <div className="mb-4">
              <h3 className="font-semibold">Detalhes do Projeto:</h3>
              <p><strong>País:</strong> {selectedProject.pais}</p>
              <p><strong>Status:</strong> {selectedProject.status}</p>
              <p><strong>Tipo:</strong> {selectedProject.tipo}</p>
              <p><strong>Autor:</strong> {selectedProject.autor}</p>
            </div>

            {/* Comentários */}
            <div className="mb-4">
              <h3 className="font-semibold">Comentários:</h3>
              <div className="space-y-2">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <p key={index} className="text-gray-700">
                      {comment}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500">Nenhum comentário ainda.</p>
                )}
              </div>
            </div>
            <form onSubmit={handleCommentSubmit} className="flex">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="border rounded-lg p-2 flex-grow mr-2"
                placeholder="Adicione um comentário..."
              />
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold rounded-lg px-4 hover:bg-blue-600"
              >
                Comentar
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-500">Selecione um projeto para ver os comentários.</p>
          </div>
        )}
      </div>
    </div>
  );
}
