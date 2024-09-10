import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const foundPost = posts.find(post => post.id === Number(id));
    setPost(foundPost);
  }, [id]);

  const addComment = (e) => {
    e.preventDefault();
    const updatedPosts = JSON.parse(localStorage.getItem('posts')).map(p => {
      if (p.id === post.id) {
        return {
          ...p,
          comments: [...p.comments, { id: Date.now(), text: newComment, date: new Date() }]
        };
      }
      return p;
    });
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPost({ ...post, comments: [...post.comments, { id: Date.now(), text: newComment, date: new Date() }] });
    setNewComment('');
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={() => navigate('/posts')}>Back to Overview</button>
      <h2>{post.title}</h2>
      <p>{post.author}</p>
      <p>{post.content}</p>
      <h3>Comments</h3>
      <ul>
        {post.comments.map(comment => (
          <li key={comment.id}>
            {comment.text} - {new Date(comment.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
      <form onSubmit={addComment}>
        <input
          type="text"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default PostDetail;
