import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';


// Initialize Stripe with your test secret key
dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2022-11-15' });

// Controller to create a payment intent
export const createPaymentIntent = async (req: Request, res: Response): Promise<void> => {
    console.log('running create payment intent')
  try {
    const { ticketPrice, currency = 'usd' } = req.body;
    console.log(ticketPrice, currency, 'ticketttttttt')
    // Create a PaymentIntent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: ticketPrice * 100, // Stripe expects amount in cents
      currency,
      payment_method_types: ['card'],
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
