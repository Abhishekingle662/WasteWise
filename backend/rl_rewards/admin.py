# filepath: c:\Users\Abhis\OneDrive\Desktop\WasteWise\rl_rewards\admin.py
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from io import BytesIO
import base64
from .q_learning import RewardQLearning
from .reward_service import RewardService

class RLAdmin:
    """
    Admin interface for monitoring and configuring the RL reward system
    """
    
    def __init__(self):
        self.rl_model = RewardQLearning()
        self.reward_service = RewardService()
    
    def get_q_table(self):
        """Return the current Q-table"""
        return self.rl_model.q_table
    
    def get_q_table_html(self):
        """Return the Q-table as HTML for display"""
        return self.rl_model.q_table.to_html(classes='table table-striped table-hover')
    
    def get_stats(self):
        """Return statistics about the RL model"""
        return self.reward_service.get_model_stats()
    
    def generate_q_table_heatmap(self):
        """Generate a heatmap visualization of the Q-table"""
        plt.figure(figsize=(10, 8))
        sns.heatmap(self.rl_model.q_table, annot=True, cmap="YlGnBu", fmt=".2f")
        plt.title("Q-values Heatmap")
        plt.ylabel("States")
        plt.xlabel("Actions")
        
        # Save the plot to a bytes buffer
        buffer = BytesIO()
        plt.savefig(buffer, format='png')
        buffer.seek(0)
        image_png = buffer.getvalue()
        buffer.close()
        
        # Encode the image to base64
        graphic = base64.b64encode(image_png).decode('utf-8')
        return f"data:image/png;base64,{graphic}"
    
    def generate_reward_history_chart(self):
        """Generate a chart of reward history over time"""
        stats = self.rl_model.stats
        if len(stats['reward_history']) < 2:
            return None
            
        plt.figure(figsize=(12, 6))
        plt.plot(stats['reward_history'], marker='o', linestyle='-')
        plt.title("Reward History")
        plt.xlabel("Iteration")
        plt.ylabel("Reward")
        plt.grid(True)
        
        # Save the plot to a bytes buffer
        buffer = BytesIO()
        plt.savefig(buffer, format='png')
        buffer.seek(0)
        image_png = buffer.getvalue()
        buffer.close()
        
        # Encode the image to base64
        graphic = base64.b64encode(image_png).decode('utf-8')
        return f"data:image/png;base64,{graphic}"
    
    def generate_action_distribution_chart(self):
        """Generate a chart showing the distribution of actions taken"""
        stats = self.rl_model.stats
        if len(stats['action_history']) < 1:
            return None
            
        action_counts = pd.Series(stats['action_history']).value_counts()
        
        plt.figure(figsize=(10, 6))
        sns.barplot(x=action_counts.index, y=action_counts.values)
        plt.title("Action Distribution")
        plt.xlabel("Action")
        plt.ylabel("Count")
        
        # Save the plot to a bytes buffer
        buffer = BytesIO()
        plt.savefig(buffer, format='png')
        buffer.seek(0)
        image_png = buffer.getvalue()
        buffer.close()
        
        # Encode the image to base64
        graphic = base64.b64encode(image_png).decode('utf-8')
        return f"data:image/png;base64,{graphic}"
    
    def update_rl_parameters(self, alpha=None, gamma=None, epsilon=None):
        """Update the parameters of the RL model"""
        if alpha is not None:
            self.rl_model.alpha = float(alpha)
        if gamma is not None:
            self.rl_model.gamma = float(gamma)
        if epsilon is not None:
            self.rl_model.epsilon = float(epsilon)
        
        # Save the updated model
        self.rl_model.save_model()
        return True