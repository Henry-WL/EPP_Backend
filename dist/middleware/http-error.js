"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    constructor(message, errorCode) {
        super(message);
        // @ts-ignore
        this.code = errorCode;
    }
}
// module.exports = HttpError;
exports.default = HttpError;
