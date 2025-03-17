import React, { useState, useEffect } from 'react';
import { getRecommendedReward, trackUserAction } from '../api/rewardsApi';
import './DynamicRewards.css';

const DynamicRewards = ({ userId, userMetrics }) => {
  const [recommendedReward, setRecommendedReward] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  useEffect(() => {
    // Fetch personalized reward recommendation when component mounts or user metrics change
    const fetchRecommendation = async () => {
      try {
        setLoading(true);
        
        // Combine user ID with metrics for a personalized recommendation
        const reward = await getRecommendedReward(userId || 'guest_user');
        setRecommendedReward(reward);
        setError(null);
      } catch (err) {
        console.error('Error fetching reward recommendation:', err);
        setError('Unable to fetch personalized rewards. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, [userId, userMetrics]);

  const handleClaimReward = async () => {
    try {
      // Track this action in our RL system
      await trackUserAction(userId || 'guest_user', 'reward_claim', {
        reward_type: recommendedReward.reward_type,
        timestamp: new Date().toISOString()
      });
      
      setRewardClaimed(true);
      
      // In a real implementation, we would update user points, badges, etc.
      // And record the outcome after some time to see if the reward was effective
    } catch (err) {
      console.error('Error claiming reward:', err);
      setError('Unable to claim reward. Please try again.');
    }
  };

  if (loading) {
    return <div className="dynamic-reward loading">Finding your perfect reward...</div>;
  }

  if (error) {
    return <div className="dynamic-reward error">{error}</div>;
  }

  if (rewardClaimed) {
    return (
      <div className="dynamic-reward claimed">
        <div className="reward-badge">✓</div>
        <h3>Reward Claimed!</h3>
        <p>Your {recommendedReward.reward_type} reward has been added to your account.</p>
      </div>
    );
  }

  if (!recommendedReward) {
    return null;
  }

  // Render different UI based on reward type
  const renderRewardContent = () => {
    const details = recommendedReward.reward_details;
    
    switch(recommendedReward.reward_type) {
      case 'points':
        return (
          <>
            <div className="reward-icon">🏆</div>
            <h3>Bonus Points Reward</h3>
            <p className="reward-description">{details.description}</p>
            <div className="reward-highlight">+{details.amount} points</div>
          </>
        );
        
      case 'badges':
        return (
          <>
            <div className="reward-icon">🏅</div>
            <h3>{details.badge_name}</h3>
            <p className="reward-description">{details.description}</p>
            <div className="reward-badge-image">
              <img src={details.image_url} alt={details.badge_name} />
            </div>
          </>
        );
        
      case 'discounts':
        return (
          <>
            <div className="reward-icon">🏷️</div>
            <h3>Special Discount</h3>
            <p className="reward-description">{details.description}</p>
            <div className="reward-highlight">{details.amount} off</div>
            <div className="partner-stores">
              Valid at: {details.partner_stores.join(", ")}
            </div>
          </>
        );
        
      case 'social_recognition':
        return (
          <>
            <div className="reward-icon">🌟</div>
            <h3>Community Recognition</h3>
            <p className="reward-description">{details.description}</p>
          </>
        );
        
      default:
        return (
          <>
            <div className="reward-icon">🎁</div>
            <h3>Special Reward</h3>
            <p>You've earned a special reward for your sustainability efforts!</p>
          </>
        );
    }
  };

  return (
    <div className="dynamic-reward">
      <div className="reward-header">
        <span className="ai-powered-tag">AI Recommended</span>
      </div>
      <div className="reward-content">
        {renderRewardContent()}
        <p className="reward-expiry">Valid for {recommendedReward.reward_details.expires_in_days} days</p>
      </div>
      <div className="reward-footer">
        <button className="claim-button" onClick={handleClaimReward}>
          Claim Your Reward
        </button>
      </div>
    </div>
  );
};

export default DynamicRewards;
