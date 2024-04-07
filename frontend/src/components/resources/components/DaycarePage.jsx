import React from 'react';
import './css/daycarePage.css';
import MapComponent from './MapComponent'

function DaycarePage({ onBackClick }) {
  return (
    <div className="daycare-page-container">
      <h2>Daycare Guide</h2>
      <MapComponent query={"daycares"}></MapComponent>
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default DaycarePage;
