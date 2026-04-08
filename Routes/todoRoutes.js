import express from "express";
import {
  addTodo,
  editTodo,
  deleteTodo,
  getAllTodos,
  getTodo,
} from "../Controllers/todoController.js";
import auth from "../Middlewares/authMiddleware.js";

const todoRoutes = express.Router();

todoRoutes.get("/", auth, getAllTodos);
todoRoutes.get("/:id", auth, getTodo);
todoRoutes.post("/add", auth, addTodo);
todoRoutes.put("/edit/:id", auth, editTodo);
todoRoutes.delete("/delete/:id", auth, deleteTodo);

export default todoRoutes;
