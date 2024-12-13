import React from 'react';
import Header from './Header';  
import MainContent from './MainContent';
import HowItWorks from './HowItWorks';
import FAQs from './FAQs';
 

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Render all the components that should appear on the landing page */}
      <Header />
      <MainContent />
      <HowItWorks />
      <FAQs />
    </div>
  );
};

export default LandingPage;
