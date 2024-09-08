"use client"
import React, { useState } from 'react';
import ReviewForm from './reviewForm';
import Review from './review';

const CreateReview = () => {

  const [reviews, setReviews] = useState([]);
  const handleReviewSubmit = (newReview) => {
    setReviews([...reviews, newReview]);
  };
 
  return (
    <div className="app p-4 ">
      <ReviewForm onSubmit={handleReviewSubmit} />
    </div>
  );
};

export default CreateReview;
