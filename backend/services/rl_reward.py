import logging

logger = logging.getLogger(__name__)

class RewardSystem:
    """
    Reinforcement Learning Reward System for waste management actions
    """
    
    def __init__(self):
        logger.info("Initializing Reward System")
        # Add any initialization parameters here
        
    def calculate_reward(self, data):
        """
        Calculate reward based on user action data
        
        Args:
            data (dict): Dictionary containing user action data
            
        Returns:
            dict: Reward information including points and messages
        """
        logger.info(f"Calculating reward for data: {data}")
        
        # Basic implementation - customize based on your RL model
        try:
            # Extract relevant information from data
            action_type = data.get('action_type', '')
            waste_type = data.get('waste_type', '')
            quantity = data.get('quantity', 1)
            
            # Simple reward calculation logic
            base_points = self._get_base_points(action_type, waste_type)
            total_points = base_points * quantity
            
            return {
                'points': total_points,
                'message': f"Congratulations! You've earned {total_points} points for your {action_type}.",
                'status': 'success'
            }
        except Exception as e:
            logger.error(f"Error calculating reward: {str(e)}")
            return {
                'points': 0,
                'message': "Sorry, there was an error calculating your reward.",
                'status': 'error'
            }
    
    def _get_base_points(self, action_type, waste_type):
        """Helper method to determine base points for different actions and waste types"""
        # Define your point system here
        action_points = {
            'recycle': 10,
            'compost': 15,
            'reuse': 20,
            'reduce': 25
        }
        
        waste_multipliers = {
            'plastic': 1.2,
            'paper': 1.0,
            'glass': 1.5,
            'metal': 2.0,
            'organic': 1.3,
            'electronic': 3.0
        }
        
        base = action_points.get(action_type.lower(), 5)
        multiplier = waste_multipliers.get(waste_type.lower(), 1.0)
        
        return base * multiplier
