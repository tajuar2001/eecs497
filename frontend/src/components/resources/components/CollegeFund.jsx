import React, { useState, useEffect } from 'react';
import './css/collegeFund.css';

function CollegeFund({ onBackClick }) {
  const [kidList, setKidList] = useState([]);

  useEffect(() => {
    fetch('/api/kids')
      .then(response => response.json())
      .then(data => setKidList(data));
  }, []);

  const calculateAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const calculateAnnualSavings = (age) => {
    const targetAmount = 146000;
    const yearsToSave = 18 - age;
    return Math.round(targetAmount / yearsToSave);
  };

  return (
    <div className="college-fund-container">
      <h1>College Fund Guide</h1>
      <div className="kid-grid">
        {kidList.map(kid => (
          <div key={kid.id} className="kid-card">
            <div className="kid-frame">
              <div className="kid-name-rectangle">
                <h3>{kid.name}</h3>
              </div>
              <p><strong>Age:</strong> {calculateAge(kid.birthday)}</p>
              <p><strong>Annual Savings Needed:</strong> ${calculateAnnualSavings(calculateAge(kid.birthday))}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="resources">
        <div className="resource-card">
          <h2>Resources for 529c Accounts</h2>
          <ul>
            <li><a href="https://www.savingforcollege.com/" target="_blank" rel="noopener noreferrer">Saving for College</a></li>
            <li><a href="https://www.collegesavings.org/" target="_blank" rel="noopener noreferrer">College Savings Plans Network</a></li>
          </ul>
        </div>
        <div className="resource-card">
          <h2>Scholarship Resources</h2>
          <ul>
            <li><a href="https://www.fastweb.com/" target="_blank" rel="noopener noreferrer">Fastweb</a></li>
            <li><a href="https://www.scholarships.com/" target="_blank" rel="noopener noreferrer">Scholarships.com</a></li>
            <li><a href="https://www.cappex.com/" target="_blank" rel="noopener noreferrer">Cappex</a></li>
          </ul>
        </div>
      </div>
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default CollegeFund;