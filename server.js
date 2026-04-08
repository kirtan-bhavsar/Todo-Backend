import express from "express";
import connectDb from "./db.js";
import cookieParser from "cookie-parser";

import userRoutes from "./Routes/userRoutes.js";
import todoRoutes from "./Routes/todoRoutes.js";

const app = express();

connectDb();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/todos", todoRoutes);

app.listen(5000, () => {
  console.log("Server Running on port 5000");
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API Running Successfully...",
  });
});
