"use client";

import React, { useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import BulletList from '@tiptap/extension-bullet-list';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Heading from '@tiptap/extension-heading';
import { useDropzone } from 'react-dropzone';
import { Quicksand } from 'next/font/google';
import { useLogin } from '@/context/login';

const quicksand = Quicksand({ subsets: ['latin'] });

const PostCreation = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [category, setCategory] = useState('');
  const { isLoggedIn, login, logout , user} = useLogin();


  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Highlight,
      BulletList,
      Bold,
      Italic,
      Underline,
      Strike,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: `<h1>Exploring the Future of Technology</h1> 
    <p>The world of technology is evolving at an unprecedented pace. From artificial intelligence to quantum computing, new advancements are shaping our future in exciting ways. In this post, we will explore some of the most groundbreaking technologies that are poised to revolutionize our world.</p>`,
  });
  
  const checkAdmin = () => {
   if(user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL   && user.password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD){
      return true
    } 
    return false
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!editor) return;

    const content = editor.getHTML();
    const data = { title, content, image, category };

    if(user){
      if(checkAdmin()){
        try {
          const res = await fetch('/api/allposts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          if (!res.ok) {
            throw new Error('Failed to create post');
          }
    
          const result = await res.json();
          console.log('Post created successfully:', result);
    
          setSuccess(true);
          setTitle('');
          setImage(null);
          setCategory('');
          editor.commands.clearContent();
        } catch (error) {
          console.error('Error creating post:', error);
        }
      }
      else{
        alert('tu admin ni h')
      }
     
    }
    else{
      alert('na bachy admin ki id se login to kr le ')
    }
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Only set image for the dropzone preview
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: handleDrop,
  });

  const renderButton = (commandFn, isActive, label) => (
    <button
      type="button"
      onClick={() => commandFn().run()}
      className={`px-2 py-1 border rounded-lg ${isActive ? 'bg-[#8d8080] text-white' : 'bg-gray-200 text-gray-700'}`}
      title={label}
    >
      {label}
    </button>
  );
  
  

  return (
   <>
   {
    user && checkAdmin() ?  <div className={`p-4 pt-10 bg-white max-w-screen-md mx-auto md:mt-16 rounded-lg shadow-lg ${quicksand.className}`}>
    <h1 className="text-2xl font-semibold mb-4 text-gray-900">Create a New Post</h1>
    {success && <p className="text-green-600 mb-4">Your post has been created successfully!</p>}
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
        >
          <option value="">Select a category</option>
          <option value="technology">Technology</option>
          <option value="health">Health</option>
          <option value="finance">Finance</option>
          <option value="lifestyle">Lifestyle</option>
        </select>
      </div>
      <div className="mb-4">
        <div className="mb-2 flex flex-wrap gap-2 justify-center items-start space-x-2">
        {editor && (
<>
  {renderButton(() => editor.chain().focus().toggleBold(), editor.isActive('bold'), 'Bold')}
  {renderButton(() => editor.chain().focus().toggleItalic(), editor.isActive('italic'), 'Italic')}
  {renderButton(() => editor.chain().focus().toggleUnderline(), editor.isActive('underline'), 'Underline')}
  {renderButton(() => editor.chain().focus().toggleStrike(), editor.isActive('strike'), 'Strikethrough')}
  {renderButton(() => editor.chain().focus().toggleBulletList(), editor.isActive('bulletList'), 'Bullet Points')}
  {renderButton(() => editor.chain().focus().toggleHighlight(), editor.isActive('highlight'), 'Highlight')}
  {renderButton(() => editor.chain().focus().setColor('#ff0000'), editor.isActive({ color: '#ff0000' }), 'Red Text')}
  {renderButton(() => editor.chain().focus().toggleHeading({ level: 1 }), editor.isActive('heading', { level: 1 }), 'H1')}
  {renderButton(() => editor.chain().focus().toggleHeading({ level: 2 }), editor.isActive('heading', { level: 2 }), 'H2')}
  {renderButton(() => editor.chain().focus().toggleHeading({ level: 3 }), editor.isActive('heading', { level: 3 }), 'H3')}
</>
)}


        </div>
        <div className="border border-gray-300 rounded-lg p-2">
          <EditorContent placeholder="Content here" editor={editor} />
        </div>
      </div>
      <div {...getRootProps()} className="mb-4 border border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-100">
        <input {...getInputProps()} />
        {image ? (
          <img src={image} alt="Uploaded" className="max-w-full mx-auto" />
        ) : (
          <p className="text-gray-500">Drag and drop an image here, or click to select one</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-[#8d8080] hover:bg-[#7a6f6f] text-white font-bold py-2 px-4 rounded-lg transition-all ease-in"
      >
        Submit
      </button>
    </form>
  </div> : <div> This Page is for admin Only</div>
   }
   </>
  );
};

export default PostCreation;
