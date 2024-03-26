import React from 'react';
import './css/parksPage.css'; 

function ParksPage({ onBackClick }) {
  return (
    <div className="parks-page-container">
      <h2>Parks Guide</h2>
      {/* content here */}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default ParksPage;
