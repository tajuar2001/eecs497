import React from 'react';
import './css/foodPage.css'; // Ensure the path is correct

function FoodPage({ onBackClick }) {
  return (
    <div className="food-page-container">
      <h2>Food Guide</h2>
      {/* Your FoodPage content goes here */}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default FoodPage;
