import React, { useState, useContext } from 'react';
import axios from 'axios';
import './css/advicePage.css';
// Import your AuthContext or similar here

function CreateAdvicePost({refreshPage}) {
    const [question, setQuestion] = useState('');
    // Use AuthContext to check if the user is logged in
    // const { isLoggedIn } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Check if user is logged in
        // if (!isLoggedIn) {
        //     alert('You must be logged in to post advice.');
        //     return;
        // }
        axios.post('/api/advice', { question })
            .then(response => {
                // Handle success
                alert('Advice posted successfully');
                setQuestion('');
                refreshPage();
            })
            .catch(error => {
                // Handle error
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
