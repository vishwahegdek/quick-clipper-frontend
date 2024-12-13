import React from 'react';
import './Header.css';
import logo from '../../assets/new-logo.svg';

const Header = () => {
  return (
    <header className="header">
    <div className="logo">
      <img src={logo} alt="Quick Clipper" />
      <h1>Quick Clipper</h1>
    </div>
    <nav>
      <ul>
        <li><a href="#how-it-works">How it works</a></li>
        <li><a href="#faqs">FAQs</a></li>
      </ul>
      <button className="get-started">Get started</button>
    </nav>
  </header>
  );
};

export default Header;
