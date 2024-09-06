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
exports.leaveEvent = exports.joinEvent = exports.createEvent = exports.getSingleEvent = exports.getAllEvents = void 0;
const event_1 = __importDefault(require("../models/event"));
const http_error_1 = __importDefault(require("../middleware/http-error"));
const getAllEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allEvents = yield event_1.default.find({});
    console.log(allEvents);
    res.status(200).json({ allEvents });
});
exports.getAllEvents = getAllEvents;
const getSingleEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.params;
    const singleEvent = yield event_1.default.findOne({ _id: eventId });
    // existingUser = await User.findOne({ email: email });
    console.log(singleEvent);
    res.status(200).json({ event: singleEvent });
});
exports.getSingleEvent = getSingleEvent;
const createEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const name = (req.body as { text: string }).text;
    // const location = (req.body as { text: string }).text;
    const { name, location } = req.body;
    const createdEvent = new event_1.default({
        name,
        location,
    });
    try {
        yield createdEvent.save();
    }
    catch (err) {
        const error = new http_error_1.default("Created event failed, please try again.", 500);
        return next(error);
    }
    res.status(201).json({ createEvent: exports.createEvent });
});
exports.createEvent = createEvent;
const joinEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("join event clg");
    const { eventId } = req.params;
    const { userId, username } = req.body;
    console.log(eventId, userId);
    const foundEvent = yield event_1.default.findById(eventId);
    console.log(foundEvent);
    foundEvent === null || foundEvent === void 0 ? void 0 : foundEvent.attendees.push({ userId, username });
    foundEvent === null || foundEvent === void 0 ? void 0 : foundEvent.save();
    res.status(200).json({ foundEvent });
});
exports.joinEvent = joinEvent;
const leaveEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('leave event');
    const { eventId } = req.params;
    const { userId } = req.body;
    console.log(eventId, userId);
    const foundEvent = yield event_1.default.findById(eventId);
    console.log(foundEvent, 'found event');
    const filteredEventAttendees = foundEvent === null || foundEvent === void 0 ? void 0 : foundEvent.attendees.filter((attendee) => attendee.userId !== userId);
    console.log(filteredEventAttendees, 'filteredevent');
    foundEvent === null || foundEvent === void 0 ? void 0 : foundEvent.attendees = filteredEventAttendees;
    console.log(foundEvent, 'foundev');
    foundEvent === null || foundEvent === void 0 ? void 0 : foundEvent.save();
    res.status(200).json({ foundEvent });
    //   foundEvent?.attendees.push({userId, username})
    //   foundEvent?.save()
});
exports.leaveEvent = leaveEvent;
