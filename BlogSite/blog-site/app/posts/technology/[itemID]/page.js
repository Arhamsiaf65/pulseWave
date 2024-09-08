"use client";
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

function PostPage() {
    const router = useRouter();
    const [post, setPost] = useState(null);
    const path = usePathname();
    const id = path.slice(18);

    const stripHtml = (html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
  };

    useEffect(() => {

        const fetchPost = async () => {
            try {
              const res = await fetch('/api/allposts');
              const data = await res.json();
              console.log(data);
              let newData = data.filter(item => item._id === id)
              console.log(newData[0]);
                setPost(newData[0])
                console.log("post", post);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [id, router.isReady]);

    if (!post) return <p>Loading...</p>;

    return (
       <>
        <div className='max-w-4xl mx-auto p-4'>
            <h1 className='text-4xl font-bold'>{post.title}</h1>
            <img src={post.image} alt="Post Thumbnail" className='w-full h-auto mt-4 rounded-lg' />
            <div
                    className='content-area'
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
        </div>
        <div>
            <h1>Others Like This</h1>

            
        </div>
       </>
    );
}

export default PostPage;
