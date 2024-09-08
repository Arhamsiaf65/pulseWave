"use client"
import React from 'react'
import { useState } from 'react'
function NavBar() {

    const [count, setCount] = useState(0)


    return (
        <>
        <div>
           I am navBar  {count}
           <button className='p-3' onClick={() => {
            setCount(count + 1) 
           }}>+</button>
          
        </div>
        </>
    )
}

export default NavBar
