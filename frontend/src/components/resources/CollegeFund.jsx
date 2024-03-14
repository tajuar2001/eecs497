import React from 'react';
import './css/collegeFund.css'; // Ensure the path is correct

function CollegeFund({ onBackClick }) {
  return (
    <div className="college-fund-container">
      <h2>College Fund Guide</h2>
      {/* Your FoodPage content goes here */}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default CollegeFund;
