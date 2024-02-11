// In src/components/UserProfile.js

import React from 'react';
import './css/userProfile.css'; // Make sure to create a corresponding CSS file for styling

function UserProfile({ user, onLogout }) {
    return (
        <div className="user-profile">
            <span className="profile-name">Welcome, {user.name}</span>
            <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
    );
}

export default UserProfile;
