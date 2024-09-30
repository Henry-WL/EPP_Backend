import { Request, Response, NextFunction, RequestHandler } from "express";

import User from "../models/user";
import HttpError from "../middleware/http-error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// const HttpError = require("../middleware/http-error")
import mongoose from "mongoose";
import { UserParams } from "./types/eventTypes";
import { PatchUser } from "./types/userTypes";

export const signup: RequestHandler = async (req, res, next) => {
  /*
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            console.log(errors);
            return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
           );
        }
    */

  const { email, username, password } = req.body as { email: string; username: string; password: string };

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
    console.log(existingUser, "< existing user");
  } catch (err) {
    const error = new HttpError("Sign up failed", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User already exists, please login", 422);
    return next(error);
  }

  const saltRounds = 12;
  let hashedPass;

  try {
    hashedPass = await bcrypt.hash(password, saltRounds);
  } catch (err) {
    console.log(err, "error hashing pass");
  }

  const createdUser = new User({
    email: email,
    username: username,
    password: hashedPass,
    isStaff: false
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser, email: createdUser.email, token: token });
    // .json({createdUser})
};

export const login: RequestHandler = async (req, res, next) => {
  const { email, username, password } = req.body as { email: string; username: string; password: string };

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email, username: existingUser.username },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ userId: existingUser.id, email: existingUser.email, token: token, isStaff: existingUser.isStaff }); 
};

export const getUser:RequestHandler<UserParams> = async (req, res, next ) => {
  const {userId} = req.params;
  
  try {
    const foundUser = await User.findById(userId).select('-password')
    res.status(200).json({foundUser})

  } catch (err) {
    const error = new HttpError("No user found", 404);
    return next(error);
  }
}

export const patchUser:RequestHandler<UserParams, PatchUser> = async (req, res, next) => {
  const {userId} = req.params

  const {username, email, password} = req.body

  console.log(username, email, password, userId)

  const updateData: Partial<{ username: string; email: string; password: string }> = {};

  // Conditionally add fields to the update object
  if (username) updateData.username = username;
  if (email) updateData.email = email;

  const saltRounds = 12;
  let hashedPass;

  if (password) {
    try {
      hashedPass = await bcrypt.hash(password, saltRounds);
      updateData.password = hashedPass
    } catch (err) {
      console.log(err, "error hashing pass");
    }
  }

 

  

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, {$set: updateData}, {new: true})

    console.log(updatedUser)

    if (!updatedUser) {
      const error = new HttpError("User not found", 404);
      return next(error);
    }


    res.status(200).json({updatedUser})
    
  } catch(err) {
    const error = new HttpError("Editing user failed, please try again later", 500);
    return next(error);
  }
}