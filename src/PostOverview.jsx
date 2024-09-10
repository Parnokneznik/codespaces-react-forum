import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const PostOverview = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const deletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  return (
    <div>
      <h2>Posts Overview</h2>
      <label>Sort by: </label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="date">Date</option>
        <option value="title">Title (A-Z)</option>
      </select>
      <ul>
        {sortedPosts.map(post => (
          <li key={post.id}>
            <div>
              <Link to={`/posts/${post.id}`}>
                <h3>{post.title}</h3>
              </Link>
              <p>{post.author}</p>
              <p>{new Date(post.date).toLocaleDateString()}</p>
            </div>
            <button onClick={() => deletePost(post.id)}>Delete Post</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostOverview;
