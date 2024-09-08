"use client"
import React, { useState, useEffect } from 'react';
import { useLogin } from '@/context/login';


const ReviewForm = ({ onSubmit }) => {
  const {user} = useLogin()
  const [reviewer, setReviewer] = useState('');
  const [rating, setRating] = useState(5); // Default rating
  const [message, setMessage] = useState('');


  useEffect(()=> {
    if(user){
      setReviewer(user.name)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const reviewData = { reviewer, rating, message };
  
    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.error || 'Something went wrong');
        return;
      }
  
      const responseData = await response.json();
      console.log('Success:', responseData.message);
      setReviewer('');
      setRating(5);
      setMessage('');
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  

  return (
    <div className="review-form p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto my-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700 font-medium mb-2">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
          >
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Review Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            maxLength="200"
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#8d8080] hover:bg-[#7a6f6f] text-white font-bold py-2 px-4 rounded-lg transition-all ease-in"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
