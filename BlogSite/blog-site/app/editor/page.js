"use client"
import React from 'react'
import AdminHeroSection from '@/components/admin-heroSection'
import { useLogin } from '@/context/login';


function Page() {
  const { isLoggedIn, login, logout , user} = useLogin();
  const checkEditor = () => {
    if (user.role === 'Editor') {
      return true
    }
    return false
  }

    return (
        <>
       {(user && checkEditor() )? <AdminHeroSection /> : "Login as an Editor to access the Editor Page" }
        </>
    )
}

export default Page
