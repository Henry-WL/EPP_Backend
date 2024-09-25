import { Router } from 'express';
import { createPaymentIntent } from '../controllers/paymentController';

const router = Router();

// Route to create a payment intent
router.post('/create-payment-intent', createPaymentIntent);

export default router;
