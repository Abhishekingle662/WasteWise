import requests
import json
import sys
import traceback

BASE_URL = "http://localhost:5000"

def check_server_status():
    """Check if the server is running by making a request to the root URL"""
    try:
        print(f"Connecting to {BASE_URL}...")
        response = requests.get(BASE_URL, timeout=5)
        print(f"Server status: {response.status_code}")
        print(f"Server response: {response.text}")
        return response.status_code == 200
    except requests.exceptions.ConnectionError as e:
        print(f"ERROR: Cannot connect to {BASE_URL}")
        print(f"Connection error details: {e}")
        print("\nMake sure the Flask server is running.")
        print("Also check if the port is correct and not blocked by a firewall.")
        return False
    except Exception as e:
        print(f"ERROR: {str(e)}")
        traceback.print_exc()
        return False

def test_recommendation():
    user_id = "test_user_123"
    # Test GET request
    print("\nTesting GET request for recommend endpoint:")
    url = f"{BASE_URL}/api/rewards/recommend/{user_id}?recycling_count=10&challenge_completions=5&login_frequency=15"
    print(f"GET URL: {url}")
    
    try:
        response = requests.get(url)
        print(f"GET Status code: {response.status_code}")
        print(f"Response headers: {response.headers}")
        
        if response.status_code == 200:
            print("Recommendation Response (GET):")
            print(json.dumps(response.json(), indent=2))
        else:
            print(f"Error response text: {response.text}")
    except Exception as e:
        print(f"Exception in GET request: {str(e)}")
        traceback.print_exc()
    
    # Test POST request
    print("\nTesting POST request for recommend endpoint:")
    url = f"{BASE_URL}/api/rewards/recommend/{user_id}"
    data = {
        "recycling_count": 10,
        "challenge_completions": 5,
        "login_frequency": 15
    }
    print(f"POST URL: {url}")
    print(f"POST data: {data}")
    
    try:
        response = requests.post(url, json=data)
        print(f"POST Status code: {response.status_code}")
        
        if response.status_code == 200:
            print("Recommendation Response (POST):")
            print(json.dumps(response.json(), indent=2))
        else:
            print(f"Error response text: {response.text}")
    except Exception as e:
        print(f"Exception in POST request: {str(e)}")
        traceback.print_exc()

def test_track_action():
    # Test both GET and POST methods
    
    # Test GET (simple debug testing)
    print("\nTesting GET request for track endpoint:")
    url = f"{BASE_URL}/api/rewards/track?userId=test_user_123&actionType=recycling"
    print(f"GET URL: {url}")
    
    try:
        response = requests.get(url)
        print(f"GET Status code: {response.status_code}")
        
        if response.status_code == 200:
            print("Track Action Response (GET):")
            print(json.dumps(response.json(), indent=2))
        else:
            print(f"Error response text: {response.text}")
    except Exception as e:
        print(f"Exception in GET request: {str(e)}")
        traceback.print_exc()
    
    # Test POST (proper method)
    print("\nTesting POST request for track endpoint:")
    url = f"{BASE_URL}/api/rewards/track"
    data = {
        "userId": "test_user_123",
        "actionType": "recycling",
        "actionData": {
            "item": "plastic_bottle",
            "count": 3
        }
    }
    print(f"POST URL: {url}")
    print(f"POST data: {json.dumps(data, indent=2)}")
    
    try:
        response = requests.post(url, json=data)
        print(f"POST Status code: {response.status_code}")
        
        if response.status_code == 200:
            print("Track Action Response (POST):")
            print(json.dumps(response.json(), indent=2))
        else:
            print(f"Error response text: {response.text}")
    except Exception as e:
        print(f"Exception in POST request: {str(e)}")
        traceback.print_exc()

def test_outcome():
    # Test both GET and POST methods
    
    # Test GET (simple debug testing)
    print("\nTesting GET request for outcome endpoint:")
    url = f"{BASE_URL}/api/rewards/outcome?userId=test_user_123&rewardType=points&actionsBefore=5&actionsAfter=10"
    print(f"GET URL: {url}")
    
    try:
        response = requests.get(url)
        print(f"GET Status code: {response.status_code}")
        
        if response.status_code == 200:
            print("Outcome Response (GET):")
            print(json.dumps(response.json(), indent=2))
        else:
            print(f"Error response text: {response.text}")
    except Exception as e:
        print(f"Exception in GET request: {str(e)}")
        traceback.print_exc()
    
    # Test POST (proper method)
    print("\nTesting POST request for outcome endpoint:")
    url = f"{BASE_URL}/api/rewards/outcome"
    data = {
        "userId": "test_user_123",
        "rewardType": "points",
        "stateBefore": "low_engagement",
        "stateAfter": "medium_engagement",
        "actionsBefore": 5,
        "actionsAfter": 10
    }
    print(f"POST URL: {url}")
    print(f"POST data: {json.dumps(data, indent=2)}")
    
    try:
        response = requests.post(url, json=data)
        print(f"POST Status code: {response.status_code}")
        
        if response.status_code == 200:
            print("Outcome Response (POST):")
            print(json.dumps(response.json(), indent=2))
        else:
            print(f"Error response text: {response.text}")
    except Exception as e:
        print(f"Exception in POST request: {str(e)}")
        traceback.print_exc()

if __name__ == "__main__":
    print("Testing WasteWise RL API...")
    if check_server_status():
        print("\n1. Testing recommendation API...")
        test_recommendation()
        
        print("\n2. Testing action tracking API...")
        test_track_action()
        
        print("\n3. Testing outcome recording API...")
        test_outcome()
    else:
        print("\nServer check failed. Follow these steps to start the server:")
        print("1. Open a command prompt/terminal")
        print("2. Navigate to the server directory:")
        print("   cd c:\\Users\\Abhis\\OneDrive\\Desktop\\WasteWise\\server")
        print("3. Run the Flask application:")
        print("   python app.py")
        print("4. Once the server is running, try this test again")
        sys.exit(1)
