// In src/components/UserProfile.js

import React from 'react';
import './css/userProfile.css'; // Make sure to create a corresponding CSS file for styling

function UserProfile({ user, onLogout }) {
    const handleLogout = async (e) => {
        e.preventDefault();
        //setError(''); // Reset error message
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Necessary for sessions/cookies handling
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to login');
            onLogout(data);
        } catch (error) {
            //setError(error.message);
        }
    };
    return (
        <React.Fragment>
        <div className="user-profile">
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
        <span className="profile-name">Hello, {user.name}</span>
        <p>INSERT TEXT HERE</p>
        <span className="profile-name">Personal Dashboard</span>
        <p>INSERT TEXT HERE</p>
        </React.Fragment>
    );
}

export default UserProfile;
