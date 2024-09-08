"use client";
import React, { useState } from 'react';
import './login.css';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useLogin } from '@/context/login';
import { useRouter } from 'next/navigation';

function Page() {
  const { isLoggedIn, login, logout, user } = useLogin();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [apiError, setApiError] = useState(''); 
  const router = useRouter()

  const onSubmit = async data => {
    const credentials = {
      email: data.email,
      password: data.password
    };

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (res.ok && result.user) {
        login(result.user); // Assuming login function handles storing the token/user
        router.push('/');
      } else {
        setApiError(result.error || 'An unexpected error occurred');
      }
    } catch (error) {
      console.log("Error during login:", error);
      setApiError('Failed to login');
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
          className={`w-full bg-transpatent rounded-lg shadow-inner dark:border md:mt-0 sm:max-w-md xl:p-0 text-black customShadow `}
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            {apiError && (
              <div className="text-red-500 mb-4">{apiError}</div> // Display error message
            )}
            <form 
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
              action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  {...register('email', { required: true })}
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                />
                {errors.email && <span className="text-red-500">This field is required</span>}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  {...register('password', { required: true })}
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {errors.password && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#E7DFD8]"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-600 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <Link
                  href="/sign-up"
                  className="font-medium text-gray-600 hover:underline"
                >
                  Sign up
                </Link>
                <Link
                  className="font-medium text-gray-600 hover:underline"
                  href='https://wa.me/923091849279'
                >
                  WhatSapp
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
