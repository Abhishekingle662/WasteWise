import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>WasteWise</h3>
          <p>Connecting households and businesses with local recycling and composting services.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/services">Find Services</a></li>
            <li><a href="/guide">Sorting Guide</a></li>
            <li><a href="/rewards">Rewards Marketplace</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@wastewise.example</p>
          <p>Phone: (555) 123-4567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 WasteWise. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
