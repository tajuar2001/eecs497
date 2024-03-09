import React from 'react';
import './css/livingExpense.css'; // Ensure the path is correct and renamed accordingly

function LivingExpense({ onBackClick }) {
  return (
    <div className="living-expense-page-container">
      <h2>Living Expenses Guide</h2>
      {/* Your LivingExpense content goes here */}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default LivingExpense;
