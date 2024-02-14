// In src/components/LandingPage.js

import React from 'react';
import './css/landingpage.css'; // Assuming you have a separate CSS file for LandingPage styles

function LandingPage({ onNavigate }) {
  return (
    <div className="landing-page">
      <h1>Welcome to Our Website</h1>
      <div className="navigation-buttons">
        <button onClick={() => onNavigate('login')}>Login</button>
        <button onClick={() => onNavigate('register')}>Register</button>
      </div>
    </div>
  );
}

export default LandingPage;