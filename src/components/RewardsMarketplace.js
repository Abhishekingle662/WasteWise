import React, { useState } from 'react';
import './RewardsMarketplace.css';

const RewardsMarketplace = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Mock user points
  const userPoints = 245;
  
  // Mock rewards data
  const rewardsData = [
    {
      id: 1,
      name: "Green Café",
      description: "$5 off any purchase",
      category: "food",
      points: 50,
      logo: "green-cafe.png",
      expiry: "No expiration",
      location: "123 Main St"
    },
    {
      id: 2,
      name: "EcoMarket",
      description: "10% off reusable items",
      category: "retail",
      points: 75,
      logo: "eco-market.png",
      expiry: "Valid until Dec 31, 2023",
      location: "456 Eco Ave"
    },
    {
      id: 3,
      name: "Sustainable Threads",
      description: "$10 off clothing made from recycled materials",
      category: "retail",
      points: 100,
      logo: "sustainable-threads.png",
      expiry: "No expiration",
      location: "789 Green Blvd"
    },
    {
      id: 4,
      name: "Plant-Based Bistro",
      description: "Free dessert with any main course",
      category: "food",
      points: 60,
      logo: "plant-bistro.png",
      expiry: "Valid until Nov 30, 2023",
      location: "101 Vegan St"
    },
    {
      id: 5,
      name: "City Bike Share",
      description: "One free day pass",
      category: "transport",
      points: 120,
      logo: "city-bike.png",
      expiry: "Valid for 6 months after redemption",
      location: "Multiple locations"
    },
    {
      id: 6,
      name: "Zero Waste Store",
      description: "15% off your entire purchase",
      category: "retail",
      points: 150,
      logo: "zero-waste.png",
      expiry: "No expiration",
      location: "202 Sustainable Ave"
    },
    {
      id: 7,
      name: "Community Garden",
      description: "Free seed starter kit",
      category: "other",
      points: 40,
      logo: "community-garden.png",
      expiry: "Spring season only",
      location: "303 Bloom St"
    },
    {
      id: 8,
      name: "Public Transit",
      description: "One-day unlimited pass",
      category: "transport",
      points: 80,
      logo: "public-transit.png",
      expiry: "Valid until Dec 31, 2023",
      location: "All city routes"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Rewards' },
    { id: 'food', name: 'Food & Drink' },
    { id: 'retail', name: 'Shopping' },
    { id: 'transport', name: 'Transportation' },
    { id: 'other', name: 'Other' }
  ];

  const filteredRewards = activeCategory === 'all' 
    ? rewardsData 
    : rewardsData.filter(reward => reward.category === activeCategory);

  const handleRedeemClick = (reward) => {
    if (userPoints >= reward.points) {
      alert(`Congratulations! You have redeemed: ${reward.name} - ${reward.description}. Check your email for details.`);
    } else {
      alert(`Not enough points. You need ${reward.points - userPoints} more points to redeem this reward.`);
    }
  };

  return (
    <div className="rewards-marketplace">
      <div className="rewards-header">
        <h1 className="section-title">Rewards Marketplace</h1>
        <div className="points-display">
          <span className="points-icon">🏆</span>
          <span className="available-points">{userPoints} available points</span>
        </div>
      </div>

      <div className="rewards-description">
        <p>
          Earn points by recycling and composting through our partner locations.
          Redeem your points for exclusive discounts and offers at local eco-friendly businesses.
        </p>
      </div>
      
      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="rewards-grid">
        {filteredRewards.map(reward => (
          <div key={reward.id} className="reward-card">
            <div className="reward-header">
              <div className="reward-logo">
                <img src={`/images/logos/${reward.logo}`} alt={reward.name} />
              </div>
              <div className="reward-points">
                <span>{reward.points}</span>
                <small>points</small>
              </div>
            </div>
            <div className="reward-content">
              <h3 className="reward-title">{reward.name}</h3>
              <p className="reward-description">{reward.description}</p>
              <div className="reward-meta">
                <p className="reward-location">📍 {reward.location}</p>
                <p className="reward-expiry">⏱️ {reward.expiry}</p>
              </div>
            </div>
            <div className="reward-footer">
              <button 
                className={`redeem-button ${userPoints < reward.points ? 'disabled' : ''}`}
                onClick={() => handleRedeemClick(reward)}
                disabled={userPoints < reward.points}
              >
                {userPoints >= reward.points ? 'Redeem Reward' : 'Not Enough Points'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="how-to-earn">
        <h2>How to Earn More Points</h2>
        <div className="earn-options">
          <div className="earn-option">
            <div className="earn-icon">♻️</div>
            <h3>Recycle</h3>
            <p>Earn 10 points per kg of recyclables you drop off at partner locations.</p>
          </div>
          <div className="earn-option">
            <div className="earn-icon">🌱</div>
            <h3>Compost</h3>
            <p>Earn 15 points per kg of compostable waste you contribute.</p>
          </div>
          <div className="earn-option">
            <div className="earn-icon">📱</div>
            <h3>E-Waste</h3>
            <p>Earn 25+ points for responsibly disposing of electronics.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsMarketplace;
