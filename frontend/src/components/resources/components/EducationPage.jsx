import React, { useState } from 'react';
import './css/educationPage.css';

function EducationPage({ onBackClick }) {
  const [tuition, setTuition] = useState(0);

  const calculateTuition = () => {
    const averageTuition = 12000; // Average private school tuition per year
    const years = 12; // Assuming K-12 education
    const totalTuition = averageTuition * years;
    setTuition(totalTuition);
  };

  return (
    <div className="education-page-container">
      <h2>Education Resources</h2>
      <p className="intro-text">
        Choosing the right school for your child is an important decision. Explore the different types of schools available and their unique benefits to make an informed choice.
      </p>
      <div className="school-types">
        <div className="school-type">
          <h3>Public Schools</h3>
          <p>Public schools are funded by the government and offer free education to all students. They follow a standardized curriculum and are open to all children within a specific geographic area.</p>
          <h4>Benefits:</h4>
          <ul>
            <li>Free education</li>
            <li>Diverse student population</li>
            <li>Access to extracurricular activities</li>
          </ul>
          <a href="/public-schools">Learn More</a>
        </div>
        <div className="school-type">
          <h3>Private Schools</h3>
          <p>Private schools are independently funded and charge tuition fees. They have more flexibility in their curriculum and may have a specific educational philosophy or religious affiliation.</p>
          <h4>Benefits:</h4>
          <ul>
            <li>Smaller class sizes</li>
            <li>Specialized programs and resources</li>
            <li>Higher academic standards</li>
          </ul>
          <div className="tuition-calculator">
            <h4>Tuition Calculator</h4>
            <p>Estimate the total cost of private school education:</p>
            <button onClick={calculateTuition}>Calculate</button>
            <p>Total Tuition (K-12): ${tuition.toLocaleString()}</p>
          </div>
          <a href="/private-schools">Learn More</a>
        </div>
        <div className="school-type">
          <h3>Charter Schools</h3>
          <p>Charter schools are publicly funded but independently operated. They have more autonomy than traditional public schools and may have a specific educational focus or teaching method.</p>
          <h4>Benefits:</h4>
          <ul>
            <li>Innovative teaching approaches</li>
            <li>Specialized curricula</li>
            <li>Increased parental involvement</li>
          </ul>
          <a href="/charter-schools">Learn More</a>
        </div>
      </div>
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default EducationPage;