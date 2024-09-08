"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

function Page() {
    const { data: session } = useSession()
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        email: '',
        username: '',
        profilePic: '',
        coverPic: '',
        stripeId: '',
        stripeKey: ''
    });

    useEffect(() => {
        if (session?.user) {
            router.push("/dashboard")
        }
    }, [session, router]);

    useEffect(() => {
        if (!session?.user) {
            router.push("/login")
        }
    }, [session, router]);

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    }


    return (
        <>
            <div className='flex flex-col gap-2  justify-center items-center text-sm text-gray-200'>
                <h2 className='text-3xl text-bold pt-5'>
                    Welcome to your Dashboard
                </h2>

                <form onSubmit={handleSubmit} className='mx-auto py-5'>
                    <div className='text-gray-900'>
                        <label htmlFor="name" className='text-gray-300 flex flex-col '>
                            Name
                            <input 
                                id='name' 
                                name='name' 
                                onChange={handleChange} 
                                type="text" 
                                value={form.name}
                                className='rounded-lg bg-slate-700 w-[370px] px-4 py-1' 
                            />
                        </label>
                        <label htmlFor="email" className='text-gray-300 flex flex-col '>
                            Email
                            <input 
                                id='email' 
                                name='email' 
                                onChange={handleChange} 
                                type="text" 
                                value={form.email}
                                className='rounded-lg bg-slate-700 w-[370px] px-4 py-1' 
                            />
                        </label>
                        <label htmlFor="username" className='text-gray-300 flex flex-col '>
                            Username
                            <input 
                                id='username' 
                                name='username' 
                                onChange={handleChange} 
                                type="text" 
                                value={form.username}
                                className='rounded-lg bg-slate-700 w-[370px] px-4 py-1' 
                            />
                        </label>
                        <label htmlFor="profilePic" className=' text-gray-300 flex flex-col '>
                            Profile Picture
                            <input 
                                id='profilePic' 
                                name='profilePic' 
                                onChange={handleChange} 
                                type="text" 
                                value={form.profilePic}
                                className='rounded-lg bg-slate-700 w-[370px] px-4 py-1' 
                            />
                        </label>
                        <label htmlFor="coverPic" className=' text-gray-300 flex flex-col '>
                            Cover Picture
                            <input 
                                id='coverPic' 
                                name='coverPic' 
                                onChange={handleChange} 
                                type="text" 
                                value={form.coverPic}
                                className='rounded-lg bg-slate-700 w-[370px] px-4 py-1' 
                            />
                        </label>
                        <label htmlFor="stripeId" className=' text-gray-300 flex flex-col '>
                            Stripe Id
                            <input 
                                id='stripeId' 
                                name='stripeId' 
                                onChange={handleChange} 
                                type="text" 
                                value={form.stripeId}
                                className='rounded-lg bg-slate-700 w-[370px] px-4 py-1' 
                            />
                        </label>
                        <label htmlFor="stripeKey" className=' text-gray-300 flex flex-col '>
                            Stripe Secret Key
                            <input 
                                id='stripeKey' 
                                name='stripeKey' 
                                onChange={handleChange} 
                                type="text" 
                                value={form.stripeKey}
                                className='rounded-lg bg-slate-700 w-[370px] px-4 py-1' 
                            />
                        </label>
                    </div>

                    <button 
                        type="submit" 
                        className="text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-40 my-5 text-center me-2 mb-2"
                    >
                        Save
                    </button>
                </form>
            </div>
        </>
    )
}

export default Page
