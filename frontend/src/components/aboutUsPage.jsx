import React from 'react';
import './css/landingpage.css'; // Assuming you have a separate CSS file for LandingPage styles

function aboutUsPage({ onNavigate }) {
  return (
    <div className="about-us-page">
      <h1>About Us</h1>
      <div className="navigation-buttons">
        <button onClick={() => onNavigate('login')}>Login</button>
        <button onClick={() => onNavigate('register')}>Register</button>
      </div>
    </div>
  );
}

export default aboutUsPage;
