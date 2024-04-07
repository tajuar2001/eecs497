import React, { useEffect, useRef, useState } from 'react';
import './css/parksPage.css';
import MapComponent from './MapComponent'
import { GOOGLE_MAPS_API_KEY } from './mapsAPI';

function ParksPage({ onBackClick }) {

  return (
    <div className="parks-page-container">
      <h2>Parks Guide</h2>
      <MapComponent query={"parks"}></MapComponent>
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default ParksPage;