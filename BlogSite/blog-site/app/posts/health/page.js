"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function healthPage() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/allposts');
                const data = await res.json();
                const techPosts = data.filter(post => post.category === 'health');
                setPosts(techPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handlePostClick = (postId) => {
        router.push(`/posts/health/${postId}`);
    };

    if (selectedPost) {
        return (
            <div className='max-w-4xl mx-auto p-4'>
                <h1 className='text-4xl font-bold'>{selectedPost.title}</h1>
                <img src={selectedPost.image} alt="Post Thumbnail" className='w-full h-auto mt-4 rounded-lg' />
                <div
                    className='content-area'
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
                <button
                    onClick={() => setSelectedPost(null)}
                    className='mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg'
                >
                    Back to Posts
                </button>
            </div>
        );
    }

    return (
        <div className='max-w-4xl mx-auto p-4'>
            <h1 className='text-4xl font-bold mb-4'>health Posts</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {posts.map(post => (
                    <div
                        key={post._id}
                        className='border p-4 rounded-lg shadow-md cursor-pointer'
                        onClick={() => handlePostClick(post._id)}
                    >
                        <img src={post.image} alt="Post Thumbnail" className='w-full h-auto mb-4 rounded-lg' />
                        <h2 className='text-2xl font-semibold'>{post.title}</h2>
                        <p className='mt-2'>{post.excerpt || stripHtml(post.content).slice(0, 100)}...</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

export default healthPage;
