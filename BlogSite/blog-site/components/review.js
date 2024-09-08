"use client"
import React, { useState } from 'react';

const Review = ({ reviewer, rating, text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const MAX_LENGTH = 70;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded ? text : (text.length > MAX_LENGTH ? text.substring(0, MAX_LENGTH) + '...' : text);

  return (
    <div className="review-container p-4 bg-white rounded-lg shadow-md max-w-lg mx-8 my-4">
      <div className="review-header flex items-center mb-2">
        <div className="reviewer-name text-xl font-semibold text-gray-900">{reviewer}</div>
        <div className="review-rating ml-4 text-yellow-500">
          {'★'.repeat(rating) + '☆'.repeat(5 - rating)}
        </div>
      </div>
      <div className="review-text text-gray-700">
        <p>{displayText}</p>
        {text.length > MAX_LENGTH && (
          <button
            onClick={handleToggle}
            className="text-blue-500 hover:underline mt-2"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Review;
