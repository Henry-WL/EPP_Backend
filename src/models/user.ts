import mongoose from "mongoose";
// import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String},
    password: {type: String}
})

// userSchema.plugin(uniqueValidator)

const User = mongoose.model("User", userSchema)
export default User;