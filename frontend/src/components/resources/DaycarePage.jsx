import React from 'react';
import './css/daycarePage.css'; // Ensure the path is correct

function DaycarePage({ onBackClick }) {
  return (
    <div className="daycare-page-container">
      <h2>Daycare Guide</h2>
      {/* Your FoodPage content goes here */}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default DaycarePage;
