// AdvicePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostReply from './PostReply'; // Make sure this path matches your file structure
import './css/advicePage.css'; // Assuming you have a separate CSS file for AdvicePage styles
import CreateAdvicePost from './CreateAdvicePost';
import AdvicePosts from './AdvicePosts';

function AdvicePage() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios.get('/api/advice')
        .then(response => setPosts(response.data))
        .catch(error => console.error('There was an error fetching the advice posts:', error));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="advice-page">
      <h1>Welcome to New Parents' Advice Corner</h1>
      <AdvicePosts></AdvicePosts>
    </div>
  );
}

export default AdvicePage;
