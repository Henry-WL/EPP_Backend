"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const router = (0, express_1.Router)();
// Route to create a payment intent
router.post('/create-payment-intent', paymentController_1.createPaymentIntent);
exports.default = router;
