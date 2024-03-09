import React from 'react';
import './css/educationPage.css'; // Ensure the path is correct

function EducationPage({ onBackClick }) {
  return (
    <div className="education-page-container">
      <h2>Education Resources</h2>
      {/* Your EducationPage content goes here */}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default EducationPage;
