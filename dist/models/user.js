"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// import uniqueValidator from 'mongoose-unique-validator';
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    email: { type: String },
    password: { type: String }
});
// userSchema.plugin(uniqueValidator)
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
