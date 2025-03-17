import React from 'react';
import badges from '../data/badges';

const BadgeDisplay = () => {
  return (
    <div className="badges-container">
      {badges.map(badge => (
        <div 
          key={badge.id} 
          className={`badge-item ${badge.earned ? 'earned' : 'locked'}`}
        >
          <i className={badge.icon} aria-hidden="true"></i>
          <span>{badge.name}</span>
        </div>
      ))}
    </div>
  );
};

export default BadgeDisplay;
