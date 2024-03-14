import React from 'react';
import './css/educationPage.css'; 

function EducationPage({ onBackClick }) {
  return (
    <div className="education-page-container">
      <h2>Education Resources</h2>
      {/* content here */}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default EducationPage;
