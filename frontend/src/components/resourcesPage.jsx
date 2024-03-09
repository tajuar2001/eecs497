import React from 'react';
import './css/resourcesPage.css'; // Make sure your CSS file is named correctly
import BudgetingPage from './resources/BudgetingPage.jsx';
import { useState } from 'react';

function ResourcesPage() {
  const [activeResource, setActiveResource] = useState(null);

  const resources = [
    // ... your resources array with an additional component attribute, if needed
    { name: 'Budgeting', icon: 'budget-icon', color: 'red', Component: BudgetingPage },
    // ... other resources
    { name: 'Living Expense', icon: 'living-expense-icon', color: 'blue' },
    { name: 'Education', icon: 'education-icon', color: 'green' },
    { name: 'Food', icon: 'food-icon', color: 'yellow' },
    { name: 'Parks', icon: 'parks-icon', color: 'teal' },
    { name: 'Shopping', icon: 'shopping-icon', color: 'lightblue' },
    { name: 'Daycare', icon: 'daycare-icon', color: 'orange' },
    { name: 'Healthcare', icon: 'healthcare-icon', color: 'purple' },
    { name: 'College Fund', icon: 'college-fund-icon', color: 'violet' },
    { name: 'Etc', icon: 'etc-icon', color: 'grey' }
  ];

  const handleResourceClick = (Component) => {
    setActiveResource(Component);
  };

  const handleBackClick = () => {
    setActiveResource(null);
  };

  return (
    <div className="resources-container">
      <h2>Resources</h2>
      {
        // Dynamically render the selected component or the resource grid
        activeResource ? (
          <activeResource onBackClick={handleBackClick} />
        ) : (
          // Grid that displays when no specific resource page is selected
          <div className="resources-grid">
            {resources.map((resource, index) => (
              <div key={index}
                   className="resource-card"
                   style={{ backgroundColor: resource.color }}
                   onClick={() => handleResourceClick(resource.Component)}>
                <div className="resource-icon">{resource.icon}</div>
                <div className="resource-name">{resource.name}</div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}

export default ResourcesPage;