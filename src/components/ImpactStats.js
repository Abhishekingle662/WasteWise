import React from 'react';
import './ImpactStats.css';

const ImpactStats = () => {
  // Mock impact data
  const impactData = {
    wasteStats: {
      totalRecycled: 5280,
      totalComposted: 3150,
      landfillDiverted: 8430,
      co2Saved: 4215
    },
    communityStats: {
      activeUsers: 5432,
      businessesParticipating: 128,
      dropOffLocations: 36,
      totalRewards: 15240
    },
    monthlyTrends: [
      { month: 'Jan', recycled: 320, composted: 180 },
      { month: 'Feb', recycled: 350, composted: 200 },
      { month: 'Mar', recycled: 400, composted: 220 },
      { month: 'Apr', recycled: 450, composted: 250 },
      { month: 'May', recycled: 480, composted: 290 },
      { month: 'Jun', recycled: 520, composted: 350 }
    ],
    environmentalEquivalents: [
      {
        id: 1,
        title: "Trees Saved",
        value: 872,
        icon: "trees.svg",
        description: "Equivalent to the amount of paper recycled"
      },
      {
        id: 2,
        title: "Cars Off the Road",
        value: 412,
        icon: "car.svg",
        description: "CO₂ emissions reduction equivalent"
      },
      {
        id: 3, 
        title: "Gallons of Water Saved",
        value: 145800,
        icon: "water.svg",
        description: "Through sustainable practices"
      },
      {
        id: 4,
        title: "Energy Saved (kWh)",
        value: 68420,
        icon: "energy.svg",
        description: "Through recycling efforts"
      }
    ]
  };

  // Format large numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="impact-stats">
      <h1 className="section-title">Our Environmental Impact</h1>
      
      <div className="impact-overview">
        <p>
          Together, our community is making a significant positive impact on the environment.
          Here's how our collective efforts are helping create a more sustainable future.
        </p>
      </div>
      
      <div className="stats-grid">
        <div className="stats-card waste-stats">
          <h2>Waste Diverted</h2>
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-value">{formatNumber(impactData.wasteStats.totalRecycled)}</div>
              <div className="stat-label">kg Recycled</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{formatNumber(impactData.wasteStats.totalComposted)}</div>
              <div className="stat-label">kg Composted</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{formatNumber(impactData.wasteStats.landfillDiverted)}</div>
              <div className="stat-label">kg Diverted from Landfill</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{formatNumber(impactData.wasteStats.co2Saved)}</div>
              <div className="stat-label">kg CO₂ Emissions Saved</div>
            </div>
          </div>
        </div>
        
        <div className="stats-card community-stats">
          <h2>Community Engagement</h2>
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-value">{formatNumber(impactData.communityStats.activeUsers)}</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{impactData.communityStats.businessesParticipating}</div>
              <div className="stat-label">Local Businesses</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{impactData.communityStats.dropOffLocations}</div>
              <div className="stat-label">Drop-off Locations</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{formatNumber(impactData.communityStats.totalRewards)}</div>
              <div className="stat-label">Rewards Redeemed</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="environmental-impact">
        <h2>Environmental Equivalents</h2>
        <p className="impact-description">
          Here's what our community's recycling and composting efforts represent in real-world terms:
        </p>
        <div className="equivalents-grid">
          {impactData.environmentalEquivalents.map(item => (
            <div key={item.id} className="equivalent-card">
              <div className="equivalent-icon">
                <img src={`/icons/${item.icon}`} alt={item.title} />
              </div>
              <div className="equivalent-value">{formatNumber(item.value)}</div>
              <h3 className="equivalent-title">{item.title}</h3>
              <p className="equivalent-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="trend-analysis">
        <h2>Monthly Recycling Trends</h2>
        <div className="chart-container">
          <div className="chart-legend">
            <div className="legend-item">
              <span className="legend-color recycled"></span>
              <span>Recycled</span>
            </div>
            <div className="legend-item">
              <span className="legend-color composted"></span>
              <span>Composted</span>
            </div>
          </div>
          <div className="chart">
            {impactData.monthlyTrends.map((month, index) => (
              <div key={index} className="month-column">
                <div className="chart-bars">
                  <div 
                    className="bar recycled-bar" 
                    style={{ height: `${month.recycled / 6}px` }}
                    title={`${month.recycled} kg recycled`}
                  ></div>
                  <div 
                    className="bar composted-bar" 
                    style={{ height: `${month.composted / 6}px` }}
                    title={`${month.composted} kg composted`}
                  ></div>
                </div>
                <div className="month-label">{month.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="community-impact">
        <h2>Join Our Community Impact</h2>
        <div className="impact-cta">
          <p>
            Every small action makes a difference. Start your sustainability journey today 
            and become part of our growing community of environmental champions.
          </p>
          <div className="cta-buttons">
            <a href="/services" className="btn btn-primary">Find Recycling Services</a>
            <a href="/dashboard" className="btn btn-outline">Track Your Impact</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;
