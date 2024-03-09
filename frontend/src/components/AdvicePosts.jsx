import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/advicePage.css'; // Assuming you have a separate CSS file for AdvicePage styles
import CreateAdvicePost from './CreateAdvicePost';
import './css/advicePage.css';
import PostReply from './PostReply'; // Make sure this path matches your file structure



function AdvicePosts() {
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
        <div className="advice-posts">
        {posts.map((post) => (
          <div key={post.id} className="advice-post">
            <p><strong>Question by {post.author}: </strong>{post.question}</p>
            {post.replies && post.replies.map(reply => (
              <div key={reply.id} className="reply">
                <p><strong>Reply by {reply.author}: </strong>{reply.text}</p>
              </div>
            ))}
            <PostReply postId={post.id} refreshPage={fetchPosts} />
          </div>
        ))}
        <CreateAdvicePost refreshPage={fetchPosts}></CreateAdvicePost>
      </div>
    );
}

export default AdvicePosts;
