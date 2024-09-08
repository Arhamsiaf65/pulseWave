"use client";

import React, { useState, useEffect } from 'react';
import { useLogin } from '@/context/login';

const DeletePost = () => {
  const [titles, setTitles] = useState([])
  const [selectedPost, setSelectedPost] = useState('');
  const [success, setSuccess] = useState(false);
  const { isLoggedIn, login, logout, user } = useLogin();


  const checkAdmin = () => {
    if (user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && user.password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      return true
    }
    return false
  }

  // Fetch posts from the server
  const fetchData = async () => {
    try {
      const res = await fetch('/api/allposts');
      if (!res.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await res.json();

      const extractedTitles = data.map(item => ({
        postId: item._id,
        postTitle: item.title
      }));

      setTitles(extractedTitles);

      console.log('Fetched data:', data);
      console.log('Extracted titles:', extractedTitles);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();

    if (user) {
      if (checkAdmin()) {
        if (!user) {
          alert('You must be logged in to delete posts.');
          return;
        }

        if (!selectedPost) {
          alert('Please select a post to delete.');
          return;
        }

        try {
          const res = await fetch(`/api/allposts?id=${selectedPost}`, {
            method: 'DELETE',
          });

          if (!res.ok) {
            throw new Error('Failed to delete post');
          }

          const result = await res.json();
          console.log('Post deleted successfully:', result);

          setSuccess(true);
          setSelectedPost('');
          fetchData();
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      }
      else {
        alert('Itna pagal samja h k admin ka check hi ni lagaon ga')
      }
    }
    else {
      alert('bharwy login to kr le')
    }
  };


  return (
    <>
      {
       user && checkAdmin() ? 
       <div className="p-4 pt-10 bg-white max-w-screen-md mx-auto md:mt-16 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-4 text-gray-900">Delete a Post</h1>
          {success && <p className="text-red-600 mb-4">Post has been deleted successfully!</p>}
          <form onSubmit={handleDelete}>
            <div className="mb-4">
              <label htmlFor="post" className="block text-gray-700 font-medium mb-2">Select Post:</label>
              <select
                id="post"
                value={selectedPost}
                onChange={(e) => setSelectedPost(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
              >
                <option value="">Select a post</option>
                {titles.map((post) => (
                  <option
                    className='text-black'
                    key={post.postId}
                    value={post.postId} // Use postId as value
                  >
                    {post.postTitle}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all ease-in"
            >
              Delete
            </button>
          </form>
        </div> : <div>
          This Page is for admin Only
        </div>
      }
    </>
  );
};

export default DeletePost;
