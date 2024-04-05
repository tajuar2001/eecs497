import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './advicePosts.css';
import CreateAdvicePost from './CreateAdvicePost';
import PostReply from './PostReply';

function AdvicePosts({ user }) {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchPosts = () => {
    axios
      .get('/api/advice')
      .then(response => setPosts(response.data))
      .catch(error => console.error('There was an error fetching the advice posts:', error));
  };

  const fetchCategories = () => {
    axios
      .get('/api/advice/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('There was an error fetching the categories:', error));
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
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

  const handleDeleteComment = (postId, commentId) => {
    axios
      .delete(`/api/advice/${postId}/comment/${commentId}`)
      .then(() => {
        alert('Deleted comment!');
        fetchPosts(); // Refresh the posts after deleting
      })
      .catch(error => console.error('There was an error deleting the comment:', error));
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      fetchPosts();
    } else {
      const filteredPosts = posts.filter(post => {
        const postContent = post.question.toLowerCase();
        const commentsContent = post.comments.map(comment => comment.content.toLowerCase()).join(' ');
        const searchTerm = searchQuery.toLowerCase();
        return postContent.includes(searchTerm) || commentsContent.includes(searchTerm);
      });
      setPosts(filteredPosts);
    }
  };

  const handleUpvote = (postId, commentId) => {
    if (commentId) {
      axios
        .post(`/api/advice/${postId}/comment/${commentId}/upvote`)
        .then(() => fetchPosts())
        .catch(error => console.error('There was an error upvoting the comment:', error));
    } else {
      axios
        .post(`/api/advice/${postId}/upvote`)
        .then(() => fetchPosts())
        .catch(error => console.error('There was an error upvoting the post:', error));
    }
  };

  const handleDownvote = (postId, commentId) => {
    if (commentId) {
      axios
        .post(`/api/advice/${postId}/comment/${commentId}/downvote`)
        .then(() => fetchPosts())
        .catch(error => console.error('There was an error downvoting the comment:', error));
    } else {
      axios
        .post(`/api/advice/${postId}/downvote`)
        .then(() => fetchPosts())
        .catch(error => console.error('There was an error downvoting the post:', error));
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
      <h2>Advice</h2>
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
              <div className="post-meta">
                <span>Category: {categories.find(cat => cat.id === post.category_id)?.name}</span>
                <div className="post-actions">
                  <button onClick={() => handleUpvote(post.id)}>Upvote ({post.upvotes})</button>
                  <button onClick={() => handleDownvote(post.id)}>Downvote ({post.downvotes})</button>
                  {user.name === post.author && (
                    <button className="delete-btn" onClick={() => handleDeletePost(post.id)}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="comments-container">
              {post.comments &&
                post.comments.map(comment => (
                  <div key={comment.id} className="comment">
                    <div className="comment-author">
                      {comment.author_image_url && (
                        <img src={comment.author_image_url} alt="Author Profile" className="profile-picture" />
                      )}
                      <strong>Comment by {comment.author}: </strong>
                    </div>
                    <p>{comment.content}</p>
                    <div className="comment-actions">
                      <button onClick={() => handleUpvote(post.id, comment.id)}>Upvote ({comment.upvotes})</button>
                      <button onClick={() => handleDownvote(post.id, comment.id)}>Downvote ({comment.downvotes})</button>
                      {user.name === comment.author && (
                        <button className="delete-btn" onClick={() => handleDeleteComment(post.id, comment.id)}>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              <PostReply postId={post.id} refreshPage={fetchPosts} />
            </div>
          </div>
        ))
      )}
      <CreateAdvicePost categories={categories} refreshPage={fetchPosts} />
    </div>
  );
}

export default AdvicePosts;