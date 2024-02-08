// Welcome.jsx
import React from 'react';

function Welcome({ user, onLogout }) {
    return (
        <div>
            Welcome, {user.name}! <br />
            Logged in successfully.
            <button onClick={onLogout}>Logout</button>
        </div>
    );
}

export default Welcome;