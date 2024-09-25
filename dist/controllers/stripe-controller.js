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
const stripe = require('stripe')('your_stripe_secret_key');
const createPaymentIntent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ticketPrice, currency } = req.body;
    try {
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: 10000, // Stripe uses cents
            currency: currency || 'usd', // Default to USD if not provided
            payment_method_types: ['card'], // Allow card payments
        });
        res.json({
            clientSecret: paymentIntent.client_secret,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
