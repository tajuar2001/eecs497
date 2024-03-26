import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/advicePosts.css';
import CreateAdvicePost from './CreateAdvicePost';
import './css/advicePosts.css';
import PostReply from './PostReply';

function AdvicePosts({ user }) {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPosts = () => {
    axios
      .get('/api/advice')
      .then(response => setPosts(response.data))
      .catch(error => console.error('There was an error fetching the advice posts:', error));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = postId => {
    axios
      .delete(`/api/advice/${postId}`)
      .then(() => {
        alert('Deleted post!');
        fetchPosts(); // Refresh the posts after deleting
      })
      .catch(error => console.error('There was an error deleting the advice post:', error));
  };

  const handleDeleteReply = (postId, replyId) => {
    axios
      .delete(`/api/advice/${postId}/reply/${replyId}`)
      .then(() => {
        alert('Deleted reply!');
        fetchPosts(); // Refresh the posts after deleting
      })
      .catch(error => console.error('There was an error deleting the reply:', error));
  };


  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      fetchPosts();
    } else {
      const filteredPosts = posts.filter(post => {
        const postContent = post.question.toLowerCase();
        const repliesContent = post.replies.map(reply => reply.text.toLowerCase()).join(' ');
        const searchTerm = searchQuery.toLowerCase();
        return postContent.includes(searchTerm) || repliesContent.includes(searchTerm);
      });
      setPosts(filteredPosts);
    }
  };

  return (
    <div className="advice-posts">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {posts.length === 0 && searchQuery.trim() !== '' ? (
        <p>No relevant results found.</p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="advice-post">
            <div className="post-content">
              <div className="post-author">
                {post.author_image_url && (
                  <img src={post.author_image_url} alt="Author Profile" className="profile-picture" />
                )}
                <strong>Question by {post.author}: </strong>
              </div>
              <p>{post.question}</p>
              {user.name === post.author && (
                <button className="delete-btn" onClick={() => handleDeletePost(post.id)}>
                  Delete
                </button>
              )}
            </div>
            <div className="replies-container">
              {post.replies &&
                post.replies.map(reply => (
                  <div key={reply.id} className="reply">
                    <div className="reply-author">
                      {reply.author_image_url && (
                        <img src={reply.author_image_url} alt="Author Profile" className="profile-picture" />
                      )}
                      <strong>Reply by {reply.author}: </strong>
                    </div>
                    <p>{reply.text}</p>
                    {user.name === reply.author && (
                      <button className="delete-btn" onClick={() => handleDeleteReply(post.id, reply.id)}>
                        Delete
                      </button>
                    )}
                  </div>
                ))}
              <PostReply postId={post.id} refreshPage={fetchPosts} />
            </div>
          </div>
        ))
      )}
      <CreateAdvicePost refreshPage={fetchPosts} />
    </div>
  );
}

export default AdvicePosts;