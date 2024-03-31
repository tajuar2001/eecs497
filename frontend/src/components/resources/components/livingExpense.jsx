import React, { useState, useEffect } from 'react';
import './css/livingExpense.css';

function LivingExpense({ onBackClick }) {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [taxType, setTaxType] = useState('flat');
  const [flatTax, setFlatTax] = useState(0);
  const [progressiveTax, setProgressiveTax] = useState(0);

  useEffect(() => {
    const storedIncome = localStorage.getItem('income');
    const storedExpenses = localStorage.getItem('expenses');
    const storedTaxType = localStorage.getItem('taxType');
    const storedFlatTax = localStorage.getItem('flatTax');
    const storedProgressiveTax = localStorage.getItem('progressiveTax');

    if (storedIncome) {
      setIncome(parseFloat(storedIncome));
    }
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
    if (storedTaxType) {
      setTaxType(storedTaxType);
    }
    if (storedFlatTax) {
      setFlatTax(parseFloat(storedFlatTax));
    }
    if (storedProgressiveTax) {
      setProgressiveTax(parseFloat(storedProgressiveTax));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('income', income);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('taxType', taxType);
    localStorage.setItem('flatTax', flatTax);
    localStorage.setItem('progressiveTax', progressiveTax);
  }, [income, expenses, taxType, flatTax, progressiveTax]);

  const addExpense = () => {
    setExpenses([...expenses, { name: '', cost: 0, frequency: 'monthly' }]);
  };

  const updateExpense = (index, field, value) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index][field] = value;
    setExpenses(updatedExpenses);
  };

  const removeExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  const calculateTax = () => {
    if (taxType === 'flat') {
      return income * (flatTax / 100);
    } else {
      return income * (progressiveTax / 100);
    }
  };

  const calculateTotalExpenses = (frequency) => {
    const filteredExpenses = expenses.filter((expense) => expense.frequency === frequency);
    return filteredExpenses.reduce((total, expense) => total + parseFloat(expense.cost), 0);
  };

  const calculateNetGain = (frequency) => {
    const totalExpenses = calculateTotalExpenses(frequency);
    const tax = calculateTax();

    if (frequency === 'daily') {
      return (income - totalExpenses - tax) / 365;
    } else if (frequency === 'monthly') {
      return (income - totalExpenses - tax) / 12;
    } else {
      return income - totalExpenses - tax;
    }
  };

  return (
    <div className="living-expense-page-container">
      <h2>Living Expenses Calculator</h2>
      <div className="income-section">
        <label>Annual Income:</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(parseFloat(e.target.value))}
        />
      </div>
      <div className="expenses-section">
        <h3>Expenses</h3>
        {expenses.map((expense, index) => (
          <div key={index} className="expense-row">
            <input
              type="text"
              placeholder="Expense Name"
              value={expense.name}
              onChange={(e) => updateExpense(index, 'name', e.target.value)}
            />
            <input
              type="number"
              placeholder="Cost"
              value={expense.cost}
              onChange={(e) => updateExpense(index, 'cost', parseFloat(e.target.value))}
            />
            <select
              value={expense.frequency}
              onChange={(e) => updateExpense(index, 'frequency', e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <button onClick={() => removeExpense(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <div className="tax-section">
        <h3>Tax</h3>
        <div className="tax-type">
          <label>
            <input
              type="radio"
              value="flat"
              checked={taxType === 'flat'}
              onChange={(e) => setTaxType(e.target.value)}
            />
            Flat Tax
          </label>
          <label>
            <input
              type="radio"
              value="progressive"
              checked={taxType === 'progressive'}
              onChange={(e) => setTaxType(e.target.value)}
            />
            Progressive Tax
          </label>
        </div>
        {taxType === 'flat' ? (
          <div className="flat-tax">
            <label>Flat Tax Percentage:</label>
            <input
              type="number"
              value={flatTax}
              onChange={(e) => setFlatTax(parseFloat(e.target.value))}
            />
          </div>
        ) : (
          <div className="progressive-tax">
            <label>Progressive Tax Percentage:</label>
            <input
              type="number"
              value={progressiveTax}
              onChange={(e) => setProgressiveTax(parseFloat(e.target.value))}
            />
          </div>
        )}
      </div>
      <div className="net-gain-section">
        <h3>Net Gain</h3>
        <p>Daily: {calculateNetGain('daily').toFixed(2)}</p>
        <p>Monthly: {calculateNetGain('monthly').toFixed(2)}</p>
        <p>Yearly: {calculateNetGain('yearly').toFixed(2)}</p>
      </div>
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default LivingExpense;