import React from 'react';
import './css/budgetingPage.css'; // Adjust the path as necessary

function BudgetingPage({ onNavigateBack }) {
  return (
    <div className="budgeting-page-container">
      <h2>Budgeting Resources</h2>
      {/* Content for your budgeting page goes here */}
      <button onClick={onNavigateBack}>Back to Resources</button>
    </div>
  );
}

export default BudgetingPage;
