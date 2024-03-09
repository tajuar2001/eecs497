import React from 'react';
import './css/budgetingPage.css'; // Adjust the path as necessary

function BudgetingPage({ onBackClick }) {
  // Add content and structure for your budgeting page here
  return (
    <div>
      <h2>Budgeting Resources</h2>
      {/* Budgeting page contents go here */}
      <button onClick={onBackClick}>Back to Resources</button>
    </div>
  );
}

export default BudgetingPage;