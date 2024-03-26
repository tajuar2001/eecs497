import React from 'react';
import './css/shoppingPage.css'; 

function ShoppingPage({ onBackClick }) {
  return (
    <div className="shopping-page-container">
      <h2>Shopping Guide</h2>
      {/* content here */}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default ShoppingPage;
