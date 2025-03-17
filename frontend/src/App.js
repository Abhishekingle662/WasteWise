import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ServiceFinder from './components/ServiceFinder';
import SortingGuide from './components/SortingGuide';
import Dashboard from './components/Dashboard';
import RewardsMarketplace from './components/RewardsMarketplace';
import ImpactStats from './components/ImpactStats';
import Home from './components/Home';
import RewardsAdmin from './components/RewardsAdmin';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServiceFinder />} />
            <Route path="/guide" element={<SortingGuide />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rewards" element={<RewardsMarketplace />} />
            <Route path="/impact" element={<ImpactStats />} />
            <Route path="/rewards-admin" element={<RewardsAdmin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
