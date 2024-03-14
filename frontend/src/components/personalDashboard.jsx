import React, { useState, useEffect } from 'react';
import HelpPage from './helpPage';

import './css/userProfile.css'; // Make sure to create a corresponding CSS file for styling
import './css/dashBoard.css';

function PersonalDashboardPage({ user }) {
    const [helpModalOpen, setHelpModalOpen] = useState(false);
    const toggleHelpMode = () => setHelpModalOpen(!helpModalOpen);

    // Format today's date
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="dashboard-container">
            <div className="user-info">
                <img src="user-profile-picture-url" alt="User" className="user-picture" /> {/* Replace src with actual image path */}
                <div className="user-details">
                    <h2 className="profile-name">Personal Dashboard</h2>
                    <p>Hello, {user.name}</p>
                    <p className="date">{today}</p>
                </div>
            </div>
            
            <button className="help-button" onClick={toggleHelpMode}>?</button>
            {helpModalOpen && <HelpPage onClose={toggleHelpMode} />}
        </div>
    );
}

export default PersonalDashboardPage;