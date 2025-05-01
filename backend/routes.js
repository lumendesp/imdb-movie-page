const express = require("express");
const Comment = require("../backend/models/Comment");

const router = express.Router();

// Criar um novo comentário
router.post("/", async (req, res) => {
  const { movieId, username, text } = req.body;
  try {
    const newComment = await Comment.create({ movieId, username, text });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: "Erro ao criar comentário", error: err });
  }
});

// Obter todos os comentários de um filme específico
router.get("/:movieId", async (req, res) => {
  try {
    const comments = await Comment.find({ movieId: req.params.movieId });
    res.json(comments);
  } catch (err) {
    res.status(400).json({ message: "Erro ao buscar comentários", error: err });
  }
});

// Editar um comentário por ID
router.put("/:id", async (req, res) => {
  const { text } = req.body;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    );
    res.json(updatedComment);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erro ao atualizar comentário", error: err });
  }
});

// Excluir um comentário por ID
router.delete("/:id", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Comentário excluído" });
  } catch (err) {
    res.status(400).json({ message: "Erro ao excluir comentário", error: err });
  }
});

module.exports = router;
