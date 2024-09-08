// api/create-payment-intent.js
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15', // Use the latest version or your preferred version
});

export async function POST(request) {
    try {
        const { amount } = await request.json();

        // Create a Payment Intent with the specified amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amount), // Amount in cents
            currency: 'usd', // Specify your currency
            description: 'Payment for your purchase',
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating PaymentIntent:', error);
        return NextResponse.json({ error: 'Error creating PaymentIntent' }, { status: 500 });
    }
}
