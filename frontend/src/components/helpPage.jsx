import React from 'react';
import './css/helpPage.css';

function HelpPage({ onClose }) {
  return (
    <div className="help-page">
      <div className="help-content">
        <h2>Help Section</h2>
        <h3>Navigating through New Leaf</h3>
        <p>
          Welcome to New Leaf, a comprehensive web application designed to support and guide new parents through the beautiful and challenging journey of parenthood. This help section will provide you with an overview of the features and how to navigate through the website.
        </p>

        <h4>Community Building</h4>
        <p>
          At the heart of New Leaf is our vibrant community of parents. You can connect with other parents, join discussions, share experiences, and offer support. To access the community features:
        </p>
        <ul>
          <li>Click on the "Community" tab in the navigation bar.</li>
          <li>Browse through the existing discussions or start a new one.</li>
          <li>Participate in discussions by posting comments and replies.</li>
        </ul>

        <h4>Expert Advice and Guidance</h4>
        <p>
          New Leaf provides a wealth of expert advice and guidance to help you make informed decisions for your family. To access the advice section:
        </p>
        <ul>
          <li>Click on the "Advice" tab in the navigation bar.</li>
          <li>Browse through the various topics and categories.</li>
          <li>Read articles, tips, and recommendations from trusted experts.</li>
          <li>Save helpful articles for future reference.</li>
        </ul>

        <h4>Personalized Resources</h4>
        <p>
          New Leaf offers a curated collection of resources tailored to different age groups, developmental stages, and parenting situations. To access the resources:
        </p>
        <ul>
          <li>Click on the "Resources" tab in the navigation bar.</li>
          <li>Use the search functionality to find specific resources.</li>
          <li>Browse resources by category or age group.</li>
          <li>Save and organize your favorite resources for quick access.</li>
        </ul>

        <h4>Personal Dashboard</h4>
        <p>
          Your personal dashboard is your central hub on New Leaf. It provides a personalized overview of your parenting journey. To access your dashboard:
        </p>
        <ul>
          <li>Click on the home button in the navigation bar.</li>
          <li>View upcoming milestones, reminders, and your activity feed.</li>
          <li>Track your child's development and progress.</li>
          <li>Access your saved resources and discussions.</li>
        </ul>

        <h4>User Profile and Settings</h4>
        <p>
          To manage your user profile and settings:
        </p>
        <ul>
          <li>Click on your username in the navigation bar.</li>
          <li>Update your profile information and preferences.</li>
          <li>Change your password or email address.</li>
          <li>Manage your notification settings.</li>
        </ul>

        <h4>Getting Help and Support</h4>
        <p>
          If you need further assistance or have any questions, please don't hesitate to reach out to our support team. You can contact us by:
        </p>
        <ul>
          <li>Clicking on the "Contact Us" link in the footer.</li>
          <li>Sending an email to support@newleaf.com.</li>
          <li>Using the live chat feature on our website.</li>
        </ul>

        <p>
          We hope this help section provides you with the information you need to navigate through New Leaf and make the most of our features. If you have any further questions or feedback, please let us know. Happy parenting!
        </p>

        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default HelpPage;