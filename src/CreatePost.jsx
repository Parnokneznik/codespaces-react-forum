import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const CreatePost = () => {
  const [newPostData, setNewPostData] = useState({ author: '', title: '', content: '' });
  const navigate = useNavigate();

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      author: newPostData.author,
      title: newPostData.title,
      content: newPostData.content,
      date: new Date(),
      comments: [],
    };

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    localStorage.setItem('posts', JSON.stringify([...posts, newPost]));
    setNewPostData({ author: '', title: '', content: '' });
    navigate('/posts'); // Přejde na stránku s přehledem příspěvků
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={addNewPost}>
        <input
          type="text"
          placeholder="Author"
          value={newPostData.author}
          onChange={(e) => setNewPostData({ ...newPostData, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Title"
          value={newPostData.title}
          onChange={(e) => setNewPostData({ ...newPostData, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newPostData.content}
          onChange={(e) => setNewPostData({ ...newPostData, content: e.target.value })}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
