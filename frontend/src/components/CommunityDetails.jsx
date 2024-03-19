import React, { useState, useEffect } from 'react';

function CommunityDetails({ user, community, onBack,}) {
  const [communityPosts, setCommunityPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    fetchCommunityPosts();
  }, [community]);

  const fetchCommunityPosts = async () => {
    try {
      const response = await fetch(`/api/communities/${community.id}/posts`);
      const data = await response.json();
      setCommunityPosts(data);
    } catch (error) {
      console.error('Error fetching community posts:', error);
    }
  };

  const handleCreatePost = async () => {
    try {
      const response = await fetch(`/api/communities/${community.id}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newPostTitle, content: newPostContent }),
      });
      const data = await response.json();
      setNewPostTitle('');
      setNewPostContent('');
      fetchCommunityPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleReplyToPost = async (postId) => {
    try {
      await fetch(`/api/communities/${community.id}/posts/${postId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: replyContent }),
      });
      setReplyContent('');
      setSelectedPostId(null);
      fetchCommunityPosts();
    } catch (error) {
      console.error('Error replying to post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await fetch(`/api/communities/${community.id}/posts/${postId}`, {
        method: 'DELETE',
      });
      fetchCommunityPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleDeleteReply = async (postId, replyId) => {
    try {
      await fetch(`/api/communities/${community.id}/posts/${postId}/replies/${replyId}`, {
        method: 'DELETE',
      });
      fetchCommunityPosts();
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };


  return (
    <div className="community-details">
      <button onClick={onBack}>Back</button>
      <h2>{community.name}</h2>
      <div className="create-post">
        <h3>Create Post</h3>
        <input
          type="text"
          placeholder="Title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        ></textarea>
        <button onClick={handleCreatePost}>Create</button>
      </div>
      <div className="community-posts">
        {communityPosts.map((post) => (
          <div key={post.id} className="post">
            <h4>{post.title}</h4>
            <p>
              <span className="post-author">{post.author}</span>: {post.content}
            </p>
            {post.user_id === user.id && (
          <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
        )}
            <button onClick={() => setSelectedPostId(post.id)}>Reply</button>
            {selectedPostId === post.id && (
              <div className="reply-input">
                <textarea
                  placeholder="Write your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                ></textarea>
                <button onClick={() => handleReplyToPost(post.id)}>Submit Reply</button>
              </div>
            )}
            <div className="post-replies">
              {post.replies &&
                post.replies.map((reply) => (
                  <div key={reply.id} className="reply">
                    <p>
                      <span className="reply-author">{reply.author}</span>: {reply.content}
                    </p>
                      {reply.user_id === user.id && (
                        <button onClick={() => handleDeleteReply(post.id, reply.id)}>Delete Reply</button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityDetails;