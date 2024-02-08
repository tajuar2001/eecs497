import React from 'react';

function WelcomePage({ user, onLogout }) {
    return (
        <div>
            <p>Welcome, {user.name}! <br /> Logged in successfully.</p>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
}

export default WelcomePage;
