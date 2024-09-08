"use client"
import React, { useState } from 'react';
import './sign-up.css'; 
import Link from 'next/link';
import { useForm } from 'react-hook-form';

function SignupPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [apiError, setApiError] = useState('');

  const onSubmit = async data => {
    if (data.password !== data["confirm-password"]) {
      alert("Passwords do not match!");
      return;
    }

    const newData = {
      name: data.name,         // Add the name field
      email: data.email,
      password: data.password
    };

    try {
      const res = await fetch('/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      const result = await res.json();

      if (!res.ok) {
        // Set error message from API response
        setApiError(result.error || 'An unexpected error occurred');
      } else {
        // Handle successful user creation (e.g., redirect or show a success message)
        setApiError('');
        alert('Account created successfully');
        // Optionally redirect to login page or clear the form
      }
    } catch (error) {
      console.log("Error fetching post", error);
      setApiError('Failed to register user');
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {apiError && <p className="text-red-500 text-xs">{apiError}</p>}
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="confirm password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  {...register("confirm-password", { required: "Please confirm your password" })}
                />
                {errors["confirm-password"] && <p className="text-red-500 text-xs">{errors["confirm-password"].message}</p>}
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500">
                    I accept the{' '}
                    <a href="#" className="font-medium text-primary-600 hover:underline">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#D9D2CB] hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-primary-600 hover:underline">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupPage;
