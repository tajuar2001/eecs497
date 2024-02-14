import React from 'react';
import './css/advicePage.css'; // Assuming you have a separate CSS file for AdvicePage styles

function AdvicePage() {
  return (
    <div className="advice-page">
      <h1>Welcome to New Parents' Advice Corner</h1>
      <section className="advice-section">
        <h2>Getting Started with Parenthood</h2>
        <p>Welcoming a new member to your family is an exciting journey. It's filled with moments of joy, challenges, and learning. Remember, it's okay to ask for help and take time for yourself to adjust to this new chapter in your life.</p>
      </section>
      
      <section className="advice-section">
        <h2>Feeding Your Baby</h2>
        <p>Feeding your newborn is one of the first major tasks you'll encounter. Whether you choose breastfeeding, formula, or a combination, ensure your baby is getting enough to eat and is properly latched during feeding times.</p>
      </section>
      
      <section className="advice-section">
        <h2>Sleeping Patterns</h2>
        <p>Understanding and adapting to your baby's sleeping patterns can be challenging but remember, each baby is unique. Creating a bedtime routine and learning to recognize sleep cues can greatly help.</p>
      </section>
      
      <section className="advice-section">
        <h2>Health and Wellness</h2>
        <p>Regular check-ups with a pediatrician are essential to monitor your baby's growth and development. Don't hesitate to reach out to your healthcare provider with any concerns.</p>
      </section>
      
      <img src="https://a.storyblok.com/f/236180/4e30fcb36a/how-to-give-advice-in-english.jpg" alt="Advice for New Parents" className="advice-image"/>
      
      {/* Consider adding more sections with advice on different topics relevant to new parents */}
    </div>
  );
}

export default AdvicePage;
