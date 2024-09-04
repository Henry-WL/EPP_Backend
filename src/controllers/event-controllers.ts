import { Request, Response, NextFunction, RequestHandler } from "express";

import Event from "../models/event";
import HttpError from "../middleware/http-error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// const HttpError = require("../middleware/http-error")
import mongoose from "mongoose";

export const getAllEvents: RequestHandler = async (req, res, next) => {
    const allEvents = await Event.find({})
    console.log(allEvents)

    res.status(200).json({allEvents})
}