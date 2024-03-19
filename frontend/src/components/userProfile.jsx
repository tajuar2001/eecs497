import './css/userProfile.css'; 
import AdvicePosts from './AdvicePosts';
import CommunityPage from './communityPage';
import ResourcesPage from './resourcesPage';
import React, { useState, useEffect } from 'react';
import PersonalDashboardPage from './personalDashboard';


function UserProfile({ user, onLogout, adviceNav, postCreateNav, onNavigate }) {
    const [activeTab, setActiveTab] = useState(null);
    const [showCreateAdvicePosts, setCreateAdvicePosts] = useState(false);
    
    useEffect(() => {
        // Store the current page and user in localStorage whenever they change
        setActiveTab(localStorage.getItem('activeTab'));
    }, []);

    

    const handleLogout = async (e) => {
        e.preventDefault();

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
        localStorage.setItem('activeTab', tab);
        setActiveTab(tab);
        setCreateAdvicePosts(false);

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
                    <button onClick={() => handleTabChange('community')} className={activeTab === 'community' ? 'active' : ''}>Community</button>
                    <button onClick={() => handleTabChange('resources')} className={activeTab === 'resources' ? 'active' : ''}>Resources</button>
                </div>
                <button onClick={handleLogout} className="logout-button">Logout</button>

            </div>
            
            <button onClick={() => handleTabChange("null")} className="home-button">
                        <img src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/home-button-icon.png" alt="Home" />
            </button>
        </div>


        <div className="profile-sections">
            <div className="section-content">
                {activeTab === 'advice' && <AdvicePosts user={user}/>}
                {activeTab === 'resources' && <ResourcesPage />}
                {activeTab === 'community' && <CommunityPage user={user}/>}
                {activeTab== "null" && <PersonalDashboardPage user={user}/>}
            </div>
        </div>

        
            


        </React.Fragment>
    );
}

export default UserProfile;
