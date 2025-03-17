# filepath: c:\Users\Abhis\OneDrive\Desktop\WasteWise\rl_rewards\reward_service.py
from .q_learning import RewardQLearning
import logging
from datetime import datetime

class RewardService:
    """
    Service to integrate Q-learning with the application's reward system.
    Handles:
    - Tracking user actions
    - Determining and providing rewards
    - Collecting feedback on reward effectiveness
    """
    
    def __init__(self):
        self.rl_model = RewardQLearning()
        self.logger = logging.getLogger(__name__)
        
    def track_user_action(self, user_id, action_type, action_data):
        """
        Track a user action and store it for later use in RL
        
        Parameters:
        - user_id: Unique identifier for the user
        - action_type: Type of action (recycling, challenge_completion, etc.)
        - action_data: Additional data about the action
        """
        # This would typically store the data in a database
        # For now, we'll just log it
        self.logger.info(f"Tracked action: {action_type} by user {user_id}")
        self.logger.debug(f"Action data: {action_data}")
        
        # In a real implementation, you would store this data and later
        # use it to determine state transitions and rewards
        
    def get_recommended_reward(self, user_data):
        """
        Get the recommended reward type for a user based on their data
        
        Parameters:
        - user_data: Dictionary containing user engagement metrics
        
        Returns:
        - reward_type: The type of reward to offer (points, badges, etc.)
        - reward_details: Additional details about the reward
        """
        reward_type = self.rl_model.get_best_reward(user_data)
        
        # Generate appropriate reward details based on the type
        reward_details = self._generate_reward_details(reward_type)
        
        self.logger.info(f"Recommended reward: {reward_type}")
        return reward_type, reward_details
    
    def _generate_reward_details(self, reward_type):
        """
        Generate specific reward details based on the reward type
        """
        details = {
            'timestamp': datetime.now().isoformat(),
            'expires_in_days': 7  # Default expiration
        }
        
        if reward_type == 'points':
            details['amount'] = 50
            details['description'] = "Bonus eco-points for your sustainable actions!"
            
        elif reward_type == 'badges':
            details['badge_name'] = "Earth Protector"
            details['description'] = "You've unlocked a new sustainability badge!"
            details['image_url'] = "/static/images/badges/earth-protector.png"
            
        elif reward_type == 'discounts':
            details['amount'] = "15%"
            details['description'] = "Get 15% off at partner eco-friendly stores!"
            details['partner_stores'] = ["EcoStore", "GreenMarket", "SustainableGoods"]
            
        elif reward_type == 'social_recognition':
            details['description'] = "Your efforts have been featured on our community board!"
            details['visibility'] = "all_users"
            
        return details
    
    def record_reward_outcome(self, user_id, reward_type, state_before, state_after, actions_before, actions_after):
        """
        Record the outcome of a reward to update the Q-learning model
        
        Parameters:
        - user_id: The user who received the reward
        - reward_type: The type of reward given
        - state_before: User state before the reward
        - state_after: User state after the reward
        - actions_before: Count of sustainable actions before reward
        - actions_after: Count of sustainable actions after reward
        """
        # Calculate the reward (the RL reward, not the user reward)
        # Based on increase in sustainable actions
        reward = actions_after - actions_before
        
        # Update the Q-table
        self.rl_model.update_q_value(state_before, reward_type, reward, state_after)
        
        # Save the updated model
        self.rl_model.save_model()
        
        self.logger.info(f"Updated Q-values for user {user_id}, reward: {reward}")
    
    def get_model_stats(self):
        """
        Get statistics about the RL model's performance
        """
        return self.rl_model.stats