import React from 'react';
import './css/budgetingPage.css'; 

function BudgetingPage({ onBackClick }) {
  return (
    <div className="budgeting-page-container">
      <h2>Budgeting Resources</h2>
      {/* content here */}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default BudgetingPage;