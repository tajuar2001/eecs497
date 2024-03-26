import React, { useState, useContext } from 'react';
import axios from 'axios';
import './advicePosts.css';

function CreateAdvicePost({refreshPage}) {
    const [question, setQuestion] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/advice', { question })
            .then(response => {
                // Handle success
                alert('Advice posted successfully');
                setQuestion('');
                refreshPage();
            })
            .catch(error => {
                console.error('There was an error posting the advice:', error);
                alert('Error posting advice');
            });
    };

    return (
        <div classname="adviceForm">
        <form onSubmit={handleSubmit}>
            <label htmlFor="question">Your Question:</label>
            <textarea id="question" value={question} onChange={e => setQuestion(e.target.value)} required></textarea>
            <button type="submit">Post Question</button>
        </form>
        </div>
    );
}

export default CreateAdvicePost;
