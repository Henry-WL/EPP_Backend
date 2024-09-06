import { Request, Response, NextFunction, RequestHandler } from "express";

import Event, { EventDocument } from "../models/event";
import HttpError from "../middleware/http-error";

// const HttpError = require("../middleware/http-error")

export const getAllEvents: RequestHandler = async (req, res, next) => {
  try {
    const allEvents: EventDocument[] = await Event.find({});
    res.status(200).json({ allEvents });
  } catch (err) {
    const error = new HttpError(
      "Getting all events failed, please try again.",
      500
    );
    return next(error);
  }
};


export const getSingleEvent: RequestHandler<{eventId: string}> = async (req, res, next) => {
  const { eventId } = req.params;
  try {
    const singleEvent:EventDocument | null = await Event.findOne({ _id: eventId });

    if (!singleEvent) {
        const error = new HttpError("Event could not be found", 404)
        return next(error)
    }
    res.status(200).json({ event: singleEvent });
  } catch (err) {
    const error = new HttpError(
      "Getting single event failed, please try again",
      500
    );
    return next(error);
  }
};

interface CreateEventBody {
    name: string;
    location: string;
}


export const createEvent: RequestHandler<{},{},CreateEventBody> = async (req, res, next) => {
  const { name, location } = req.body;

  try {
    const newEvent = new Event({
        name,
        location,
      });

      await newEvent.save();

      res.status(201).json({ newEvent });
  } catch(err) {
    const error = new HttpError("Created event failed, please try again.", 500);
    return next(error);
  }



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
