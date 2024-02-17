// In src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import './css/userProfile.css'; // Make sure to create a corresponding CSS file for styling

import AdvicePage from './advicePage';
import CommunityPage from './communityPage';
import ResourcesPage from './resourcesPage';

import HelpPage from './helpPage';
import CreateAdvicePost from './CreateAdvicePost';

function UserProfile({ user, onLogout, adviceNav, postCreateNav, onNavigate }) {
    const [activeTab, setActiveTab] = useState(null);
    const [helpModalOpen, setHelpModalOpen] = useState(false);
    const [showCreateAdvicePosts, setCreateAdvicePosts] = useState(false);
    
    useEffect(() => {
        // Store the current page and user in localStorage whenever they change
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

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
            handleTabChange(null);
            onLogout(data);
        } catch (error) {
            //setError(error.message);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab === activeTab ? null : tab);
        setCreateAdvicePosts(false);

    };

    const toggleHelpMode = () => {
        setHelpModalOpen(!helpModalOpen);
    };

    const toggleCreatePosts = () => {
        setCreateAdvicePosts(!showCreateAdvicePosts);
    }

    return (
        <React.Fragment>
        <div className="navigation-bar"> 
            <div className="navigation-buttons">
                <div className="user-greeting">Hi, {user.name}</div>
                <div className="navigation-center">
                    <button onClick={() => handleTabChange('advice')} className={activeTab === 'advice' ? 'active' : ''}>Advice</button>
                    <button onClick={() => handleTabChange('resources')} className={activeTab === 'resources' ? 'active' : ''}>Resources</button>
                    <button onClick={() => handleTabChange('community')} className={activeTab === 'community' ? 'active' : ''}>Community</button>
                </div>
                <button onClick={handleLogout} className="logout-button">Logout</button>

            </div>
            
            <button onClick={() => handleTabChange(null)} className="home-button">
                        <img src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/home-button-icon.png" alt="Home" />
            </button>
        </div>


        <div className="profile-sections">
            <div className="section-content">
                {activeTab === 'advice' && <AdvicePage/>}
                {activeTab === 'resources' && <ResourcesPage />}
                {activeTab === 'community' && <CommunityPage />}
            </div>
        </div>

        {activeTab== null && (
            <div className="profile-header">
                <span className="profile-name">Personal Dashboard</span>
                <p>INSERT TEXT HERE</p>

                <button className="help-button" onClick={toggleHelpMode}>?</button>
                {helpModalOpen && <HelpPage onClose={toggleHelpMode} />}
            </div>
        )}
            


        </React.Fragment>
    );
}

export default UserProfile;
