"use client";
import React from 'react';
import Link from 'next/link';
import { useLogin } from '@/context/login';


function AdminHeroSection() {
  const {  user} = useLogin();
  

  const checkAdmin = () => {
    if (user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && user.password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      return true
    }
    return false
  }


    return (
        <div className="bg-gradient-to-r from-[#8D8080] to-white min-h-[35rem] flex items-center">
            <div className="flex flex-col-reverse md:flex-row w-full px-6 md:px-16 py-8 md:py-16">
                <div className="flex-1 text-center md:text-start md:px-16">
                    <div className="text-black">
                        <div className="text-5xl md:text-6xl font-bold leading-tight text-white">
                            Welcome to Your Dashboard
                        </div>
                        <p className="py-6 text-lg md:text-xl text-gray-200">
                            Manage posts, roles, and users with ease. Use the buttons below to navigate key features and keep your platform running smoothly. For help, check the 'How it Works' guide.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 mt-8">
                            <Link href="/create-post">
                                <button className="bg-[#8D8080] text-white flex gap-3 items-center px-6 py-3 rounded-full shadow-md hover:bg-[#726f6f] transition duration-300">
                                    <svg aria-hidden="true" role="img" height="1em" width="1em" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                                    </svg>
                                    Create Post
                                </button>
                            </Link>
                            <Link href="/delete-post">
                                <button className="bg-[#8D8080] text-white flex gap-3 items-center px-6 py-3 rounded-full shadow-md hover:bg-[#726f6f] transition duration-300">
                                    <svg aria-hidden="true" role="img" height="1em" width="1em" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                                    </svg>
                                    Delete Post
                                </button>
                            </Link>
                           {checkAdmin() && <Link href="/edit-roles">
                                <button className="bg-[#8D8080] text-white flex gap-3 items-center px-6 py-3 rounded-full shadow-md hover:bg-[#726f6f] transition duration-300">
                                    <svg aria-hidden="true" role="img" height="1em" width="1em" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                                    </svg>
                                    Edit Roles
                                </button>
                            </Link>}
                        </div>
                    </div>
                </div>

                <div className="flex-1 md:mt-0">
                    <img src="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400?text=Admin+Dashboard" alt="Admin Dashboard Image" className="rounded-lg shadow-lg" />
                </div>
            </div>
        </div>
    );
}

export default AdminHeroSection;
