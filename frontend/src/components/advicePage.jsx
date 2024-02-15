import React, { useState, useEffect } from 'react';
import './css/advicePage.css'; // Assuming you have a separate CSS file for AdvicePage styles
import axios from 'axios';

function AdvicePage({ navAdvicePosts, navCreatePosts }) {
  const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/advice')
            .then(response => setPosts(response.data))
            .catch(error => console.error('There was an error fetching the advice posts:', error));
    }, []);
  return (
    <div className="advice-page">
      <h1>Welcome to New Parents' Advice Corner</h1>
      <div classname="advice-posts">
            {posts.map(post => (
                <div key={post.id} onClick={() => {/* navigate to post detail */}}>
                    <p>{post.question}</p>
                </div>
            ))}
        </div>
      <button onClick={navCreatePosts}>Create Advice Post</button>
      {/* Consider adding more sections with advice on different topics relevant to new parents */}
    </div>
  );
}

export default AdvicePage;
