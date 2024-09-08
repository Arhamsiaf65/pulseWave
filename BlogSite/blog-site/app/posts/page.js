"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Post() {
    const router = useRouter();
    const [allPosts, setAllPosts] = useState([]);
    const [Posts, setPosts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(["technology"]);

    const categories = ['technology', 'lifestyle', 'finance', 'health', 'travel'];

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/allposts');
                const data = await res.json();
                setAllPosts(data);
                updateRecommendations(data, selectedCategories);
            } catch (error) {
                console.log('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [selectedCategories]);

    const updateRecommendations = (posts, categories) => {
        // Filter posts based on selected categories
        const filteredPosts = posts
            .filter(post => categories.length === 0 || categories.includes(post.category))
            .slice(0, 5);
        
        setPosts(filteredPosts);
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

    const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    return (
        <div className='flex flex-wrap mx-4 md:mx-32 py-12 gap-8'>
            <div className='flex flex-col gap-5'>
                <h2 className='text-3xl font-bold'></h2>

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

                {Posts.length > 0 ? (
                    Posts.map(item => (
                        <div key={item._id} className='flex max-w-[45rem] bg-white border border-gray-200 rounded-lg shadow text-silver-400 flex-shrink-0'>
                            <img
                                className="rounded-t-lg min-w-[13rem] w-[13rem]"
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
                                <button
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#8D8080] rounded-md"
                                    onClick={() => handleClick(item._id)}
                                >
                                    Read more
                                    <svg
                                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 5h12m0 0L9 1m4 4L9 9"
                                        />
                                    </svg>
                                </button>
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
                        <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
                            Name
                        </label>
                        <input
                            type='text'
                            id='name'
                            placeholder='John Doe'
                            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8D8080]'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            placeholder='example@example.com'
                            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8D8080]'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='message' className='block text-gray-700 font-bold mb-2'>
                            Message
                        </label>
                        <textarea
                            id='message'
                            rows='4'
                            placeholder='Your message...'
                            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8D8080]'
                        ></textarea>
                    </div>
                    <button
                        type='submit'
                        className='w-full px-4 py-2 text-white bg-[#8D8080] rounded-md shadow-sm hover:bg-[#7d6e6e] focus:outline-none focus:ring-2 focus:ring-[#8D8080]'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Post;
