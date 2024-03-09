import React from 'react';
import './css/budgetingPage.css'; // Ensure the path is correct

function BudgetingPage({ onBackClick }) {
  return (
    <div className="budgeting-page-container">
      <h2>Budgeting Resources</h2>
      {/* Your BudgetingPage content goes here */}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default BudgetingPage;