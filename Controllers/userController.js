import express from "express";
import User from "../Models/User.js";
import generateToken from "../Utils/generateToken.js";
import bcrypt from "bcrypt";

const loginUser = async (req, res) => {
  let { email, password } = req.body;

  email = email.trim();
  password = password.trim();

  if (!email || !password) {
    res
      .status(400)
      .json({ message: "Please provide all the necessary credentials" });
  }

  const user = await User.findOne({
    email,
  });

  console.log("userController -> user", user);

  if (!user) {
    return res.status(404).json({ message: "Invalid credentials" });
  }

  const validatePassword = await bcrypt.compare(password, user.password);

  if (!validatePassword) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  // cookie setup
  generateToken(res, user);
};

const registerUser = async (req, res) => {
  let { email, password, name } = req.body;

  email = email.trim();
  password = password.trim();
  name = name.trim();

  console.log("name", name);

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Please provide all the necessary details" });
  }

  const ifUserExists = await User.findOne({
    email,
  });

  if (ifUserExists) {
    return res.status(400).json({
      message: "User with same email id already exists, please try logging in.",
    });
  }

  const user = new User({
    email,
    name,
  });

  user.password = await user.hashPassword(password);

  await user.save();

  console.log("userController => registerUser => user", user);

  // res.status(201).json({ message: "User registered successfully" });
  generateToken(res, user);
};

export { loginUser, registerUser };
