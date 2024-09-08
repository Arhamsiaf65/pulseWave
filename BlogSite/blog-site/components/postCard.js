"use client";
import Link from 'next/link';
import React, { useRef, useEffect, useState } from 'react';

function PostCard() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/allposts');
                const data = await res.json();

                const sortedPosts = data.sort((a, b) => b.likes - a.likes);
                const topPosts = sortedPosts.slice(0, 5);
                setPosts(topPosts);
            } catch (error) {
                console.log('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const scrollRef = useRef(null);

    const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -380 : 380,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="relative">
            {/* Scroll buttons */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-16 text-2xl top-1/2 -translate-y-1/2 text-black p-2 rounded-full z-10"
            >
                &lt;
            </button>

            <button
                onClick={() => scroll('right')}
                className="absolute right-16 top-1/2 text-2xl -translate-y-1/2 text-black p-2 rounded-full z-10"
            >
                &gt;
            </button>

            {/* Scrollable content area */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto w-[20rem] md:w-auto gap-5 p-4 scrollbar-hidden mx-28"
                style={{ scrollBehavior: 'smooth' }}
            >
                {loading ? (
                   <div className=' flex gap-10  '>
                   {  Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className=" max-w-full md:max-w-[22rem] bg-white border border-gray-200 rounded-lg shadow-md flex-shrink-0 animate-pulse"
                            style={{ width: '22rem', height: 'auto' }}
                        >
                            <div className="w-full aspect-[1.3] bg-gray-200 rounded-t-lg"></div>

                            <div className="p-5 flex flex-col h-full w-full">
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                            </div>
                        </div>
                    ))}
                   </div>
                ) : posts.length === 0 ? (
                    <p>No posts available</p>
                ) : (
                    posts.map(post => (
                        <div key={post.id} className="flex flex-col justify-between items-center max-w-full md:max-w-[22rem] bg-white border border-gray-200 rounded-lg shadow-md flex-shrink-0">
                            <img
                                className="rounded-t-lg object-cover w-full aspect-[1.3]"
                                src={post.image}
                                alt="Post Thumbnail"
                            />
                            <div className="p-5 flex flex-col h-full">
                                <Link href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight">
                                        {post.title}
                                    </h5>
                                </Link>
                                <p className="mb-3 font-normal h-[67px] overflow-hidden text-gray-700 dark:text-gray-400">
                                    {stripHtml(post.content)}
                                </p>
                                <Link
                                    href="#"
                                    className="inline-flex items-center w-max px-3 py-2 text-sm font-medium text-center text-white bg-[#8D8080] rounded-md"
                                >
                                    Read more
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default PostCard;
