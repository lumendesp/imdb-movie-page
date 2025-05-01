// api.ts
import { Comment } from "./types";

const API_URL = "http://localhost:3000/comments"; // Substitua pela URL do seu backend

// Buscar comentários por movieId
export const fetchComments = async (movieId: string): Promise<Comment[]> => {
  const response = await fetch(`${API_URL}/${movieId}`);
  if (!response.ok) throw new Error("Erro ao buscar comentários");
  return response.json();
};

// Criar um novo comentário
export const createComment = async (movieId: string, username: string, text: string): Promise<Comment> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movieId, username, text }),
  });
  if (!response.ok) throw new Error("Erro ao criar comentário");
  return response.json();
};

// Atualizar um comentário
export const updateComment = async (id: string, text: string): Promise<Comment> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) throw new Error("Erro ao atualizar comentário");
  return response.json();
};

// Excluir um comentário
export const deleteComment = async (id: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao excluir comentário");
  return response.json();
};
