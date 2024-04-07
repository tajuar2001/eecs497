import React, { useEffect, useRef, useState } from 'react';
import './css/foodPage.css';
import MapComponent from './MapComponent'
import { GOOGLE_MAPS_API_KEY } from './mapsAPI';

function FoodPage({ onBackClick }) {

  return (
    <div className="food-page-container">
      <h2>Food Guide</h2>
      <MapComponent query={"grocery stores and restaurants"}></MapComponent>
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default FoodPage;
