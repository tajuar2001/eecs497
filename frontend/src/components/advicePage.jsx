import React, { useState, useEffect } from 'react';
import './css/advicePage.css'; // Assuming you have a separate CSS file for AdvicePage styles
import axios from 'axios';
import CreateAdvicePost from './CreateAdvicePost';

function AdvicePage() {
  const [posts, setPosts] = useState([]);
  const [createPosts, setCreatePosts] = useState(false);

  const toggleCreatePosts = () => {
    setCreatePosts(!createPosts);
}

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
      <button onClick={toggleCreatePosts}>Create Advice Post</button>
      {createPosts && <CreateAdvicePost></CreateAdvicePost>}
      {/* Consider adding more sections with advice on different topics relevant to new parents */}
    </div>
  );
}

export default AdvicePage;
