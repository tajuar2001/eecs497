import React from 'react';
import './css/communityPage.css';

function CreateCommunityPost({ onClose }) {
  // Add your create post form elements and logic here

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
    // You can use axios or any other method to submit the form data to your backend
    // After successful submission, you can close the create post menu
    onClose();
  };

  return (
    <div className="create-post-menu">
      <h3>Create Community Post</h3>
      <form onSubmit={handleSubmit}>
        {/* Add your form fields here */}
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" />
        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content" rows="4" />
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateCommunityPost;
