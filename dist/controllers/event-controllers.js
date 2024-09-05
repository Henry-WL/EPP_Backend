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
exports.createEvent = exports.getAllEvents = void 0;
const event_1 = __importDefault(require("../models/event"));
const http_error_1 = __importDefault(require("../middleware/http-error"));
const getAllEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allEvents = yield event_1.default.find({});
    console.log(allEvents);
    res.status(200).json({ allEvents });
});
exports.getAllEvents = getAllEvents;
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
