"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// import uniqueValidator from 'mongoose-unique-validator';
const Schema = mongoose_1.default.Schema;
const eventSchema = new Schema({
    name: { type: String },
    location: { type: String }
});
const Event = mongoose_1.default.model("Event", eventSchema);
exports.default = Event;
