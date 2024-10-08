import { Request, Response, NextFunction, RequestHandler } from "express";

import Event, { EventDocument } from "../models/event";
import HttpError from "../middleware/http-error";
import {
  CreateEventBody,
  EventParams,
  JoinEvent,
  LeaveEvent,
  UserParams,
} from "./types/eventTypes";
import { isValidObjectId } from "mongoose";


export const getAllEvents: RequestHandler = async (req, res, next) => {
    const sort = req.query.sort || 'Newest'; // default to 'newest'
  
  try {
    const sortOption: { [key: string]: 1 | -1 } = sort === 'Oldest' ? { startDate: 1 } : { startDate: -1 };
    console.log('first')
    const allEvents: EventDocument[] = await Event.find({}).sort(sortOption);
    res.status(200).json({ allEvents });
  } catch (err) {
    const error = new HttpError(
      "Getting all events failed, please try again.",
      500
    );
    return next(error);
  }
};

export const getSingleEvent: RequestHandler<EventParams> = async (
  req,
  res,
  next
) => {
  const { eventId } = req.params;
  try {
    const singleEvent: EventDocument | null = await Event.findOne({
      _id: eventId,
    });

    if (!singleEvent) {
      const error = new HttpError("Event could not be found", 404);
      return next(error);
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

export const createEvent: RequestHandler<{}, {}, CreateEventBody> = async (
  req,
  res,
  next
) => {
  const {
    name,
    location,
    description,
    startDate,
    endDate,
    ticketPrice,
    payWant,
    tagsArr,
    filmData
  } = req.body;

  try {
    const newEvent = new Event({
      name,
      location,
      description,
      startDate,
      endDate,
      ticketPrice,
      payWant,
      tags: tagsArr,
      filmData
    });

    await newEvent.save();

    res.status(201).json({ newEvent });
  } catch (err) {
    const error = new HttpError("Created event failed, please try again.", 500);
    return next(error);
  }
};

export const joinEvent: RequestHandler<EventParams, {}, JoinEvent> = async (
  req,
  res,
  next
) => {
  const { eventId } = req.params;
  const { userId, username } = req.body;

  try {
    const foundEvent = await Event.findById(eventId);

    if (!foundEvent) {
      const error = new HttpError("Event not found", 404);
      return next(error);
    }

    foundEvent.attendees.push({ userId, username });

    await foundEvent.save();

    res.status(200).json({ foundEvent });
  } catch (err) {
    const error = new HttpError("Joining event failed, please try again", 500);
    return next(error);
  }
};

export const leaveEvent: RequestHandler<EventParams, {}, LeaveEvent> = async (
  req,
  res,
  next
) => {
  const { eventId } = req.params;
  const { userId } = req.body;

  try {
    const foundEvent = await Event.findById(eventId);

    if (!foundEvent) {
      const error = new HttpError("Event not found", 404);
      return next(error);
    }

    const filteredEventAttendees = foundEvent.attendees.filter(
      (attendee) => attendee.userId !== userId
    );

    foundEvent.attendees = filteredEventAttendees;

    foundEvent.save();

    res.status(200).json({ foundEvent });
  } catch {
    const error = new HttpError("Leaving event failed, please try again", 500);
    return next(error);
  }
};

export const getUserEvents: RequestHandler<UserParams> = async (
  req,
  res,
  next
) => {
  const { userId } = req.params;

  try {
    const foundUserEvents = await Event.find({
      attendees: { $elemMatch: { userId } },
    }).sort("-startDate");

    if (foundUserEvents.length < 0) {
      const error = new HttpError("No events found for this user", 404);
      return next(error);
    } else {
      return res.status(200).json({ foundUserEvents });
    }
  } catch (err) {
    const error = new HttpError("Error getting user events", 500);
    return next(error);
  }
};

export const deleteEvent: RequestHandler<EventParams> = async (
  req,
  res,
  next
) => {
  const { eventId } = req.params;
  try {
    if (!isValidObjectId(eventId)) {
      const error = new HttpError("Invalid object ID", 400);
      return next(error);
    }

    const foundEvent = await Event.findById(eventId);

    if (!foundEvent) {
      const error = new HttpError("No events found to delete", 404);
      return next(error);
    }
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    res.status(200).json({ deletedEvent });
  } catch (err) {
    const error = new HttpError("Error deleting event", 500);
    return next(error);
  }
};
