# filepath: c:\Users\Abhis\OneDrive\Desktop\WasteWise\demo_rl_rewards.py
from rl_rewards.simulator import RewardSimulator
from rl_rewards.admin import RLAdmin
from rl_rewards.reward_service import RewardService
import matplotlib.pyplot as plt

def train_model():
    """Train the RL model using the simulator"""
    print("Training the RL model...")
    simulator = RewardSimulator(num_users=100)
    results = simulator.run_simulation(episodes=500)
    simulator.plot_results()
    return simulator

def test_reward_recommendations():
    """Test the reward recommendation system"""
    print("\nTesting reward recommendations for different user profiles...")
    reward_service = RewardService()
    
    # Test low engagement user
    low_user = {
        'recycling_count': 2,
        'challenge_completions': 1,
        'login_frequency': 3
    }
    
    # Test medium engagement user
    medium_user = {
        'recycling_count': 7,
        'challenge_completions': 4,
        'login_frequency': 12
    }
    
    # Test high engagement user
    high_user = {
        'recycling_count': 15,
        'challenge_completions': 8,
        'login_frequency': 25
    }
    
    # Get and print recommendations
    for user_type, user_data in [
        ("Low engagement", low_user),
        ("Medium engagement", medium_user),
        ("High engagement", high_user)
    ]:
        reward_type, reward_details = reward_service.get_recommended_reward(user_data)
        print(f"\n{user_type} user:")
        print(f"  Recommended reward: {reward_type}")
        print(f"  Details: {reward_details}")

def view_admin_dashboard():
    """Display admin dashboard information"""
    print("\nAdmin Dashboard Information:")
    admin = RLAdmin()
    
    # Display Q-table
    print("\nCurrent Q-table:")
    print(admin.get_q_table())
    
    # Display stats
    print("\nModel statistics:")
    stats = admin.get_stats()
    print(f"  Iterations: {stats['iterations']}")
    print(f"  Total rewards: {stats['total_rewards']}")
    print(f"  Last updated: {stats['last_updated']}")
    
    # Generate and save visualizations
    print("\nGenerating visualizations...")
    heatmap = admin.generate_q_table_heatmap()
    reward_history = admin.generate_reward_history_chart()
    action_dist = admin.generate_action_distribution_chart()
    
    print("Visualizations would be displayed in the actual admin dashboard.")

def main():
    """Main function to demonstrate the RL rewards system"""
    print("=== WasteWise Reinforcement Learning for Dynamic Rewards Optimization ===\n")
    
    # First train the model
    simulator = train_model()
    
    # Test reward recommendations
    test_reward_recommendations()
    
    # View admin dashboard
    view_admin_dashboard()
    
    print("\nDemo completed! The RL system is now ready to be integrated with the WasteWise application.")

if __name__ == "__main__":
    main()