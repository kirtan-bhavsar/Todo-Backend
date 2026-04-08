import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

// In this file :
// -> This is the auth middleware to defined for the protected routes
// -> In the request there will be a jwt attached in the form of a cookie
// -> that cookie will be extracted, based on that we will find the user
// -> attach that user as req.user for all the protected api endpoints

const auth = async (req, res, next) => {
  const jwtToken = req?.cookies?.jwtToken;

  if (!jwtToken) {
    return res
      .status(400)
      .json({ message: "User not authorized to perform this action" });
  }

  const tokenPayload = jwt.verify(jwtToken, process.env.JWT_SECRET);

  if (!tokenPayload || !tokenPayload.user) {
    return res
      .status(400)
      .json({ message: "User not authorized to perform this action" });
  }

  req.user = tokenPayload.user;

  next();
};

export default auth;
