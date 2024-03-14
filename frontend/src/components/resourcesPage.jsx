import React from 'react';
import './css/resourcesPage.css'; // Make sure your CSS file is named correctly
import BudgetingPage from './resources/BudgetingPage.jsx';
import LivingExpense from './resources/livingExpense.jsx';
import EducationPage from './resources/EducationPage.jsx';
import FoodPage from './resources/FoodPage.jsx';
import ParksPage from './resources/ParksPage.jsx';
import ShoppingPage from './resources/ShoppingPage.jsx';
import DaycarePage from './resources/DaycarePage.jsx';
import HealthcarePage from './resources/HealthcarePage.jsx';
import CollegeFund from './resources/CollegeFund.jsx';
import EtcPage from './resources/EtcPage.jsx';
import { useState, useEffect } from 'react';

function ResourcesPage() {
  const [activeResource, setActiveResource] = useState(
    localStorage.getItem('activeResource') || null
  );

  useEffect(() => {
    localStorage.setItem('activeResource', activeResource);
  }, [activeResource]);

  const resources = [
    // ... your resources array with an additional component attribute, if needed
    { name: 'Budgeting', icon: 'budget-icon', color: 'red', Component: BudgetingPage },
    { name: 'Living Expense', icon: 'living-expense-icon', color: 'blue', Component: LivingExpense },
    { name: 'Education', icon: 'education-icon', color: 'green', Component: EducationPage },
    { name: 'Food', icon: 'food-icon', color: 'yellow', Component: FoodPage },
    { name: 'Parks', icon: 'parks-icon', color: 'teal', Component: ParksPage },
    { name: 'Shopping', icon: 'shopping-icon', color: 'lightblue', Component: ShoppingPage },
    { name: 'Daycare', icon: 'daycare-icon', color: 'orange', Component: DaycarePage },
    { name: 'Healthcare', icon: 'healthcare-icon', color: 'purple', Component: HealthcarePage },
    { name: 'College Fund', icon: 'college-fund-icon', color: 'violet', Component: CollegeFund },
    { name: 'Etc', icon: 'etc-icon', color: 'grey', Component: EtcPage }
  ];

  // The click handler now just sets the name of the resource.
  const handleResourceClick = (resourceName) => {
    setActiveResource(resourceName);
  };

  // The back handler resets the active resource name to the empty string.
  const handleBackClick = () => {
    setActiveResource('');
  };

  // Determine which content to render based on activeResource
  let content;
  if (activeResource === 'Budgeting') {
    content = <BudgetingPage onBackClick={handleBackClick} />;
  } else if (activeResource === 'Living Expense') {
    content = <LivingExpense onBackClick={handleBackClick} />;
  } else if (activeResource === 'Education') {
    content = <EducationPage onBackClick={handleBackClick} />;
  } else if (activeResource === 'Food') {
    content = <FoodPage onBackClick={handleBackClick} />;
  } else if (activeResource === 'Parks') {
    content = <ParksPage onBackClick={handleBackClick} />;
  } else if (activeResource === 'Shopping') {
    content = <ShoppingPage onBackClick={handleBackClick} />;
  } else if (activeResource === 'Daycare') {
    content = <DaycarePage onBackClick={handleBackClick} />;
  } else if (activeResource === 'Healthcare') {
    content = <HealthcarePage onBackClick={handleBackClick} />;
  } else if (activeResource === 'College Fund') {
    content = <CollegeFund onBackClick={handleBackClick} />;
  } else if (activeResource === 'Etc') {
    content = <EtcPage onBackClick={handleBackClick} />;
  } else {
    content = (
      <div className="resourcesPage">
      <h2>Resources</h2>
      <div className="resources-grid">
        {resources.map((resource, index) => (
          <div key={index}
               className="resource-card"
               style={{ backgroundColor: resource.color }}
               onClick={() => handleResourceClick(resource.name)}>
            <div className="resource-icon">{resource.icon}</div>
            <div className="resource-name">{resource.name}</div>
          </div>
        ))}
      </div>
      </div>
    );
  }

  return (
    <div className="resources-container">
      {content}
    </div>
  );
}

export default ResourcesPage;