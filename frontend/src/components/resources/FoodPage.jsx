import React from 'react';
import './css/foodPage.css';

function FoodPage({ onBackClick }) {
  return (
    <div className="food-page-container">
      <h2>Food Guide</h2>
      {/* content here */}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default FoodPage;
