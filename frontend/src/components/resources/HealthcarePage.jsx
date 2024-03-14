import React from 'react';
import './css/healthcarePage.css'; // Ensure the path is correct

function HealthcarePage({ onBackClick }) {
  return (
    <div className="healthcare-page-container">
      <h2>Healthcare Guide</h2>
      {/* Your FoodPage content goes here */}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default HealthcarePage;
