import { loginUser, registerUser } from "../Controllers/userController.js";
import express from "express";

const userRoutes = express.Router();

userRoutes.post("/login", loginUser);
userRoutes.post("/register", registerUser);

export default userRoutes;
