import React from 'react';
import './css/parksPage.css'; // Ensure the path is correct

function ParksPage({ onBackClick }) {
  return (
    <div className="parks-page-container">
      <h2>Parks Guide</h2>
      {/* Your FoodPage content goes here */}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default ParksPage;
