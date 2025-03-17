/*
 * NOTE: This file requires the axios package.
 * Please run the following command in your terminal to install it:
 * npm install axios
 */
import axios from 'axios';

// Base API URL - adjust to your backend endpoint
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const getRecommendedReward = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rewards/recommend/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recommended reward:', error);
    throw error;
  }
};

export const trackUserAction = async (userId, actionType, actionData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rewards/track`, {
      userId,
      actionType,
      actionData
    });
    return response.data;
  } catch (error) {
    console.error('Error tracking user action:', error);
    throw error;
  }
};

export const recordRewardOutcome = async (userId, rewardData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rewards/outcome`, {
      userId,
      ...rewardData
    });
    return response.data;
  } catch (error) {
    console.error('Error recording reward outcome:', error);
    throw error;
  }
};

// Example usage - remove from this file and put in your React components:
/*
// In a React component:
useEffect(() => {
  async function fetchRecommendedReward() {
    try {
      const reward = await getRecommendedReward('user123');
      setRecommendedReward(reward);
    } catch (error) {
      console.error('Error fetching reward:', error);
    }
  }
  
  fetchRecommendedReward();
}, []);

// When user performs an action:
const handleRecycleItem = async (item) => {
  try {
    await trackUserAction('user123', 'recycling', { item, timestamp: new Date() });
    // Show success feedback
  } catch (error) {
    console.error('Error tracking action:', error);
  }
};
*/
