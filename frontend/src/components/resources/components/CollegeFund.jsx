import React from 'react';
import './css/collegeFund.css'; 

function CollegeFund({ onBackClick }) {
  return (
    <div className="college-fund-container">
      <h2>College Fund Guide</h2>
      {/* content here */}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default CollegeFund;
