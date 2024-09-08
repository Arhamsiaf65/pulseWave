"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function RecommendedPost() {
    const router = useRouter();
    const [allPosts, setAllPosts] = useState([]);
    const [recommendedPosts, setRecommendedPosts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(["technology"]);
    const [likes, setLikes] = useState({});
    const [userLikes, setUserLikes] = useState(new Set());
    const [loading, setLoading] = useState(true); // Added loading state
    const userId = "user123";

    const categories = ['technology', 'lifestyle', 'finance', 'health', 'travel'];

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/allposts');
                const data = await res.json();
                setAllPosts(data);
                updateRecommendations(data, selectedCategories);

                const likesMap = {};
                data.forEach(post => {
                    likesMap[post._id] = post.likes || 0;
                });
                setLikes(likesMap);
            } catch (error) {
                console.log('Error fetching posts:', error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchPosts();
    }, [selectedCategories]);

    const updateRecommendations = (posts, categories) => {
        const filteredPosts = posts
            .filter(post => categories.length === 0 || categories.includes(post.category))
            .slice(0, 5);

        setRecommendedPosts(filteredPosts);
    }

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        setSelectedCategories(prevCategories =>
            checked ? [...prevCategories, value] : prevCategories.filter(category => category !== value)
        );
    }

    const handleClick = (postId) => {
        router.push(`/posts/${postId}`);
    }

    const handleLike = async (postId) => {
        if (userLikes.has(postId)) {
            console.log('You have already liked this post.');
            return;
        }

        try {
            const response = await fetch('/api/allposts', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: postId, method: "like", userId })
            });

            const updatedPost = await response.json();

            setLikes(prevLikes => ({
                ...prevLikes,
                [postId]: (prevLikes[postId] || 0) + 1
            }));
            setUserLikes(prevUserLikes => new Set(prevUserLikes).add(postId));

        } catch (error) {
            console.log(error);
        }
    }

    const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    return (
        <div className='flex flex-wrap mx-4 md:mx-32 py-12 gap-8'>
            <div className='flex flex-col gap-5'>
                <h2 className='text-3xl font-bold'>Recommended</h2>

                <form className='bg-white border border-gray-200 rounded-lg shadow p-6 mb-6'>
                    <div className='mb-4'>
                        <span className='block text-gray-700 font-bold mb-2'>
                            Select Categories:
                        </span>
                        <div className='flex flex-wrap gap-4'>
                            {categories.map(category => (
                                <div key={category} className='flex items-center'>
                                    <input
                                        type='checkbox'
                                        id={category}
                                        value={category}
                                        onChange={handleCategoryChange}
                                        className='mr-2'
                                    />
                                    <label htmlFor={category} className='text-gray-700'>
                                        {category}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </form>

                {loading ? (
                    Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} className='flex max-w-[45rem] bg-white border border-gray-200 rounded-lg shadow animate-pulse'>
                            <div className="rounded-t-lg min-w-[13rem] w-[13rem] bg-gray-300"></div>
                            <div className="p-5 flex-1">
                                <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                                <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
                                <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                            </div>
                        </div>
                    ))
                ) : recommendedPosts.length > 0 ? (
                    recommendedPosts.map(item => (
                        <div key={item._id} className='flex max-w-[45rem] bg-white border border-gray-200 rounded-lg shadow text-silver-400 flex-shrink-0'>
                            <img
                                className="rounded-t-lg min-w-[13rem] w-[13rem] aspect-square"
                                src={item.image}
                                alt="Post Thumbnail"
                            />
                            <div className="p-5">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight">
                                    {item.title}
                                </h5>
                                <p className="mb-3 font-normal max-h-[67px] overflow-hidden text-gray-700 dark:text-gray-400">
                                    {stripHtml(item.content)}
                                </p>
                                <div className="flex items-center gap-3">
                                    <button
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#8D8080] rounded-md"
                                        onClick={() => handleClick(item._id)}
                                    >
                                        Read more
                                    </button>

                                    <button
                                        onClick={() => handleLike(item._id)}
                                        className={`flex items-center gap-2 text-sm font-medium`}
                                    >
                                        <svg
                                            className={`rtl:rotate-180 w-3.5 h-3.5 ms-2 ${userLikes.has(item._id) ? "text-red-500" : ""}`}
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                            />
                                        </svg>

                                        {likes[item._id] || 0}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No recommendations available. Please select categories to get recommendations.</p>
                )}
            </div>
 
               
                <div className='flex-1 max-w-sm'>
                    <h2 className='text-3xl font-bold mb-4'>Contact Us</h2>
                    <form className='bg-white border border-gray-200 rounded-lg shadow p-6'>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>
                                Full Name
                            </label>
                            <input
                                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none'
                                type='text'
                                placeholder='Enter your full name'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>
                                Email
                            </label>
                            <input
                                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none'
                                type='email'
                                placeholder='Enter your email'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>
                                Message
                            </label>
                            <textarea
                                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none'
                                rows='4'
                                placeholder='Enter your message'
                            ></textarea>
                        </div>
                        <button
                            className='w-full py-2 px-4 text-white bg-[#8D8080] rounded-md hover:bg-opacity-90 transition'
                            type='submit'
                        >
                            Submit
                        </button>
                    </form>
                </div>
            
        </div>
    );
}

export default RecommendedPost;
