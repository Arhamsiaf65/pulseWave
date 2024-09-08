import React from 'react'
import { Quicksand } from 'next/font/google';
import PostCard from './postCard';
const quicksand = Quicksand({ subsets: ['latin'] });

function TrendingPost() {
    return (
        <>
        <div className='flex flex-col items-center  gap-5'>
            <h1 className= {`${quicksand.className} mt-5 text-3xl font-bold text-[#8D8080]`}>Trending Posts</h1>

            {/* Posts here */}
            <div>
                <PostCard />
            </div>
        </div>
        </>
    )
}

export default TrendingPost
