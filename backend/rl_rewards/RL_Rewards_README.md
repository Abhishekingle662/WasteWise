# Reinforcement Learning Rewards System for WasteWise

This document provides comprehensive information about the AI-powered reinforcement learning (RL) system for optimizing rewards in the WasteWise application.

## Overview

The WasteWise RL rewards system uses Q-learning to dynamically optimize what types of rewards to offer users based on their engagement patterns. The system learns over time which rewards are most effective at encouraging sustainable behaviors for different user segments.

### Key Components:

1. **Core RL Algorithm**: Q-learning approach that maps user states to optimal reward actions
2. **User State Classification**: Categorizes users into engagement levels based on their activities
3. **Reward Types**: Points, badges, discounts, and social recognition
4. **Simulation Environment**: For training the model without real user data
5. **Admin Dashboard**: For monitoring and fine-tuning the system

## Technical Architecture

The system consists of backend Python modules and frontend React components:

### Backend (Python)

- `rl_rewards/q_learning.py`: Core Q-learning implementation
- `rl_rewards/reward_service.py`: Service layer for the application
- `rl_rewards/simulator.py`: Simulation environment for training
- `rl_rewards/admin.py`: Admin functionality for monitoring
- `server/app.py`: Flask API endpoints

### Frontend (React)

- `src/components/DynamicRewards.js`: Component for displaying personalized rewards
- `src/components/RewardsMarketplace.js`: Integration with the rewards marketplace
- `src/components/RewardsAdmin.js`: Admin dashboard for the RL system
- `src/api/rewardsApi.js`: API client for communicating with the backend

## How It Works

1. **User Engagement Tracking**:
   - The system tracks key user actions: recycling, challenge completions, app usage
   - These metrics determine the user's "state" (low, medium, or high engagement)

2. **Reward Selection**:
   - Each user state has learned values for each reward type (Q-values)
   - The system selects the reward type with the highest Q-value for the user's current state
   - An exploration factor ensures the system occasionally tries different rewards

3. **Feedback Loop**:
   - The system observes how users respond to rewards
   - If a user increases sustainable actions after receiving a reward, the corresponding Q-value increases
   - Over time, the system learns the optimal reward strategy for each user segment

## Running the System

### Starting the Backend

1. Navigate to the server directory:
   ```bash
   cd c:\Users\Abhis\OneDrive\Desktop\WasteWise\server
   ```

2. Start the Flask server:
   ```bash
   python app.py
   ```

3. The API will be available at http://localhost:5000

### Training the Model

1. Train the model using simulated data:
   ```bash
   cd c:\Users\Abhis\OneDrive\Desktop\WasteWise
   python train_model.py
   ```

2. Alternatively, use the Admin UI to train the model through the browser

### Testing the API

Use the test script to verify the API is working:
```bash
python test_api.py
```

Or open the browser-based testing tool:
```
c:\Users\Abhis\OneDrive\Desktop\WasteWise\browser_test.html
```

## Admin Dashboard

The admin dashboard provides insights and control over the RL system:

1. **Overview**: See statistics about model performance and reward distribution
2. **Q-Table**: Examine the learned values for each state-action pair
3. **Training**: Train the model with custom parameters

Access the admin dashboard at: http://localhost:3000/rewards-admin

## Customization

### Reward Types

To add new reward types:

1. Add the new reward to the `actions` list in `q_learning.py`
2. Add reward generation logic in `reward_service.py`'s `_generate_reward_details` method 
3. Add UI rendering for the new reward type in `DynamicRewards.js`

### User States

To modify user state classification:

1. Edit the `get_state` method in `q_learning.py`
2. Adjust thresholds or add new metrics as needed

## Troubleshooting

### API Connection Issues

If the frontend can't connect to the API:

1. Ensure the Flask server is running
2. Check that CORS is enabled
3. Verify the API_BASE_URL in rewardsApi.js is correct

### Model Training Issues

If the model isn't learning effectively:

1. Adjust learning parameters (alpha, gamma, epsilon) in q_learning.py
2. Increase the number of episodes during training
3. Check the reward function to ensure it correctly incentivizes desired behavior

## Further Development

Potential enhancements:

1. **User Segmentation**: Add more sophisticated user state determination
2. **Multi-armed Bandit**: Implement contextual bandits for faster learning
3. **Deep Q-Learning**: Scale to more complex state representations
4. **A/B Testing**: Compare RL rewards with fixed reward strategies