from rl_rewards.simulator import RewardSimulator
import os
import argparse

def train_model(num_users=100, episodes=500, verbose=True):
    """Train the RL model using simulation"""
    if verbose:
        print("Training the RL model...")
        print(f"- Number of simulated users: {num_users}")
        print(f"- Training episodes: {episodes}")
        
    # Create data directory if it doesn't exist
    os.makedirs('data', exist_ok=True)
    
    # Initialize and run simulator
    simulator = RewardSimulator(num_users=num_users)
    results = simulator.run_simulation(episodes=episodes)
    
    if verbose:
        print("\nTraining complete!")
        print(f"Model saved to: {simulator.rl_model.model_path}")
        print("\nFinal Q-table:")
        print(simulator.rl_model.q_table)
        
        # Show reward effectiveness
        print("\nReward effectiveness by user state:")
        for state in simulator.rl_model.states:
            best_action = simulator.rl_model.q_table.loc[state].idxmax()
            best_value = simulator.rl_model.q_table.loc[state, best_action]
            print(f"- {state}: {best_action} (Q-value: {best_value:.2f})")
    
    return simulator

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Train the WasteWise RL rewards model')
    parser.add_argument('--users', type=int, default=100, help='Number of simulated users')
    parser.add_argument('--episodes', type=int, default=500, help='Number of training episodes')
    parser.add_argument('--quiet', action='store_true', help='Suppress output')
    
    args = parser.parse_args()
    
    simulator = train_model(
        num_users=args.users, 
        episodes=args.episodes,
        verbose=not args.quiet
    )
    
    # Optionally plot results if not in quiet mode
    if not args.quiet:
        try:
            simulator.plot_results()
        except Exception as e:
            print(f"Could not display plots: {e}")
            print("Training was successful, but visualization requires matplotlib in a graphical environment.")
