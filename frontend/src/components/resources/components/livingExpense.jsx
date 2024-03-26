import React from 'react';
import './css/livingExpense.css'; 

function LivingExpense({ onBackClick }) {
  return (
    <div className="living-expense-page-container">
      <h2>Living Expenses Guide</h2>
      {/* content here */}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default LivingExpense;
