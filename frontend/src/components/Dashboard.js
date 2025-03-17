import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock user data
  const userData = {
    name: "Alex Smith",
    points: 245,
    recyclingSummary: {
      totalRecycled: 82,
      totalComposted: 28,
      totalPointsEarned: 320,
      pointsSpent: 75,
      co2Saved: 41
    },
    recentActivities: [
      {
        id: 1,
        type: "drop-off",
        date: "2023-06-15",
        location: "Downtown Recycling Center",
        items: ["3kg paper", "2kg plastic", "1kg glass"],
        points: 30
      },
      {
        id: 2,
        type: "drop-off",
        date: "2023-06-08",
        location: "Queens Green Point",
        items: ["2kg food waste", "4kg yard waste"],
        points: 25
      },
      {
        id: 3,
        type: "redemption",
        date: "2023-06-05",
        reward: "$5 off at Green Café",
        points: -50
      },
      {
        id: 4,
        type: "drop-off",
        date: "2023-05-28",
        location: "Brooklyn Recycle Hub",
        items: ["1 old laptop", "2kg metal"],
        points: 45
      }
    ],
    badges: [
      { id: 1, name: "Recycling Rookie", icon: "rookie-badge.svg", earned: true },
      { id: 2, name: "Compost Champion", icon: "compost-badge.svg", earned: true },
      { id: 3, name: "E-Waste Eliminator", icon: "ewaste-badge.svg", earned: true },
      { id: 4, name: "Zero Waste Hero", icon: "zero-badge.svg", earned: false }
    ]
  };

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="section-title">Your Dashboard</h1>
        <div className="user-info">
          <div className="avatar">
            <span>{userData.name.charAt(0)}</span>
          </div>
          <div>
            <h2>Welcome, {userData.name}</h2>
            <p className="points-balance">
              <span className="points-icon">🏆</span>
              <span className="points-text">{userData.points} points available</span>
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card summary-card">
          <h3>Your Recycling Summary</h3>
          <div className="summary-stats">
            <div className="summary-stat">
              <p className="stat-value">{userData.recyclingSummary.totalRecycled} kg</p>
              <p className="stat-label">Recycled</p>
            </div>
            <div className="summary-stat">
              <p className="stat-value">{userData.recyclingSummary.totalComposted} kg</p>
              <p className="stat-label">Composted</p>
            </div>
            <div className="summary-stat">
              <p className="stat-value">{userData.recyclingSummary.co2Saved} kg</p>
              <p className="stat-label">CO2 Saved</p>
            </div>
          </div>
        </div>

        <div className="dashboard-card badges-card">
          <h3>Your Badges</h3>
          <div className="badges-container">
            {userData.badges.map(badge => (
              <div key={badge.id} className={`badge ${badge.earned ? 'earned' : 'locked'}`}>
                <div className="badge-icon">
                  {badge.earned ? (
                    <img src={`/icons/${badge.icon}`} alt={badge.name} />
                  ) : (
                    <span className="lock-icon">🔒</span>
                  )}
                </div>
                <p className="badge-name">{badge.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card activities-card">
          <h3>Recent Activities</h3>
          <div className="activities-list">
            {userData.recentActivities.map(activity => (
              <div key={activity.id} className={`activity-item ${activity.type}`}>
                <div className="activity-date">{formatDate(activity.date)}</div>
                <div className="activity-details">
                  {activity.type === 'drop-off' ? (
                    <>
                      <h4>Drop-off at {activity.location}</h4>
                      <p>{activity.items.join(", ")}</p>
                    </>
                  ) : (
                    <h4>Redeemed: {activity.reward}</h4>
                  )}
                </div>
                <div className={`activity-points ${activity.points < 0 ? 'negative' : 'positive'}`}>
                  {activity.points > 0 ? `+${activity.points}` : activity.points}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card rewards-card">
          <h3>Rewards & Offers</h3>
          <div className="rewards-preview">
            <div className="reward-preview-item">
              <h4>Green Café</h4>
              <p>$5 off any purchase</p>
              <p className="reward-cost">50 points</p>
            </div>
            <div className="reward-preview-item">
              <h4>EcoMarket</h4>
              <p>10% off reusable items</p>
              <p className="reward-cost">75 points</p>
            </div>
          </div>
          <Link to="/rewards" className="btn btn-outline btn-sm">See All Rewards</Link>
        </div>
      </div>

      <div className="dashboard-cta">
        <h3>Ready to recycle more?</h3>
        <div className="cta-buttons">
          <Link to="/services" className="btn btn-primary">Find Drop-off Locations</Link>
          <Link to="/guide" className="btn btn-outline">Sorting Guide</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
