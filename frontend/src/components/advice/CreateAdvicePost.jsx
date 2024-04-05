import React, { useState } from 'react';
import axios from 'axios';

function CreateAdvicePost({ categories, refreshPage }) {
  const [question, setQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/advice', { question, category_id: selectedCategory });
      setQuestion('');
      setSelectedCategory('');
      refreshPage();
    } catch (error) {
      console.error('There was an error creating the advice post:', error);
    }
  };

  return (
    <div>
      <h3>Create Advice Post</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Type your question here..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
          required
        />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateAdvicePost;