import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to <span className="text-primary">WasteWise</span></h1>
          <p className="hero-subtitle">Connecting you to local recycling and composting services</p>
          <div className="hero-buttons">
            <Link to="/services" className="btn btn-primary">Find Services</Link>
            <Link to="/guide" className="btn btn-outline">Sorting Guide</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">How WasteWise Works</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h3>Service Finder</h3>
            <p>Find recycling and composting services near you with our interactive map.</p>
            <Link to="/services" className="feature-link">Find Services</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Waste Sorting Guide</h3>
            <p>Learn how to properly sort your waste with our comprehensive guide.</p>
            <Link to="/guide" className="feature-link">View Guide</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Rewards Marketplace</h3>
            <p>Earn points for recycling and redeem them at local participating businesses.</p>
            <Link to="/rewards" className="feature-link">View Rewards</Link>
          </div>
        </div>
      </section>

      <section className="impact">
        <h2 className="section-title">Make a Difference</h2>
        <div className="impact-stats">
          <div className="stat">
            <h3>1,500 kg</h3>
            <p>Waste diverted from landfills</p>
          </div>
          <div className="stat">
            <h3>120+</h3>
            <p>Local businesses participating</p>
          </div>
          <div className="stat">
            <h3>5,000+</h3>
            <p>Active community members</p>
          </div>
        </div>
        <div className="impact-cta">
          <Link to="/impact" className="btn btn-primary">See Our Impact</Link>
        </div>
      </section>

      <section className="getting-started">
        <h2 className="section-title">Getting Started is Easy</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Find Services</h3>
            <p>Locate recycling and composting services near you.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Sort Properly</h3>
            <p>Use our guide to sort your waste correctly.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Earn Rewards</h3>
            <p>Track your progress and earn points for recycling.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
