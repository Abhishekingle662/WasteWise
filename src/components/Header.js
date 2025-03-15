import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo">
          <span className="logo-icon">♻️</span>
          <span className="logo-text">WasteWise</span>
        </Link>
      </div>
      <nav className="nav-menu">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Find Services</Link></li>
          <li><Link to="/guide">Sorting Guide</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/rewards">Rewards</Link></li>
          <li><Link to="/impact">Impact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
