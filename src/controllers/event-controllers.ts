import { Request, Response, NextFunction, RequestHandler } from "express";

import Event, {EventDocument} from "../models/event";
import HttpError from "../middleware/http-error";

// const HttpError = require("../middleware/http-error")

export const getAllEvents: RequestHandler = async (req, res, next) => {
  try {
    const allEvents: EventDocument[] = await Event.find({});
    res.status(200).json({ allEvents });
  } catch (err) {
    const error = new HttpError(
      "Getting events failed, please try again.",
      500
    );
    return next(error);
  }
};

export const getSingleEvent: RequestHandler = async (req, res, next) => {
  const { eventId } = req.params;
  const singleEvent = await Event.findOne({ _id: eventId });
  // existingUser = await User.findOne({ email: email });

  console.log(singleEvent);

  res.status(200).json({ event: singleEvent });
};

export const createEvent: RequestHandler = async (req, res, next) => {
  // const name = (req.body as { text: string }).text;
  // const location = (req.body as { text: string }).text;

  const { name, location } = req.body;

  const createdEvent = new Event({
    name,
    location,
  });

  try {
    await createdEvent.save();
  } catch (err) {
    const error = new HttpError("Created event failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ createEvent });
};

export const joinEvent: RequestHandler = async (req, res, next) => {
  console.log("join event clg");

  const { eventId } = req.params;
  const { userId, username } = req.body;

  console.log(eventId, userId);

  const foundEvent = await Event.findById(eventId);

  console.log(foundEvent);

  foundEvent?.attendees.push({ userId, username });

  foundEvent?.save();

  res.status(200).json({ foundEvent });
};

export const leaveEvent: RequestHandler = async (req, res, next) => {
  console.log("leave event");

  const { eventId } = req.params;
  const { userId } = req.body;

  console.log(eventId, userId);

  const foundEvent = await Event.findById(eventId);

  console.log(foundEvent, "found event");

  const filteredEventAttendees = foundEvent?.attendees.filter(
    (attendee) => attendee.userId !== userId
  );

  console.log(filteredEventAttendees, "filteredevent");

  foundEvent?.attendees = filteredEventAttendees;

  console.log(foundEvent, "foundev");

  foundEvent?.save();

  res.status(200).json({ foundEvent });

  //   foundEvent?.attendees.push({userId, username})

  //   foundEvent?.save()
};
