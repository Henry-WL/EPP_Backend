import mongoose from "mongoose";
// import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

export interface EventDocument extends Document {
    email: string;
    password: string;
    isStaff: string;
}

const userSchema = new Schema({
    email: {type: String},
    password: {type: String},
    isStaff: {type: String},

})

// userSchema.plugin(uniqueValidator)

const User = mongoose.model("User", userSchema)
export default User;