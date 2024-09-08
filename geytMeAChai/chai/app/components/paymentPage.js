"use client";

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Your Stripe public key
const stripePromise = loadStripe('your-public-key-here');

const PaymentPage = ({ userName }) => {
    const [amount, setAmount] = useState(1000); // Default to $10
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePaymentSuccess = () => {
        alert('Payment succeeded!');
    };

    const PaymentForm = () => {
        const stripe = useStripe();
        const elements = useElements();

        const handleSubmit = async (event) => {
            event.preventDefault();

            if (!stripe || !elements) {
                return;
            }

            setLoading(true);
            setError(null);

            try {
                // Call your backend to create a PaymentIntent and get the client secret
                const response = await fetch('/api/create-payment-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amount }) // Amount in cents
                });

                const { clientSecret } = await response.json();

                // Confirm the payment with the client secret
                const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: 'Customer Name', // Optionally, you can include billing details
                        },
                    },
                });

                if (stripeError) {
                    setError(stripeError.message);
                } else if (paymentIntent.status === 'succeeded') {
                    handlePaymentSuccess();
                }
            } catch (error) {
                setError('An error occurred. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                color: '#32325d',
                                fontSize: '16px',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#fa755a',
                                iconColor: '#fa755a',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || loading}>
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
                {error && <div>{error}</div>}
            </form>
        );
    };

    return (
        <div>
            <h1>Payment Page</h1>
            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>

            {/* Other content */}
            <div className='relative'>
                <img
                    className='h-[350px]'
                    src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/16.gif?token-time=1725408000&token-hash=DiEvdlJQYUQ3rqGBiz81jOPB6AaNOyG1oTIWikPSTKk%3D"
                    alt="Cover"
                />
                <div className='absolute -bottom-12 rounded-full right-[47%] border-2 border-black'>
                    <img
                        height={150}
                        width={100}
                        className='rounded-full'
                        src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg"
                        alt="Profile"
                    />
                </div>
            </div>

            <div className='flex flex-col justify-center items-center my-12'>
                <div className='text-xl'>{userName}</div>
                <div className='text-slate-400'>Creating Animated art for VIT's</div>
                <div className='text-slate-400'>4312 members, 65 posts, $12,453 release</div>

                <div className='payment flex gap-3 w-[80%] mt-11'>
                    <div className='supporters w-1/2 bg-slate-900 text-white rounded-lg p-10'>
                        <h2 className='font-bold my-2 text-xl'>Supporters</h2>
                        <ul className="mx-5 text-lg">
                            <li className="my-2">Umer donated $30 with message ""</li>
                            {/* Add more supporters here */}
                        </ul>
                    </div>

                    {/* Make payment */}
                    <div className='makepayment w-1/2 bg-slate-900 text-white rounded-lg p-10'>
                        <h2 className='font-bold my-2 text-xl'>Make a Payment</h2>
                        <div className="flex gap-2 flex-col">
                            <input
                                type="text"
                                placeholder='Name'
                                className="w-full p-3 rounded-lg bg-slate-800"
                            />
                            <input
                                type="text"
                                placeholder='Message'
                                className="w-full p-3 rounded-lg bg-slate-800"
                            />
                            <input
                                type="number"
                                placeholder='Amount'
                                className="w-full p-3 rounded-lg bg-slate-800"
                                onChange={(e) => setAmount(Number(e.target.value) * 100)} // Convert dollars to cents
                            />
                            <button
                                type="button"
                                className="text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                onClick={() => amount > 0 && handleSubmit({ preventDefault: () => {} })}
                            >
                                Pay
                            </button>
                        </div>

                        <div className='flex gap-2 mt-5'>
                            <button
                                className='p-3 bg-slate-800 rounded-lg'
                                onClick={() => setAmount(1000)} // Set amount to $10
                            >
                                Pay $10
                            </button>
                            <button
                                className='p-3 bg-slate-800 rounded-lg'
                                onClick={() => setAmount(2000)} // Set amount to $20
                            >
                                Pay $20
                            </button>
                            <button
                                className='p-3 bg-slate-800 rounded-lg'
                                onClick={() => setAmount(3000)} // Set amount to $30
                            >
                                Pay $30
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
