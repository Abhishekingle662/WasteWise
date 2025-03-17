/*
 * NOTE: This file requires the axios package.
 * Please run the following command in your terminal to install it:
 * npm install axios
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RewardsAdmin.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const RewardsAdmin = () => {
  const [stats, setStats] = useState(null);
  const [qTable, setQTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [trainingParams, setTrainingParams] = useState({
    num_users: 100,
    episodes: 200
  });
  const [isTraining, setIsTraining] = useState(false);
  
  useEffect(() => {
    fetchModelData();
  }, []);
  
  const fetchModelData = async () => {
    try {
      setLoading(true);
      
      // These are the endpoints we added to app.py
      const modelStatsResponse = await axios.get(`${API_BASE_URL}/admin/model-stats`);
      const qTableResponse = await axios.get(`${API_BASE_URL}/admin/q-table`);
      
      setStats(modelStatsResponse.data);
      setQTable(qTableResponse.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching model data:', err);
      setError('Failed to load model data. Server might not be running or endpoints not implemented.');
      
      // For demonstration: Create mock data if the endpoints aren't available
      setStats({
        iterations: 250,
        total_rewards: 735,
        last_updated: new Date().toISOString(),
        reward_counts: {
          points: 120,
          badges: 45,
          discounts: 65,
          social_recognition: 20
        }
      });
      
      setQTable({
        'low_engagement': {
          points: 0.45,
          badges: 0.22,
          discounts: 0.65,
          social_recognition: 0.12
        },
        'medium_engagement': {
          points: 0.52,
          badges: 0.63,
          discounts: 0.41,
          social_recognition: 0.28
        },
        'high_engagement': {
          points: 0.38,
          badges: 0.75,
          discounts: 0.33,
          social_recognition: 0.81
        }
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleTrainModel = async () => {
    if (isTraining) return;
    
    try {
      setIsTraining(true);
      
      // Call the train-model endpoint with the training parameters
      await axios.post(`${API_BASE_URL}/admin/train-model`, trainingParams);
      
      // Refresh the data
      fetchModelData();
      
      alert('Model training completed successfully!');
    } catch (err) {
      console.error('Error training model:', err);
      alert(`Error training model: ${err.message}`);
    } finally {
      setIsTraining(false);
    }
  };
  
  const handleResetModel = async () => {
    if (!window.confirm('Are you sure you want to reset the model? This will clear all learned values.')) {
      return;
    }
    
    try {
      await axios.post(`${API_BASE_URL}/admin/reset-model`);
      
      // Refresh the data
      fetchModelData();
      
      alert('Model reset successfully.');
    } catch (err) {
      console.error('Error resetting model:', err);
      alert(`Error resetting model: ${err.message}`);
    }
  };
  
  const handleParamChange = (e) => {
    const { name, value } = e.target;
    setTrainingParams(prev => ({
      ...prev,
      [name]: parseInt(value, 10)
    }));
  };
  
  if (loading) {
    return <div className="admin-loading">Loading model data...</div>;
  }
  
  const renderQTable = () => {
    if (!qTable) return null;
    
    return (
      <div className="q-table-container">
        <h3>Q-Table Values</h3>
        <table className="q-table">
          <thead>
            <tr>
              <th>State / Action</th>
              <th>Points</th>
              <th>Badges</th>
              <th>Discounts</th>
              <th>Social Recognition</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(qTable).map(([state, actions]) => (
              <tr key={state}>
                <td className="state-cell">{state}</td>
                <td>{actions.points.toFixed(2)}</td>
                <td>{actions.badges.toFixed(2)}</td>
                <td>{actions.discounts.toFixed(2)}</td>
                <td>{actions.social_recognition.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="table-explanation">
          <p>The Q-table shows the learned values for each state-action pair.</p>
          <p>Higher values indicate that the corresponding reward type is more effective for that user state.</p>
        </div>
      </div>
    );
  };
  
  const renderOverview = () => {
    if (!stats) return null;
    
    return (
      <div className="overview-container">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Model Iterations</h3>
            <div className="stat-value">{stats.iterations}</div>
          </div>
          <div className="stat-card">
            <h3>Total Cumulative Rewards</h3>
            <div className="stat-value">{stats.total_rewards}</div>
          </div>
          <div className="stat-card">
            <h3>Last Updated</h3>
            <div className="stat-value date">
              {new Date(stats.last_updated).toLocaleString()}
            </div>
          </div>
        </div>
        
        <div className="reward-distribution">
          <h3>Reward Distribution</h3>
          {stats.reward_counts && (
            <div className="distribution-bars">
              {Object.entries(stats.reward_counts).map(([type, count]) => (
                <div className="bar-container" key={type}>
                  <div className="bar-label">{type}</div>
                  <div 
                    className="bar" 
                    style={{ 
                      width: `${Math.min(100, Math.max(5, count / 2))}%`,
                      backgroundColor: getColorForRewardType(type)
                    }} 
                  />
                  <div className="bar-value">{count}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const renderTrainingPanel = () => {
    return (
      <div className="training-panel">
        <h3>Model Training</h3>
        <div className="training-params">
          <div className="param-group">
            <label htmlFor="num_users">Number of Simulated Users:</label>
            <input 
              type="number" 
              id="num_users" 
              name="num_users" 
              value={trainingParams.num_users} 
              onChange={handleParamChange}
              min="10"
              max="500"
            />
          </div>
          
          <div className="param-group">
            <label htmlFor="episodes">Training Episodes:</label>
            <input 
              type="number" 
              id="episodes" 
              name="episodes" 
              value={trainingParams.episodes} 
              onChange={handleParamChange}
              min="50"
              max="1000"
            />
          </div>
        </div>
        <button 
          className="training-button" 
          onClick={handleTrainModel}
          disabled={isTraining}
        >
          {isTraining ? "Training..." : "Train Model"}
        </button>
        
        <div className="training-note">
          <p>
            Training simulates user interactions to optimize rewards based on different user engagement levels.
            Higher values will produce better results but take longer to train.
          </p>
        </div>
      </div>
    );
  };
  
  // Helper function to get a color for each reward type
  const getColorForRewardType = (type) => {
    switch (type) {
      case 'points': return '#4caf50';
      case 'badges': return '#2196f3';
      case 'discounts': return '#ff9800';
      case 'social_recognition': return '#9c27b0';
      default: return '#757575';
    }
  };

  return (
    <div className="rewards-admin">
      <h1>RL Rewards System Administration</h1>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className="admin-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'q-table' ? 'active' : ''}`}
          onClick={() => setActiveTab('q-table')}
        >
          Q-Table
        </button>
        <button 
          className={`tab ${activeTab === 'training' ? 'active' : ''}`}
          onClick={() => setActiveTab('training')}
        >
          Training
        </button>
      </div>
      
      <div className="admin-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'q-table' && renderQTable()}
        {activeTab === 'training' && renderTrainingPanel()}
      </div>
      
      <div className="admin-actions">
        {activeTab !== 'training' && (
          <button 
            className="action-button refresh"
            onClick={fetchModelData}
          >
            Refresh Data
          </button>
        )}
        <button 
          className="action-button reset"
          onClick={handleResetModel}
        >
          Reset Model
        </button>
      </div>
    </div>
  );
};

export default RewardsAdmin;
