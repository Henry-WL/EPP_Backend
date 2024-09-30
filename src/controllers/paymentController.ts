import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';


dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Controller to create a payment intent
export const createPaymentIntent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ticketPrice, receipt_email } = req.body;

    // Create a PaymentIntent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: ticketPrice * 100, // Stripe expects amount in cents
      currency: 'gbp',
      payment_method_types: ['card'],
      receipt_email: receipt_email
    });

    // Return the client secret to the frontend
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Payment failed, please try again.' });
  }
};
