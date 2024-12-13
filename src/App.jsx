import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/landing_page/Header';
// import MainContent from './components/landing_page/MainContent';
// import HowItWorks from './components/landing_page/HowItWorks';
// import FAQs from './components/landing_page/FAQs';
import LandingPage from './components/landing_page/LandingPage';
import AboutUs from './components/main_page/AboutUs';
import Chatbot from './components/summarize_page/Chatbot';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
