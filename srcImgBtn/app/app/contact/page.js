import React from 'react'
import Script from 'next/script'

function Page() {
    return (
        <>
       <Script>
                {`
                    alert('Welcome to the contact page!');
                `}
            </Script>
        I am contact Page
        </>
    )
}

export default Page
