import React, { useState } from 'react';
import axios from 'axios';

function PostReply({ postId, refreshPage }) {
    const [text, setText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`/api/advice/${postId}/reply`, { text })
            .then(response => {
                alert('Reply posted successfully');
                setText('');
                refreshPage();
            })
            .catch(error => {
                console.error('There was an error posting the reply:', error);
                refreshPage();
                //alert('Error posting reply');
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="reply">Your Reply:</label>
                <textarea id="reply" value={text} onChange={e => setText(e.target.value)} required></textarea>
                <button type="submit">Post Reply</button>
            </form>
        </div>
    );
}

export default PostReply;