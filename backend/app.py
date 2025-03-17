from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os
import logging
from datetime import datetime  # Add missing datetime import for reset_model endpoint

# Configure logging
logging.basicConfig(level=logging.DEBUG, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Add the parent directory to sys.path to allow importing the rl_rewards package
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(parent_dir)
logger.info(f"Added to path: {parent_dir}")

try:
    from rl_rewards.reward_service import RewardService
    logger.info("Successfully imported RewardService")
except Exception as e:
    logger.error(f"Error importing RewardService: {str(e)}")
    raise

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the reward service
try:
    reward_service = RewardService()
    logger.info("Successfully initialized RewardService")
except Exception as e:
    logger.error(f"Error initializing RewardService: {str(e)}")
    raise

@app.route('/')
def index():
    return "WasteWise RL Rewards API is running. Available endpoints: /api/rewards/recommend/<user_id>, /api/rewards/track, /api/rewards/outcome"

@app.route('/api/rewards/recommend/<user_id>', methods=['GET', 'POST'])  # Allow both GET and POST
def get_recommended_reward(user_id):
    logger.info(f"Received {request.method} request for recommendations for user {user_id}")
    # Get user data from the database (in a real app)
    # For demo purposes, we're using mock data
    user_data = {
        'recycling_count': request.args.get('recycling_count', type=int, default=5),
        'challenge_completions': request.args.get('challenge_completions', type=int, default=3),
        'login_frequency': request.args.get('login_frequency', type=int, default=10)
    }
    
    # If it's a POST request, try to get data from the request body
    if request.method == 'POST' and request.json:
        for key in ['recycling_count', 'challenge_completions', 'login_frequency']:
            if key in request.json:
                user_data[key] = request.json[key]
    
    logger.debug(f"User data for recommendation: {user_data}")
    reward_type, reward_details = reward_service.get_recommended_reward(user_data)
    
    response_data = {
        'reward_type': reward_type,
        'reward_details': reward_details
    }
    logger.info(f"Sending recommendation response: {reward_type}")
    return jsonify(response_data)

@app.route('/api/rewards/track', methods=['GET', 'POST'])  # Allow both GET and POST for testing
def track_user_action():
    logger.info(f"Received {request.method} request for tracking user action")
    
    # Default data for GET requests (for testing)
    user_id = "test_user"
    action_type = "test_action"
    action_data = {"source": "test"}
    
    # If it's a POST request, get data from the request body
    if request.method == 'POST' and request.json:
        user_id = request.json.get('userId', user_id)
        action_type = request.json.get('actionType', action_type)
        action_data = request.json.get('actionData', action_data)
    
    # If it's a GET request, try to get data from query parameters
    else:
        user_id = request.args.get('userId', user_id)
        action_type = request.args.get('actionType', action_type)
    
    logger.info(f"Tracking action: {action_type} for user {user_id}")
    reward_service.track_user_action(user_id, action_type, action_data)
    
    return jsonify({'success': True})

@app.route('/api/rewards/outcome', methods=['GET', 'POST'])  # Allow both GET and POST for testing
def record_reward_outcome():
    logger.info(f"Received {request.method} request for recording reward outcome")
    
    # Default data for GET requests (for testing)
    user_id = "test_user"
    reward_type = "points"
    state_before = "low_engagement" 
    state_after = "medium_engagement"
    actions_before = 5
    actions_after = 8
    
    # If it's a POST request, get data from the request body
    if request.method == 'POST' and request.json:
        user_id = request.json.get('userId', user_id)
        reward_type = request.json.get('rewardType', reward_type)
        state_before = request.json.get('stateBefore', state_before)
        state_after = request.json.get('stateAfter', state_after)
        actions_before = request.json.get('actionsBefore', actions_before)
        actions_after = request.json.get('actionsAfter', actions_after)
    
    # If it's a GET request, try to get data from query parameters
    else:
        user_id = request.args.get('userId', user_id)
        reward_type = request.args.get('rewardType', reward_type)
        state_before = request.args.get('stateBefore', state_before)
        state_after = request.args.get('stateAfter', state_after)
        actions_before = request.args.get('actionsBefore', type=int, default=actions_before)
        actions_after = request.args.get('actionsAfter', type=int, default=actions_after)
    
    logger.info(f"Recording reward outcome for user {user_id}: {reward_type}")
    reward_service.record_reward_outcome(
        user_id, reward_type, state_before, state_after, actions_before, actions_after
    )
    
    return jsonify({'success': True})

# Admin endpoints for the RewardsAdmin component
@app.route('/admin/model-stats', methods=['GET'])
def get_model_stats():
    """Return statistics about the RL model's performance"""
    logger.info("Getting model statistics")
    
    try:
        stats = reward_service.get_model_stats()
        
        # Process stats to include reward counts
        reward_counts = {}
        if 'action_history' in stats:
            for action in stats['action_history']:
                if action not in reward_counts:
                    reward_counts[action] = 0
                reward_counts[action] += 1
        
        response_data = {
            'iterations': stats.get('iterations', 0),
            'total_rewards': stats.get('total_rewards', 0),
            'last_updated': stats.get('last_updated', ''),
            'reward_counts': reward_counts
        }
        
        return jsonify(response_data)
    except Exception as e:
        logger.error(f"Error getting model stats: {e}")
        return jsonify({
            'error': str(e)
        }), 500

@app.route('/admin/q-table', methods=['GET'])
def get_q_table():
    """Return the current Q-table"""
    logger.info("Getting Q-table")
    
    try:
        # Convert Q-table from pandas DataFrame to dictionary for JSON serialization
        q_table = reward_service.rl_model.q_table.to_dict('index')
        return jsonify(q_table)
    except Exception as e:
        logger.error(f"Error getting Q-table: {e}")
        return jsonify({
            'error': str(e)
        }), 500

@app.route('/admin/train-model', methods=['POST'])
def train_model():
    """Train the model using the simulator"""
    logger.info("Training model requested")
    
    try:
        from rl_rewards.simulator import RewardSimulator
        
        # Get training parameters from request
        data = request.json or {}
        num_users = data.get('num_users', 100)
        episodes = data.get('episodes', 200)
        
        logger.info(f"Training model with {num_users} users for {episodes} episodes")
        
        # Create and run simulator
        simulator = RewardSimulator(num_users=num_users)
        results = simulator.run_simulation(episodes=episodes)
        
        return jsonify({
            'success': True,
            'message': f'Model trained for {episodes} episodes',
            'final_q_table': simulator.rl_model.q_table.to_dict('index')
        })
    except Exception as e:
        logger.error(f"Error training model: {e}")
        return jsonify({
            'error': str(e)
        }), 500

@app.route('/admin/reset-model', methods=['POST'])
def reset_model():
    """Reset the RL model to initial state"""
    logger.info("Resetting model requested")
    
    try:
        # Reset the Q-table to zeros
        reward_service.rl_model.q_table.iloc[:, :] = 0
        
        # Reset stats
        reward_service.rl_model.stats = {
            'iterations': 0,
            'total_rewards': 0,
            'action_history': [],
            'reward_history': [],
            'last_updated': datetime.now().isoformat()
        }
        
        # Save the reset model
        reward_service.rl_model.save_model()
        
        return jsonify({
            'success': True,
            'message': 'Model reset successfully'
        })
    except Exception as e:
        logger.error(f"Error resetting model: {e}")
        return jsonify({
            'error': str(e)
        }), 500

if __name__ == '__main__':
    try:
        host = '0.0.0.0'  # Listen on all interfaces
        port = int(os.environ.get('PORT', 5000))
        logger.info(f"Starting server on {host}:{port}")
        app.run(host=host, port=port, debug=True)
    except Exception as e:
        logger.error(f"Error starting server: {e}")
