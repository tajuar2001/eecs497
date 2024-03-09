import React, { useState, useEffect } from 'react';
import HelpPage from './helpPage';

import './css/userProfile.css'; // Make sure to create a corresponding CSS file for styling


function PersonalDashboardPage({user}) {
    const [helpModalOpen, setHelpModalOpen] = useState(false);
    const toggleHelpMode = () => {
        setHelpModalOpen(!helpModalOpen);
    };

    return (
        <div className="profile-header">
            <span className="profile-name">Personal Dashboard</span>
            <p>Hello, {user.name}</p>

            <button className="help-button" onClick={toggleHelpMode}>?</button>
            {helpModalOpen && <HelpPage onClose={toggleHelpMode} />}
        </div>
    )
}

export default PersonalDashboardPage;