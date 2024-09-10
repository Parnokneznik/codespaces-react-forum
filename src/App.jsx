import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreatePost from './CreatePost';
import PostOverview from './PostOverview';
import PostDetail from './PostDetail';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <ul>
            <li><Link to="/">Create Post</Link></li>
            <li><Link to="/posts">Post Overview</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<CreatePost />} />
          <Route path="/posts" element={<PostOverview />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
