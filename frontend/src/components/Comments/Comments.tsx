// Comments.tsx
import { useState, useEffect } from "react";
import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
} from "../../api";

import "./Comments.css";

export interface Comment {
  _id: string;
  movieId: string;
  username: string;
  text: string;
  createdAt?: string;
}

interface CommentsProps {
  movieId: string;
}

export default function Comments({ movieId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  useEffect(() => {
    if (movieId) fetchCommentsForMovie(movieId);
  }, [movieId]);

  const fetchCommentsForMovie = async (movieId: string) => {
    try {
      const commentsData = await fetchComments(movieId);
      setComments(commentsData);
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      if (username.trim() && newComment.trim()) {
        const comment = await createComment(movieId, username, newComment);
        setComments([...comments, comment]);
        setUsername("");
        setNewComment("");
      } else {
        alert("Por favor, preencha seu nome e comentário.");
      }
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    }
  };

  const handleEditComment = async (commentId: string) => {
    try {
      const updatedComment = await updateComment(commentId, editingText);
      setComments(
        comments.map((comment) =>
          comment._id === commentId ? updatedComment : comment
        )
      );
      setEditingCommentId(null);
      setEditingText("");
    } catch (error) {
      console.error("Erro ao editar comentário:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Erro ao excluir comentário:", error);
    }
  };

  return (
    <section className="comments">
      <h3>Comentários</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id} className="comment-item">
            <div className="comment-content">
              <strong>{comment.username}</strong>:{" "}
              {editingCommentId === comment._id ? (
                <div className="edit-section">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    placeholder="Editar comentário"
                  />
                  <button onClick={() => handleEditComment(comment._id)}>
                    Salvar
                  </button>
                  <button onClick={() => setEditingCommentId(null)}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="comment-text">
                  {comment.text}
                </div>
              )}
            </div>
            {!editingCommentId && (
              <div className="update-buttons">
                <button
                  onClick={() => {
                    setEditingCommentId(comment._id);
                    setEditingText(comment.text);
                  }}
                >
                  Editar
                </button>
                <button onClick={() => handleDeleteComment(comment._id)}>
                  Excluir
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Seu nome"
      />
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Adicionar comentário"
      />
      <button onClick={handleAddComment}>Comentar</button>
    </section>
  );  
}
