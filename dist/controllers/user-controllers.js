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
exports.login = exports.signup = void 0;
const user_1 = __importDefault(require("../models/user"));
const http_error_1 = __importDefault(require("../middleware/http-error"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /*
           const errors = validationResult(req);
  
           if (!errors.isEmpty()) {
              console.log(errors);
              return next(
              new HttpError("Invalid inputs passed, please check your data.", 422)
             );
          }
      */
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = yield user_1.default.findOne({ email: email });
        console.log(existingUser, "< existing user");
    }
    catch (err) {
        const error = new http_error_1.default("Sign up failed", 500);
        return next(error);
    }
    if (existingUser) {
        const error = new http_error_1.default("User already exists, please login", 422);
        return next(error);
    }
    const saltRounds = 12;
    let hashedPass;
    try {
        hashedPass = yield bcrypt_1.default.hash(password, saltRounds);
    }
    catch (err) {
        console.log(err, "error hashing pass");
    }
    const createdUser = new user_1.default({
        email: email,
        password: hashedPass,
        isStaff: false
    });
    try {
        yield createdUser.save();
    }
    catch (err) {
        const error = new http_error_1.default("Signing up failed, please try again.", 500);
        return next(error);
    }
    let token;
    try {
        token = jsonwebtoken_1.default.sign({ userId: createdUser.id, email: createdUser.email }, process.env.JWT_KEY, { expiresIn: "1h" });
    }
    catch (err) {
        const error = new http_error_1.default("Signing up failed, please try again", 500);
        return next(error);
    }
    res
        .status(201)
        .json({ userId: createdUser, email: createdUser.email, token: token });
    // .json({createdUser})
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = yield user_1.default.findOne({ email: email });
    }
    catch (err) {
        const error = new http_error_1.default("Logging in failed, please try again later", 500);
        return next(error);
    }
    if (!existingUser) {
        const error = new http_error_1.default("Invalid credentials, could not log you in.", 403);
        return next(error);
    }
    let isValidPassword = false;
    try {
        isValidPassword = yield bcrypt_1.default.compare(password, existingUser.password);
    }
    catch (err) {
        const error = new http_error_1.default("Could not log you in, please check your credentials and try again", 500);
        return next(error);
    }
    if (!isValidPassword) {
        const error = new http_error_1.default("Invalid credentials, could not log you in.", 403);
        return next(error);
    }
    let token;
    try {
        token = jsonwebtoken_1.default.sign({ userId: existingUser.id, email: existingUser.email }, process.env.JWT_KEY, { expiresIn: "1h" });
    }
    catch (err) {
        const error = new http_error_1.default("Signing up failed, please try again", 500);
        return next(error);
    }
    res
        .status(201)
        .json({ userId: existingUser.id, email: existingUser.email, token: token, isStaff: existingUser.isStaff });
});
exports.login = login;
