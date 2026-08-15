const express = require("express");
const router = express.Router();
const { getAllTodos, createTodo, updateTodo, deleteTodo } = require("../controllers/todoControllers");

// Get all todos
router.get("/", getAllTodos);

// Create a new todo
router.post("/", createTodo);

// Update a todo
router.put("/:id", updateTodo);

// Delete a todo
router.delete("/:id", deleteTodo);  

module.exports = router;