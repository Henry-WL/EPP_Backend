"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// id: string;
// name: string;
// location: string;
// description: string;
// startDate: string;
// endDate: string;
// const Schema = mongoose.Schema;
const eventSchema = new mongoose_1.Schema({
    name: { type: String },
    location: { type: String },
    attendees: [
        {
            userId: String,
            //   userId: { type: mongoose.Types.ObjectId, ref: "User" },
            username: String,
        },
    ],
    tags: [{ type: String }],
    description: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    ticketPrice: { type: Number, default: 0 }
});
const Event = (0, mongoose_1.model)("Event", eventSchema);
exports.default = Event;
