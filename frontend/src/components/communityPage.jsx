import React from 'react';
import './landingpage.css'; // Assuming you have a separate CSS file for LandingPage styles

function communityPage({ onNavigate }) {
  return (
    <div className="community-page">
      <h1>Community</h1>
      <div className="navigation-buttons">
        <button onClick={() => onNavigate('login')}>Login</button>
        <button onClick={() => onNavigate('register')}>Register</button>
      </div>
    </div>
  );
}

export default communityPage;
