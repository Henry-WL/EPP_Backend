"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controllers_1 = require("../controllers/event-controllers");
const router = (0, express_1.Router)();
router.get('/', event_controllers_1.getAllEvents);
exports.default = router;
