import React from 'react';
import './css/shoppingPage.css'; 
import MapComponent from './MapComponent'

function ShoppingPage({ onBackClick }) {
  return (
    <div className="shopping-page-container">
      <h2>Shopping Guide</h2>
      <MapComponent query={"stores"}></MapComponent>
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default ShoppingPage;
