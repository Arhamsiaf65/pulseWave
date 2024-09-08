"use client"; // Ensure this is at the very top if using Next.js 13+

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react";

function NavBar() {
    const [showDropDown, setShowDropDown] = useState(false);
    const { data: session, status, update } = useSession();

    const handleDropdownToggle = () => {
        setShowDropDown(prev => !prev);
    };

    const handleMouseLeave = () => {
        setShowDropDown(false);
    };

    return (
        <nav className='bg-gray-950 text-white flex justify-between px-4 h-16 items-center'>
            <div className="logo font-bold text-lg">
                <Link href="/">GetMeaChai</Link>
            </div>

            <div className='flex gap-5'>
                {session && (
                    <div className="relative">
                        <button 
                            id="dropdownDelayButton" 
                            onClick={handleDropdownToggle}
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                            type="button"
                        >
                            signed in as {session.user.name} 
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        <div 
                            id="dropdownDelay" 
                            className={`z-10 absolute my-4 ${showDropDown ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                            onMouseLeave={handleMouseLeave}
                        >
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                                <li>
                                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                </li>
                                <li>
                                    <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                                </li>
                                <li
                                    onClick={() => signOut()}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Signout
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {!session && (
                    <Link href="/login">
                        <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
