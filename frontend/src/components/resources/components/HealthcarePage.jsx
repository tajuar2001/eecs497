import React from 'react';
import './css/healthcarePage.css'; 

function HealthcarePage({ onBackClick }) {
  return (
    <div className="healthcare-page-container">
      <h2>Healthcare Guide</h2>
      {/* content here */}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default HealthcarePage;
