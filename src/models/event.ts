import mongoose from "mongoose";
// import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {type: String},
    location: {type: String},
    attendees: [{userId: String, username: String}]
})


const Event = mongoose.model("Event", eventSchema)
export default Event;