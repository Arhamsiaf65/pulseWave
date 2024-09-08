import Post from "@/models/post";
import DataBaseConnect from "@/db/dataBaseConnect";
import { NextResponse } from 'next/server';

await DataBaseConnect("blogsite");

export async function GET(req) {
  try {
    const posts = await Post.find({});
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function PUT(req){
  try {
    const {id, method} = await req.json();

    if (!id ) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if(method === "like"){
    post.likes += 1;
    }
    else if(method === "unlike"){
    post.likes -= 1;
    }


    const updatedPost = await post.save();
    return NextResponse.json(updatedPost.likes, { status: 200 });
  } catch (error) {
    console.error('Error updating likes:', error);
    return NextResponse.json({ error: 'Failed to update likes' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { title, content, image, category } = await req.json();

    // Input validation could be added here
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const newPost = new Post({
      title,
      content,
      image,
      category,
      likes: 0   
    });

    const savedPost = await newPost.save();

    return NextResponse.json(savedPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    // Extract the post ID from the request URL
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('id');

    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    // Delete the post with the specified ID
    const result = await Post.findByIdAndDelete(postId);

    if (!result) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}

export function OPTIONS(req) {
  return NextResponse.json(null, {
    status: 204,
    headers: {
      Allow: 'GET, POST, DELETE, OPTIONS',
    },
  });
}

export function onError(error) {
  console.error('Error handling request:', error);
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
