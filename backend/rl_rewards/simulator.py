# filepath: c:\Users\Abhis\OneDrive\Desktop\WasteWise\rl_rewards\simulator.py
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from .q_learning import RewardQLearning
import random
from tqdm import tqdm

class RewardSimulator:
    """
    Simulator for training and evaluating the RL reward system
    without needing real user data.
    """
    
    def __init__(self, num_users=100):
        self.num_users = num_users
        self.rl_model = RewardQLearning()
        
        # Generate simulated users with different characteristics
        self.users = self._generate_users()
        
        # Simulation results
        self.results = {
            'iterations': [],
            'average_engagement': [],
            'reward_effectiveness': {}
        }
        
    def _generate_users(self):
        """Generate simulated user profiles"""
        users = []
        
        for i in range(self.num_users):
            # Create users with varying baseline characteristics
            user = {
                'id': f"user_{i}",
                'baseline_engagement': random.uniform(0.1, 0.9),
                'responsiveness': {
                    'points': random.uniform(0.1, 0.9),
                    'badges': random.uniform(0.1, 0.9),
                    'discounts': random.uniform(0.1, 0.9),
                    'social_recognition': random.uniform(0.1, 0.9)
                },
                'current_state': random.choice(['low_engagement', 'medium_engagement', 'high_engagement']),
                'action_history': {
                    'recycling_count': random.randint(0, 20),
                    'challenge_completions': random.randint(0, 10),
                    'login_frequency': random.randint(0, 30)
                }
            }
            users.append(user)
        
        return users
    
    def _simulate_user_response(self, user, reward_type):
        """Simulate how a user responds to a specific reward type"""
        # Base response is influenced by the user's responsiveness to this reward type
        response = user['responsiveness'][reward_type]
        
        # Add some randomness
        response += random.uniform(-0.1, 0.1)
        
        # Ensure response is in valid range
        response = max(0, min(1, response))
        
        return response
    
    def _update_user_state(self, user, reward_type, response):
        """Update user state based on their response to a reward"""
        # Increase action counts based on response
        recycling_increase = int(response * 10)
        challenge_increase = int(response * 5)
        login_increase = int(response * 7)
        
        user['action_history']['recycling_count'] += recycling_increase
        user['action_history']['challenge_completions'] += challenge_increase
        user['action_history']['login_frequency'] += login_increase
        
        # Determine new state
        old_state = user['current_state']
        user['current_state'] = self.rl_model.get_state(user['action_history'])
        
        # Calculate RL reward (improvement in sustainable actions)
        rl_reward = recycling_increase + challenge_increase * 2 + login_increase
        
        return old_state, user['current_state'], rl_reward
    
    def run_simulation(self, episodes=1000):
        """Run a simulation to train the RL model"""
        progress_bar = tqdm(total=episodes, desc="Training RL Model")
        
        for episode in range(episodes):
            # Track episode metrics
            episode_rewards = 0
            episode_engagement_change = 0
            reward_counts = {'points': 0, 'badges': 0, 'discounts': 0, 'social_recognition': 0}
            reward_effectiveness = {'points': 0, 'badges': 0, 'discounts': 0, 'social_recognition': 0}
            
            # For each episode, iterate through all users
            for user in self.users:
                # Get current state
                state = user['current_state']
                
                # Choose a reward based on current policy
                reward_type = self.rl_model.choose_action(state)
                reward_counts[reward_type] += 1
                
                # Simulate user response to this reward
                response = self._simulate_user_response(user, reward_type)
                
                # Update user state based on response
                old_state, new_state, rl_reward = self._update_user_state(user, reward_type, response)
                
                # Update Q-values based on the reward obtained
                self.rl_model.update_q_value(old_state, reward_type, rl_reward, new_state)
                
                # Track metrics
                episode_rewards += rl_reward
                episode_engagement_change += response
                reward_effectiveness[reward_type] += rl_reward
            
            # Normalize reward effectiveness
            for reward_type in reward_effectiveness:
                if reward_counts[reward_type] > 0:
                    reward_effectiveness[reward_type] /= reward_counts[reward_type]
            
            # Store results
            self.results['iterations'].append(episode)
            self.results['average_engagement'].append(episode_engagement_change / self.num_users)
            
            for reward_type in reward_effectiveness:
                if reward_type not in self.results['reward_effectiveness']:
                    self.results['reward_effectiveness'][reward_type] = []
                self.results['reward_effectiveness'][reward_type].append(reward_effectiveness[reward_type])
            
            # Save model every 100 episodes
            if episode % 100 == 0:
                self.rl_model.save_model()
                
            progress_bar.update(1)
            
        progress_bar.close()
        # Final save
        self.rl_model.save_model()
        return self.results
    
    def plot_results(self):
        """Plot the simulation results"""
        plt.figure(figsize=(15, 10))
        
        # Plot average engagement
        plt.subplot(2, 1, 1)
        plt.plot(self.results['iterations'], self.results['average_engagement'])
        plt.title('Average User Engagement Over Time')
        plt.xlabel('Episode')
        plt.ylabel('Avg. Engagement Change')
        plt.grid(True)
        
        # Plot reward effectiveness
        plt.subplot(2, 1, 2)
        for reward_type, values in self.results['reward_effectiveness'].items():
            plt.plot(self.results['iterations'], values, label=reward_type)
        
        plt.title('Reward Effectiveness Over Time')
        plt.xlabel('Episode')
        plt.ylabel('Effectiveness')
        plt.legend()
        plt.grid(True)
        
        plt.tight_layout()
        plt.show()