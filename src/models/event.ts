import mongoose from "mongoose";
import { Document, Schema, model } from "mongoose";
// import uniqueValidator from 'mongoose-unique-validator';

export interface EventDocument extends Document {
    name: string,
    location: string,
    attendees: []
}

// const Schema = mongoose.Schema;

const eventSchema = new Schema<EventDocument>({
    name: {type: String},
    location: {type: String},
    attendees: [{userId: String, username: String}]
})


const Event = model<EventDocument>("Event", eventSchema)
export default Event;