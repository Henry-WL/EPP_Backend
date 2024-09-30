const stripe = require('stripe')('your_stripe_secret_key');

const createPaymentIntent = async (req, res) => {
  const { ticketPrice, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 10000, // Stripe uses cents
      currency: currency || 'usd', // Default to USD if not provided
      payment_method_types: ['card'], // Allow card payments
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
