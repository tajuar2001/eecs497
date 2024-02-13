// In src/components/UserProfile.js

import React, { useState } from 'react';
import './css/userProfile.css'; // Make sure to create a corresponding CSS file for styling

import AdvicePage from './advicePage';
import CommunityPage from './communityPage';
import ResourcesPage from './resourcesPage';

function UserProfile({ user, onLogout }) {
    const [activeTab, setActiveTab] = useState(null);

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

    const handleTabChange = (tab) => {
        setActiveTab(tab === activeTab ? null : tab);
    };

    return (
        <React.Fragment>
        <div className="user-profile">
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>

        <div className="profile-header">
                <span className="profile-name">Hello, {user.name}</span>
                <p>INSERT TEXT HERE</p>

                <span className="profile-name">Personal Dashboard</span>
        <p>INSERT TEXT HERE</p>
        </div>

        <div className="profile-sections">
            <div className="section-buttons">
                <button onClick={() => handleTabChange('advice')} className={activeTab === 'advice' ? 'active' : ''}>Advice</button>
                <button onClick={() => handleTabChange('resources')} className={activeTab === 'resources' ? 'active' : ''}>Resources</button>
                <button onClick={() => handleTabChange('community')} className={activeTab === 'community' ? 'active' : ''}>Community</button>
            </div>
            <div className="section-content">
                {activeTab === 'advice' && <AdvicePage />}
                {activeTab === 'resources' && <ResourcesPage />}
                {activeTab === 'community' && <CommunityPage />}
            </div>
        </div>
        
        </React.Fragment>
    );
}

export default UserProfile;
