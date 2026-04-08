import express from "express";
import Todo from "../Models/Todo.js";
import User from "../Models/User.js";

const getAllTodos = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ message: "No user found" });
  }

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res
      .status(400)
      .json({ message: "No user found with this associated request" });
  }

  //   const abc = req.query;

  //   console.log("todoController => getAllTodos => abc", abc);

  const limit = req?.query?.limit || 10;

  const page = req?.query?.page || 1;

  const skip = (page - 1) * limit;

  const todos = await Todo.find({ user: userId })
    .select("title isDone")
    .skip(skip)
    .limit(limit);

  return res
    .status(200)
    .json({ message: "Todos fetched successfully", todos, limit, page });
};

const editTodo = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ message: "No user found" });
  }

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(400).json({ message: "No user found" });
  }

  const todoId = req.params.id;

  const todo = await Todo.findOne({ _id: todoId });

  if (userId != todo.user.toString()) {
    return res.status(400).json({ message: "Unauthorized access" });
  }

  const isDone = req?.body?.isDone;
  const title = req?.body?.title;

  if ((isDone === null || isDone === undefined) && !title) {
    return res
      .status(400)
      .json({ message: "Please provide valid data to update" });
  }

  if (isDone == todo.isDone) {
    return res
      .status(400)
      .json({ message: "Cannot update state if both are equal" });
  }

  let updatedBody = {};

  if (title && title.trim() !== "") {
    updatedBody.title = title;
  }

  if (isDone !== null && isDone !== undefined) {
    updatedBody.isDone = isDone;
  }

  const updatedTodo = await Todo.findByIdAndUpdate(todoId, updatedBody, {
    new: true,
  });

  return res
    .status(200)
    .json({ message: "Todo edited successfully", data: updatedTodo });
};

const deleteTodo = () => {};

const addTodo = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ message: "No user found" });
  }

  let { title } = req.body;

  title = title.trim();

  if (!title) {
    return res
      .status(400)
      .json({ message: "Please provide all the necessary details" });
  }

  const user = await User.findOne({ _id: userId });

  console.log("todoController => addTodo => user", user);

  if (!user) {
    return res.status(400).json({ message: "No user found" });
  }

  const todo = new Todo({
    title,
    user: userId,
  });

  todo.save();

  res.status(201).json({ message: "todo added successfully", todo });
};

const getTodo = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "User not authroized to perform this action" });
  }

  const todoId = req.params.id;

  console.log("todoController => getTodo => todoId", todoId);

  if (!todoId) {
    return res.status(400).json({ message: "No todo found" });
  }

  const todo = await Todo.findOne({ _id: todoId });

  console.log("todoController => getTodo => todo", todo);

  if (!todo) {
    return res
      .status(400)
      .json({ message: "No todo found with this associated id" });
  }

  if (userId !== todo.user.toString()) {
    return res
      .status(401)
      .json({ message: "User not authorized to perform this action" });
  }

  res.status(200).json({ message: "Todo fetched successfully", todo });
};

export { addTodo, editTodo, deleteTodo, getAllTodos, getTodo };
