import numpy as np
import pandas as pd
from datetime import datetime
import pickle
import os

class RewardQLearning:
    """
    Q-learning model for optimizing user rewards in sustainability actions.
    
    States: Different user segments or behavior patterns
    Actions: Different types of rewards (points, badges, discounts)
    Rewards: Measured by increase in sustainable actions after a reward
    """
    
    def __init__(self, 
                 states=['low_engagement', 'medium_engagement', 'high_engagement'],
                 actions=['points', 'badges', 'discounts', 'social_recognition'],
                 alpha=0.1,  # Learning rate
                 gamma=0.8,  # Discount factor
                 epsilon=0.2,  # Exploration rate
                 model_path=None):
        self.states = states
        self.actions = actions
        self.alpha = alpha
        self.gamma = gamma
        self.epsilon = epsilon
        
        # Set up model path in the data directory
        if model_path is None:
            self.model_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data', 'rl_model.pkl')
        else:
            self.model_path = model_path
        
        # Create data directory if it doesn't exist
        os.makedirs(os.path.dirname(self.model_path), exist_ok=True)
        
        # Initialize Q-table with zeros
        self.q_table = pd.DataFrame(0, index=states, columns=actions)
        
        # Load existing model if it exists
        self.load_model()
        
        # Track statistics
        self.stats = {
            'iterations': 0,
            'total_rewards': 0,
            'action_history': [],
            'reward_history': [],
            'last_updated': datetime.now().isoformat()
        }
    
    def get_state(self, user_data):
        """
        Determine the state based on user engagement data
        """
        recycling_count = user_data.get('recycling_count', 0)
        challenge_completions = user_data.get('challenge_completions', 0)
        login_frequency = user_data.get('login_frequency', 0)
        
        # Simple state determination logic - can be made more sophisticated
        engagement_score = recycling_count + challenge_completions*2 + login_frequency
        
        if engagement_score < 5:
            return 'low_engagement'
        elif engagement_score < 15:
            return 'medium_engagement'
        else:
            return 'high_engagement'
    
    def choose_action(self, state):
        """
        Choose an action using epsilon-greedy strategy
        """
        # Exploration
        if np.random.uniform(0, 1) < self.epsilon:
            return np.random.choice(self.actions)
        
        # Exploitation (choose best action based on Q-values)
        return self.q_table.loc[state].idxmax()
    
    def update_q_value(self, state, action, reward, next_state):
        """
        Update Q-value for a state-action pair using the Q-learning formula
        """
        # Q(s,a) = Q(s,a) + alpha * (reward + gamma * max(Q(s',a')) - Q(s,a))
        current_q = self.q_table.loc[state, action]
        max_future_q = self.q_table.loc[next_state].max()
        
        new_q = current_q + self.alpha * (reward + self.gamma * max_future_q - current_q)
        self.q_table.loc[state, action] = new_q
        
        # Update stats
        self.stats['iterations'] += 1
        self.stats['total_rewards'] += reward
        self.stats['action_history'].append(action)
        self.stats['reward_history'].append(reward)
        self.stats['last_updated'] = datetime.now().isoformat()
        
        return new_q
    
    def save_model(self):
        """
        Save the Q-table and stats to a file
        """
        with open(self.model_path, 'wb') as f:
            pickle.dump({'q_table': self.q_table, 'stats': self.stats}, f)
    
    def load_model(self):
        """
        Load the Q-table and stats from a file if it exists
        """
        if os.path.exists(self.model_path):
            try:
                with open(self.model_path, 'rb') as f:
                    data = pickle.load(f)
                    self.q_table = data['q_table']
                    self.stats = data['stats']
                return True
            except Exception as e:
                print(f"Error loading model: {e}")
                return False
        return False
    
    def get_best_reward(self, user_data):
        """
        Get the best reward for a user based on their data
        """
        state = self.get_state(user_data)
        # During deployment in production, we may want to exploit more
        if np.random.uniform(0, 1) < self.epsilon / 2:  # Reduced exploration in production
            return np.random.choice(self.actions)
        return self.q_table.loc[state].idxmax()
