"use client"
import React from 'react'
import AdminHeroSection from '@/components/admin-heroSection'
import { useLogin } from '@/context/login';


function Page() {
  const { isLoggedIn, login, logout , user} = useLogin();
  const checkAdmin = () => {
    if(user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL   && user.password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD){
      return true
    }
    return false
  }

    return (
        <>
       {(user && checkAdmin() )? <AdminHeroSection /> : "Login as an Admin to access the Admin Page" }
        </>
    )
}

export default Page
