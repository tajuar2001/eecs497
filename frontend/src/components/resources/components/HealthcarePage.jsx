import React from 'react';
import './css/healthcarePage.css';

function HealthcareGuide({ onBackClick }) {
  return (
    <div className="healthcare-guide-container">
      <h2>Healthcare Guide for New Parents</h2>
      <div className="healthcare-cards">
        <div className="card">
          <h3>Health Insurance Plans</h3>
          <p>Compare and choose the best health insurance plan for your family.</p>
          <a href="https://finder.healthcare.gov/">Learn More</a>
        </div>
        <div className="card">
          <h3>Understand Deductibles</h3>
          <p>Learn how deductibles work and how to manage them effectively.</p>
          <a href="https://www.healthcare.gov/glossary/deductible/">Learn More</a>
        </div>
        <div className="card">
          <h3>Baby Checkups</h3>
          <p>Stay on top of your baby's health with regular checkups and vaccinations.</p>
          <a href="https://www.mottchildren.org/conditions-treatments/general-peds/well-child-visits">Learn More</a>
        </div>
      </div>
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default HealthcareGuide;