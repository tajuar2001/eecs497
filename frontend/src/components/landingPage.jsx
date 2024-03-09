import React from 'react';
import './css/landingpage.css'; // Ensure this path is correct
import newLeafCommunityImage from '/home/tajuarb/Coding/newLeaf/frontend/src/components/images/newLeafCommunity.png'; // Adjust the path as necessary

function LandingPage({ onNavigate }) {
  return (
    <div className="landing-page">
      <div className="title-box">
        <h1>Welcome to newLeaf</h1>
      </div>
      {/* Image added here, right after the title */}
      <img src={newLeafCommunityImage} alt="Community Support" className="community-image"/>
      <p className="intro-text">
        Discover a supportive community, get expert advice, and access resources tailored for new parents.
        Join newLeaf today to make your parenting journey easier and more enjoyable.
      </p>
      <div className="navigation-buttons">
        <button onClick={() => onNavigate('login')}>Login</button>
        <button onClick={() => onNavigate('register')}>Register</button>
      </div>
    </div>
  );
}

export default LandingPage;
