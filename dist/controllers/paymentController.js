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
exports.createPaymentIntent = void 0;
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
// Initialize Stripe with your test secret key
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });
// Controller to create a payment intent
const createPaymentIntent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('running create payment intent');
    try {
        const { ticketPrice, receipt_email } = req.body;
        console.log(req.body, 'req body');
        console.log(ticketPrice, receipt_email, 'ticket, receipt email');
        // console.log(ticketPrice, currency, 'ticketttttttt')
        // Create a PaymentIntent with the specified amount
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: ticketPrice * 100, // Stripe expects amount in cents
            currency: 'gbp',
            payment_method_types: ['card'],
            receipt_email: receipt_email
        });
        // Return the client secret to the frontend
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    }
    catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Payment failed, please try again.' });
    }
});
exports.createPaymentIntent = createPaymentIntent;
