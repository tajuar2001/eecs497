import React from 'react';
import './css/landingpage.css'; // Assuming you have a separate CSS file for LandingPage styles

function resourcesPage({ onNavigate }) {
  return (
    <div className="resources-page">
      <h1>Resources</h1>
      <div className="navigation-buttons">
        <button onClick={() => onNavigate('login')}>Login</button>
        <button onClick={() => onNavigate('register')}>Register</button>
      </div>
    </div>
  );
}

export default resourcesPage;
