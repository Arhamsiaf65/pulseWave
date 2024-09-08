import React from 'react'
import Link from 'next/link'

function NavBar() {
    return (
        <div className='w-full bg-gray-700 text-white py-3 px-10 flex gap-5'>
            <Link href={"/"}>Home</Link>
            <Link href={"/about"}>About</Link>
            <Link href={"/contact"}>Contact</Link>

        </div>
    )
}

export default NavBar
