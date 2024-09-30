"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.getUserEvents = exports.leaveEvent = exports.joinEvent = exports.createEvent = exports.getSingleEvent = exports.getAllEvents = void 0;
const event_1 = __importDefault(require("../models/event"));
const http_error_1 = __importDefault(require("../middleware/http-error"));
const mongoose_1 = require("mongoose");
const getAllEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const sort = req.query.sort || 'Newest'; // default to 'newest'
    try {
        const sortOption = sort === 'Oldest' ? { startDate: 1 } : { startDate: -1 };
        const allEvents = yield event_1.default.find({}).sort(sortOption);
        res.status(200).json({ allEvents });
    }
    catch (err) {
        const error = new http_error_1.default("Getting all events failed, please try again.", 500);
        return next(error);
    }
});
exports.getAllEvents = getAllEvents;
const getSingleEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.params;
    try {
        const singleEvent = yield event_1.default.findOne({
            _id: eventId,
        });
        if (!singleEvent) {
            const error = new http_error_1.default("Event could not be found", 404);
            return next(error);
        }
        res.status(200).json({ event: singleEvent });
    }
    catch (err) {
        const error = new http_error_1.default("Getting single event failed, please try again", 500);
        return next(error);
    }
});
exports.getSingleEvent = getSingleEvent;
const createEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, location, description, startDate, endDate, ticketPrice, payWant, tagsArr, filmData } = req.body;
    try {
        const newEvent = new event_1.default({
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
        yield newEvent.save();
        res.status(201).json({ newEvent });
    }
    catch (err) {
        const error = new http_error_1.default("Created event failed, please try again.", 500);
        return next(error);
    }
});
exports.createEvent = createEvent;
const joinEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.params;
    const { userId, username } = req.body;
    try {
        const foundEvent = yield event_1.default.findById(eventId);
        if (!foundEvent) {
            const error = new http_error_1.default("Event not found", 404);
            return next(error);
        }
        foundEvent.attendees.push({ userId, username });
        yield foundEvent.save();
        res.status(200).json({ foundEvent });
    }
    catch (err) {
        const error = new http_error_1.default("Joining event failed, please try again", 500);
        return next(error);
    }
});
exports.joinEvent = joinEvent;
const leaveEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.params;
    const { userId } = req.body;
    try {
        const foundEvent = yield event_1.default.findById(eventId);
        if (!foundEvent) {
            const error = new http_error_1.default("Event not found", 404);
            return next(error);
        }
        const filteredEventAttendees = foundEvent.attendees.filter((attendee) => attendee.userId !== userId);
        foundEvent.attendees = filteredEventAttendees;
        foundEvent.save();
        res.status(200).json({ foundEvent });
    }
    catch (_a) {
        const error = new http_error_1.default("Leaving event failed, please try again", 500);
        return next(error);
    }
});
exports.leaveEvent = leaveEvent;
const getUserEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const foundUserEvents = yield event_1.default.find({
            attendees: { $elemMatch: { userId } },
        }).sort("-startDate");
        if (foundUserEvents.length < 0) {
            const error = new http_error_1.default("No events found for this user", 404);
            return next(error);
        }
        else {
            return res.status(200).json({ foundUserEvents });
        }
    }
    catch (err) {
        const error = new http_error_1.default("Error getting user events", 500);
        return next(error);
    }
});
exports.getUserEvents = getUserEvents;
const deleteEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.params;
    try {
        if (!(0, mongoose_1.isValidObjectId)(eventId)) {
            const error = new http_error_1.default("Invalid object ID", 400);
            return next(error);
        }
        const foundEvent = yield event_1.default.findById(eventId);
        if (!foundEvent) {
            const error = new http_error_1.default("No events found to delete", 404);
            return next(error);
        }
        const deletedEvent = yield event_1.default.findByIdAndDelete(eventId);
        res.status(200).json({ deletedEvent });
    }
    catch (err) {
        const error = new http_error_1.default("Error deleting event", 500);
        return next(error);
    }
});
exports.deleteEvent = deleteEvent;
