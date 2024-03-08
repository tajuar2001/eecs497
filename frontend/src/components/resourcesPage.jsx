import React from 'react';
import './css/resourcesPage.css'; // Make sure your CSS file is named correctly

function ResourcesPage() {
  const resources = [
    { name: 'Budgeting', icon: 'budget-icon', color: 'red' },
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

  return (
    <div className="resources-container">
      <h2>Resources</h2>
      <div className="resources-grid">
        {resources.map((resource, index) => (
          <div key={index} className="resource-card" style={{ backgroundColor: resource.color }}>
            {/* Replace `icon` with actual img tag or component if you have one */}
            <div className="resource-icon">{resource.icon}</div> 
            <div className="resource-name">{resource.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourcesPage;
