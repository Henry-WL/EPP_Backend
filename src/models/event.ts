import mongoose from "mongoose";
import { Document, Schema, model } from "mongoose";
// import uniqueValidator from 'mongoose-unique-validator';

interface Attendee {
  userId: string;
  username: string;
}

interface Tag {
  tagName: string;
}

export interface EventDocument extends Document {
  name: string;
  location: string;
  attendees: Attendee[];
  tags: Tag[];
  description: string;
  startDate: string;
  endDate: string;
}

// id: string;
// name: string;
// location: string;
// description: string;
// startDate: string;
// endDate: string;

// const Schema = mongoose.Schema;

const eventSchema = new Schema<EventDocument>({
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
});

const Event = model<EventDocument>("Event", eventSchema);
export default Event;
