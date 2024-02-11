// In src/components/LandingPage.js

import React from 'react';

function LandingPage({ onNavigate }) {
  return (
    <div className="landing-page">
      <h1>Welcome to Our Website</h1>
      <button onClick={() => onNavigate('login')}>Login</button>
      <button onClick={() => onNavigate('register')}>Register</button>
    </div>
  );
}

export default LandingPage;
