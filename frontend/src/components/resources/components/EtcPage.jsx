import React from 'react';
import './css/etcPage.css'; 

function EtcPage({ onBackClick }) {
  return (
    <div className="etc-page-container">
      <h2>Etc Guide for whatever else we want</h2>
      {/* content here */}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default EtcPage;

// rename this page to whatever else we want