import React from 'react';
import './css/daycarePage.css'; 

function DaycarePage({ onBackClick }) {
  return (
    <div className="daycare-page-container">
      <h2>Daycare Guide</h2>
      {/* content here */}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default DaycarePage;
