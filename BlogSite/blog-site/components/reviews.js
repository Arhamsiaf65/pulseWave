"use client";
import React, { useEffect, useState } from 'react';
import CreateReview from './createReview';

function Reviews() {
  const [reviews, setReviews] = useState([]); // Initialize as an array
  const [visibleReviews, setVisibleReviews] = useState(5);
  const [showCreateview, setShowCreateview] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [expandedReview, setExpandedReview] = useState(null); 
  const [loading, setLoading] = useState(true); // Loading state for shimmer effect

  useEffect(() => {
    const fetchData = async () => {
      try {
        let req = await fetch('/api/review');
        let res = await req.json();

        // Check if res is an array
        if (Array.isArray(res)) {
          setReviews(res);
          setLoading(false); // Stop loading when data is fetched
          if (res.length <= 5) {
            setHasMore(false);
          }
        } else {
          console.error('Unexpected data format:', res);
          setReviews([]);
          setLoading(false); // Stop loading even if there's an error
        }
      } catch (error) {
        console.log("Error fetching reviews", error);
        setReviews([]); // Set reviews to an empty array on error
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchData();
  }, []);

  const toggleCreateReview = () => {
    setShowCreateview(prev => !prev);
    setTimeout(() => {
      if (showCreateview) {
        window.scrollTo({
          left: 5000,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleShowMore = () => {
    setVisibleReviews(prev => prev + 5);
  };

  const handleExpand = (index) => {
    setExpandedReview(expandedReview === index ? null : index);
  };

  // Ensure displayedReviews is derived from an array
  const displayedReviews = reviews && Array.isArray(reviews) ? reviews.slice(0, visibleReviews) : [];

  return (
    <div className="p-6 bg-[#E7DFD8]">
      <div className='mx-28 flex justify-between'>
        <div className="text-3xl font-semibold text-black mb-6">What Readers Are Saying</div>
        <button
          onClick={toggleCreateReview}
          className={`text-lg font-bold text-black py-2 px-6 transition duration-200 ${showCreateview ? "hidden" : ""}`}
        >
          Share your thoughts
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-28">
        {loading ? (
          // Display shimmer effect when loading
          [...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse p-4 bg-gray-200 rounded-lg shadow-sm border border-gray-300 flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-300" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
            </div>
          ))
        ) : (
          displayedReviews.length > 0 ? (
            displayedReviews.map((review, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={`https://ui-avatars.com/api/?name=${review.reviewer}`}
                    alt={`${review.reviewer} avatar`}
                  />
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-gray-900">{review.reviewer}</div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, starIndex) => (
                        <svg
                          key={starIndex}
                          className={`h-4 w-4 ${starIndex < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p
                  className="text-gray-700 cursor-pointer"
                  onClick={() => handleExpand(index)}
                >
                  {expandedReview === index
                    ? review.message
                    : review.message.length > 20
                      ? review.message.substring(0, 20) + '...'
                      : review.message
                  }
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No reviews yet. Be the first to leave a review!</p>
          )
        )}
      </div>

      {hasMore && displayedReviews.length < reviews.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Show More
          </button>
        </div>
      )}

      <div className='relative'>
        {showCreateview && (
          <div className="mt-8">
            <CreateReview />
          </div>
        )}
        <div className="flex justify-center mt-6">
          <button
            onClick={toggleCreateReview}
            className={`absolute top-12 right-[25rem] text-black ${showCreateview ? "" : "hidden"}`}
          >
            {showCreateview ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 inline-block mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 inline-block mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {showCreateview ? "" : "Add Review"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
