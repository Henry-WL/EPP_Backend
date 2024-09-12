import mongoose from "mongoose";
// import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

export interface EventDocument extends Document {
    email: string;
    password: string;
    isStaff: boolean;
}

const userSchema = new Schema({
    email: {type: String},
    password: {type: String},
    isStaff: {type: Boolean, default: false},

})

// userSchema.plugin(uniqueValidator)

const User = mongoose.model("User", userSchema)
export default User;