const DynamicRewardsSystem = require('./DynamicRewardsSystem');

// Example usage
function demonstrateRewardsSystem() {
  const rewardsSystem = new DynamicRewardsSystem();
  const userId = 'user123';
  
  // Set user preferences
  console.log("Setting user preferences...");
  rewardsSystem.setUserPreferences({
    preferredRewardTypes: ['recycling', 'composting'],
    sustainabilityFocus: 'waste_reduction'
  });
  
  // Start a seasonal challenge
  const currentSeason = rewardsSystem.getCurrentSeason();
  const challenge = rewardsSystem.startSeasonalChallenge(currentSeason);
  if (challenge) {
    console.log(`Started ${challenge.theme} challenge with ${challenge.multiplier}x rewards!`);
  }
  
  // User recycles something with contextual information
  console.log("\nUser recycled at a recycling center on a rainy day!");
  const recycleReward = rewardsSystem.calculateReward('recycling', {
    location: 'recyclingCenter',
    weather: 'rainy',
    friendsParticipating: 2,
    shared: true
  });
  console.log(`Earned ${recycleReward} points for recycling`);
  
  // Update streak for continued engagement
  const streak = rewardsSystem.updateStreak();
  console.log(`Current streak: ${streak} days`);
  
  // User composts something (different action type creates combo)
  console.log("\nUser composted organic waste the next day!");
  const compostReward = rewardsSystem.calculateReward('composting', {
    location: 'home',
    weather: 'sunny'
  });
  console.log(`Earned ${compostReward} points for composting (with combo multiplier)`);
  
  // User takes educational action (continuing the combo)
  console.log("\nUser completed a sustainability course!");
  const educationReward = rewardsSystem.calculateReward('education', {
    location: 'school'
  });
  console.log(`Earned ${educationReward} points for education (with increased combo)`);
  
  // Check for surprise rewards
  const surprise = rewardsSystem.getSurpriseReward();
  if (surprise) {
    console.log(`\nSURPRISE! ${surprise.description}`);
  }
  
  // User levels up based on actions
  const levelInfo = rewardsSystem.updateUserLevel(150);
  if (levelInfo.levelUp) {
    console.log(`\nCongratulations! You've reached level ${levelInfo.newLevel}!`);
  }
  
  // Start a special event occasionally
  if (Math.random() > 0.8) {
    const event = rewardsSystem.startSpecialEvent(2); // 2 hour special event
    console.log(`\nSpecial event started! ${event.multiplier}x rewards for ${event.duration} hours!`);
  }
  
  // Get insights about user's actions
  console.log("\nGenerating user insights...");
  const insights = rewardsSystem.getActionInsights();
  console.log("User Action Insights:", JSON.stringify(insights, null, 2));
  
  // Deliver the reward to the user with context
  const deliveryResult = rewardsSystem.deliverReward(userId, 'recycling', recycleReward, {
    location: 'recyclingCenter',
    weather: 'rainy',
    friendsParticipating: 2,
    shared: true
  });
  console.log(`\n${deliveryResult.message}`);
  
  // Display additional reward information
  if (deliveryResult.reward.achievement) {
    console.log(`Achievement unlocked: Level ${deliveryResult.reward.achievement.level} in ${deliveryResult.reward.achievement.actionType}!`);
  }
  
  if (deliveryResult.reward.combo) {
    console.log(deliveryResult.reward.combo.description);
  }
  
  if (deliveryResult.reward.seasonalChallenge) {
    console.log(`Part of the ${deliveryResult.reward.seasonalChallenge.theme} challenge!`);
  }
  
  // Later, user claims the reward
  const rewardId = deliveryResult.reward.id;
  const claimResult = rewardsSystem.claimReward(userId, rewardId);
  console.log(`\nClaim status: ${claimResult.success ? 'Success' : 'Failed'}`);
}

demonstrateRewardsSystem();
