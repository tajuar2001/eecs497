import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/advicePage.css';



function AdvicePosts() {
    const [posts, setPosts] = useState([]);
    const getposts = () => {
        axios.get('/api/advice')
            .then(response => setPosts(response.data))
            .catch(error => console.error('There was an error fetching the advice posts:', error));
    };
    useEffect(() => {
        getposts();
    }, []);

    return (
        <div classname="advice-posts">
            {posts.map(post => (
                <div key={post.id} onClick={() => {/* navigate to post detail */}}>
                    <p>{post.question}</p>
                </div>
            ))}
        </div>
    );
}

export default AdvicePosts;
