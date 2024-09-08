"use client"

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Quicksand } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/context/login';

const quicksand = Quicksand({ subsets: ['latin'] });
function NavBar() {
  const { isLoggedIn, login, logout, user } = useLogin();
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const checkAdmin = () => {
    if (user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && user.password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      return true
    }
    return false
  }

  const checkEditor = () => {
    if (user.role === 'Editor') {
      return true
    }
    return false
  }

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleActive = (link) => {
    setActive(link);
  };

  const handleCategorySelect = (category) => {
    handleActive("home");
    setDropdownOpen(false);
    if (menuOpen) setMenuOpen(false); // Ensure the menu closes on mobile screens
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Updated Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className={`flex items-center self-center ${quicksand.className} text-3xl font-semibold whitespace-nowrap text-black`}>
            <span className='text-[#8d8080]'>pulse</span>
            <span>WAVE</span>
          </span>
        </ Link>

        {/* Toggle button for small screens */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-700 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-menu"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        {/* Search bar (visible on all screens) */}
        <div className="relative w-full md:w-auto md:order-1">
          <input
            type="text"
            id="search-navbar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-700 rounded-lg bg-gray-50"
            placeholder="Search..."
          />
         
          <button onClick={handleSearch} className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19l-4-4m0 0a7 7 0 1 0-4 4 7 7 0 0 0 4-4z" />
            </svg>
          </button> 
        </div>

        {/* Menu items */}
        <div
          ref={menuRef}
          className={`w-full ${menuOpen ? 'block' : 'hidden'} md:flex md:w-auto`}
          id="navbar-menu"
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 font-medium mt-4 md:mt-0">
            <li>
              <button
                onClick={() => {
                  handleActive("home")
                  router.push('/')
                }}
                className={`block py-2  md:p-0 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent hover:scale-110 transition-all ease-in hover:font-bold w-full md:w-fit ${active === "home" ? "text-[#8d8080] scale-110 md:bg-white bg-[#d3cece] md:border-b-2 border-[#504a4a]" : ""}`}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleActive("about")}
                className={`block py-2 px-3 md:p-0 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent hover:scale-110 transition-all ease-in hover:font-bold w-full md:w-fit ${active === "about" ? "text-[#8d8080] scale-110 md:bg-white bg-[#d3cece] md:border-b-2 border-[#504a4a]" : ""}`}
              >
                About
              </button>
            </li>
            <li>
              <Link href={'/posts'}>
                <button
                  onClick={() => {
                    handleActive("posts")
                  }}
                  className={`block py-2 px-3 md:p-0 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent hover:scale-110 transition-all ease-in hover:font-bold w-full md:w-fit ${active === "posts" ? "text-[#8d8080] scale-110 md:bg-white bg-[#d3cece] md:border-b-2 border-[#504a4a]" : ""}`}
                >
                  Posts
                </button>
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={() => {
                  setActive("categories");
                  setDropdownOpen(!dropdownOpen);
                }}
                ref={dropdownRef}
                className={`block py-2 px-3 md:p-0 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent hover:scale-110 transition-all ease-in hover:font-bold w-full md:w-fit ${active === "categories" ? "text-[#8d8080] scale-110 md:bg-white bg-[#d3cece] md:border-b-2 border-[#504a4a]" : ""}`}
              >
                Categories
              </button>
              {/* Dropdown menu */}
              {dropdownOpen && (
                <ul className="absolute z-10 bg-white border rounded-lg shadow-lg py-2 mt-1 md:w-40 w-full" ref={dropdownRef}>
                  <li>
                    <Link href={'/posts/technology'}>
                      <button
                        onClick={() => {
                          handleCategorySelect("technology")
                        }
                        }
                        className="block px-4 py-2 text-gray-900 hover:bg-gray-100 w-full text-left"
                      >
                        Technology
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link href={'/posts/health'}>
                      <button
                        onClick={() => {
                          handleCategorySelect("health")
                        }

                        }
                        className="block px-4 py-2 text-gray-900 hover:bg-gray-100 w-full text-left"

                      >
                        Health
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link href={'/posts/finance'}>
                      <button
                        onClick={() => {
                          handleCategorySelect("finance")
                        }}
                        className="block px-4 py-2 text-gray-900 hover:bg-gray-100 w-full text-left"
                      >
                        Finance
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link href={'/posts/lifestyle'}>
                      <button
                        onClick={() => {
                          handleCategorySelect("lifestyle")
                        }}
                        className="block px-4 py-2 text-gray-900 hover:bg-gray-100 w-full text-left"
                      >
                        Lifestyle
                      </button>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                onClick={() => handleActive("contact")}
                className={`block py-2 px-3 md:p-0 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent hover:scale-110 transition-all ease-in hover:font-bold w-full md:w-fit ${active === "contact" ? "text-[#8d8080] scale-110 md:bg-white bg-[#d3cece] md:border-b-2 border-[#504a4a]" : ""}`}
              >
                Contact
              </button>
            </li>
            {user && (
              <li>
                {checkAdmin() ? (
                  <Link href='/admin' 
                  onClick={() => handleActive("/admin")}
                  className={`block py-2 px-3 md:p-0 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent hover:scale-110 transition-all ease-in hover:font-bold w-full md:w-fit ${active === "create-post" ? "text-[#8d8080] scale-110 md:bg-white bg-[#d3cece] md:border-b-2 border-[#504a4a]" : ""}`}>
                     
                    
                      Admin
                  
                  </Link>
                ) : checkEditor() ? (
                  <Link href='/editor'
                  onClick={() => handleActive("/editor")}
                      className={`block py-2 px-3 md:p-0 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent hover:scale-110 transition-all ease-in hover:font-bold w-full md:w-fit ${active === "create-post" ? "text-[#8d8080] scale-110 md:bg-white bg-[#d3cece] md:border-b-2 border-[#504a4a]" : ""}`}>
                 
                      
                    
                      Editor
                   
                  </Link>
                ): ""}
              </li>
            )}


            <li>

              <button
                onClick={() => {
                  handleActive("login")
                  if (isLoggedIn) {
                    logout()
                    router.push('/')
                  } else {
                    router.push('/login')
                  }
                }}
                className={`block py-2 px-3 md:p-0 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent hover:scale-110 transition-all ease-in hover:font-bold w-full md:w-fit ${active === "login" ? "text-[#8d8080] scale-110 md:bg-white bg-[#d3cece] md:border-b-2 border-[#504a4a]" : ""}`}
              >
                {isLoggedIn ? "Log Out" : "Login"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
