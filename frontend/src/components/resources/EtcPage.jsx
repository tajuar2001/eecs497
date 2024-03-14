import React from 'react';
import './css/etcPage.css'; // Ensure the path is correct

function EtcPage({ onBackClick }) {
  return (
    <div className="etc-page-container">
      <h2>Etc Guide for whatever else we want</h2>
      {/* Your FoodPage content goes here */}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default EtcPage;

// rename this page to whatever else we want