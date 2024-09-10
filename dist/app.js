"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const todos_1 = __importDefault(require("./routes/todos"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const event_routes_1 = __importDefault(require("./routes/event-routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
// bodyparser
// cors
app.use((0, cors_1.default)());
app.use('/todos', todos_1.default);
app.use('/api/user', user_routes_1.default);
app.use('/api/events', event_routes_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
mongoose_1.default.connect(`${process.env.DB_URI}`).then(() => {
    app.listen(3000, () => {
        console.log("Example app listening on 3000");
    });
});
// app.listen(3000)
