"use client"

import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if(session) {
    return <>
      <img src={session.user?.image} className="rounded" alt="" />
      Signed in as {session.user.email} <br/>
      <button className="bg-orange-600 text-black px-3 py-1 m-2 rounded"  onClick={() => signOut()}>Sign out</button>
    </>
  }
  return <>
    Not signed in <br/>
    <button className="bg-orange-600 text-black px-3 py-1 m-2 rounded" onClick={() => signIn()}>Sign in</button>
  </>
}