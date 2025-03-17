class DynamicRewardsSystem {
  constructor() {
    this.baseRewards = {
      recycling: 10,
      composting: 15,
      reducingWaste: 20,
      education: 5
    };
    
    this.userEngagement = 1.0; // Multiplier based on user engagement
    this.streakCount = 0;
    this.lastActionDate = null;
    this.userLevel = 1;
    this.specialEventActive = false;

    // Additional properties for enhanced dynamism
    this.seasonalChallenges = {
      spring: { active: this.isCurrentSeason('spring'), multiplier: 1.3, theme: 'Spring Cleaning' },
      summer: { active: this.isCurrentSeason('summer'), multiplier: 1.2, theme: 'Summer Sustainability' },
      fall: { active: this.isCurrentSeason('fall'), multiplier: 1.25, theme: 'Fall Harvest' },
      winter: { active: this.isCurrentSeason('winter'), multiplier: 1.4, theme: 'Winter Conservation' }
    };
    
    this.actionHistory = [];
    this.comboMultiplier = 1.0;
    this.lastActionType = null;
    this.achievementMilestones = {
      recycling: [10, 50, 100, 500, 1000],
      composting: [5, 25, 50, 200, 500],
      reducingWaste: [5, 20, 50, 100, 250],
      education: [3, 10, 25, 50, 100]
    };
    this.userAchievements = {
      recycling: 0,
      composting: 0,
      reducingWaste: 0,
      education: 0
    };
    this.socialMultipliers = {
      friendsParticipating: 1.0,
      sharesOnSocial: 1.0
    };
    this.userPreferences = {
      preferredRewardTypes: [],
      sustainabilityFocus: 'general'
    };
  }

  calculateReward(actionType, context = {}) {
    let reward = this.baseRewards[actionType] || 5;
    
    // Apply user level progression factor
    reward *= (1 + (this.userLevel * 0.1));
    
    // Apply streak bonuses
    if (this.streakCount > 5) {
      reward *= (1 + (this.streakCount * 0.02));
    }
    
    // Add randomization factor (±20%)
    const randomFactor = 0.8 + (Math.random() * 0.4);
    reward *= randomFactor;
    
    // Special event bonus
    if (this.specialEventActive) {
      reward *= 1.5;
    }
    
    // Time-based rewards (more points during off-peak hours)
    const hour = new Date().getHours();
    if (hour < 6 || hour > 22) {
      reward *= 1.25; // Night owl bonus
    }
    
    // Weekly bonus day
    const day = new Date().getDay();
    if (day === 3) { // Wednesday bonus
      reward *= 1.2;
    }

    // Apply seasonal challenge bonus if active
    const currentSeason = this.getCurrentSeason();
    if (this.seasonalChallenges[currentSeason].active) {
      reward *= this.seasonalChallenges[currentSeason].multiplier;
    }
    
    // Apply location-based modifier
    if (context.location) {
      reward *= this.getLocationMultiplier(context.location);
    }
    
    // Apply weather-based modifier
    if (context.weather) {
      reward *= this.getWeatherMultiplier(context.weather);
    }
    
    // Apply combo multiplier if actions are varied
    if (this.lastActionType && this.lastActionType !== actionType) {
      this.comboMultiplier += 0.1;
      this.comboMultiplier = Math.min(this.comboMultiplier, 2.0); // Cap at 2x
      reward *= this.comboMultiplier;
    } else {
      this.comboMultiplier = Math.max(1.0, this.comboMultiplier - 0.05);
    }
    
    // Apply social multipliers
    if (context.friendsParticipating) {
      this.socialMultipliers.friendsParticipating = 1.0 + (Math.min(context.friendsParticipating, 5) * 0.1);
      reward *= this.socialMultipliers.friendsParticipating;
    }
    
    if (context.shared) {
      this.socialMultipliers.sharesOnSocial = 1.2;
      reward *= this.socialMultipliers.sharesOnSocial;
    }
    
    // Adjust based on user preferences
    if (this.userPreferences.preferredRewardTypes.includes(actionType)) {
      reward *= 1.1;
    }
    
    // Track this action for achievement tracking
    this.trackAction(actionType);
    this.lastActionType = actionType;
    
    return Math.round(reward);
  }
  
  updateStreak(actionDate = new Date()) {
    const today = new Date().setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (!this.lastActionDate) {
      this.streakCount = 1;
    } else {
      const lastActionDay = new Date(this.lastActionDate).setHours(0, 0, 0, 0);
      
      if (lastActionDay === yesterday.getTime()) {
        this.streakCount += 1;
      } else if (lastActionDay !== today) {
        this.streakCount = 1;
      }
    }
    
    this.lastActionDate = actionDate;
    
    return this.streakCount;
  }
  
  startSpecialEvent(duration = 24) {
    this.specialEventActive = true;
    
    setTimeout(() => {
      this.specialEventActive = false;
    }, duration * 60 * 60 * 1000);
    
    return {
      active: true,
      multiplier: 1.5,
      duration: duration
    };
  }
  
  updateUserLevel(actions, threshold = 100) {
    if (actions >= this.userLevel * threshold) {
      this.userLevel += 1;
      return {
        newLevel: this.userLevel,
        levelUp: true
      };
    }
    
    return {
      newLevel: this.userLevel,
      levelUp: false
    };
  }
  
  getSurpriseReward() {
    // Random chance (10%) of getting a surprise bonus
    if (Math.random() < 0.1) {
      const surpriseTypes = [
        { type: 'double_points', duration: 1, description: 'Double points for 1 hour!' },
        { type: 'bonus_points', amount: 50, description: 'Bonus 50 points!' },
        { type: 'special_badge', id: 'surprise_' + Date.now(), description: 'Special recognition badge!' }
      ];
      
      const surprise = surpriseTypes[Math.floor(Math.random() * surpriseTypes.length)];
      return surprise;
    }
    
    return null;
  }
  
  deliverReward(userId, actionType, rewardPoints, context = {}) {
    // Create reward object
    const reward = {
      id: `reward_${Date.now()}`,
      userId: userId,
      actionType: actionType,
      points: rewardPoints,
      timestamp: new Date().toISOString(),
      claimed: false,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiration
      context: context
    };
    
    // Check for reward enhancements
    if (this.streakCount > 7) {
      reward.streakBonus = true;
      reward.streakCount = this.streakCount;
    }
    
    if (this.specialEventActive) {
      reward.eventBonus = true;
    }
    
    // Check for achievement unlocks
    const achievement = this.checkAchievements(actionType);
    if (achievement) {
      reward.achievement = achievement;
    }
    
    // Add seasonal challenge info if active
    const currentSeason = this.getCurrentSeason();
    if (this.seasonalChallenges[currentSeason].active) {
      reward.seasonalChallenge = {
        season: currentSeason,
        theme: this.seasonalChallenges[currentSeason].theme
      };
    }
    
    // Add combo information if applicable
    if (this.comboMultiplier > 1.0) {
      reward.combo = {
        multiplier: this.comboMultiplier,
        description: `${this.comboMultiplier.toFixed(1)}x Action Variety Bonus!`
      };
    }
    
    // In a real application, this would communicate with a backend API
    // to store the reward in the user's account
    console.log(`Reward delivered to user ${userId}:`, reward);
    
    return {
      success: true,
      reward: reward,
      message: `You earned ${rewardPoints} points for ${actionType}!`,
      notification: {
        title: 'Reward Earned!',
        body: `You just earned ${rewardPoints} points for ${actionType}.`
      }
    };
  }
  
  claimReward(userId, rewardId) {
    // In a real implementation, this would verify the reward exists
    // and hasn't been claimed yet, then mark it as claimed
    
    console.log(`User ${userId} claimed reward ${rewardId}`);
    
    return {
      success: true,
      message: 'Reward claimed successfully!',
      timestamp: new Date().toISOString()
    };
  }

  isCurrentSeason(season) {
    const month = new Date().getMonth();
    switch(season) {
      case 'spring': return month >= 2 && month <= 4;
      case 'summer': return month >= 5 && month <= 7;
      case 'fall': return month >= 8 && month <= 10;
      case 'winter': return month >= 11 || month <= 1;
      default: return false;
    }
  }
  
  getCurrentSeason() {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
  }
  
  getLocationMultiplier(location) {
    // Reward certain locations more to encourage recycling in underserved areas
    const locationMultipliers = {
      home: 1.0,
      work: 1.1,
      school: 1.2,
      publicSpace: 1.3,
      recyclingCenter: 1.5
    };
    return locationMultipliers[location] || 1.0;
  }
  
  getWeatherMultiplier(weather) {
    // Encourage recycling even in challenging weather conditions
    const weatherMultipliers = {
      sunny: 1.0,
      cloudy: 1.05,
      rainy: 1.2,
      snowy: 1.3,
      stormy: 1.5
    };
    return weatherMultipliers[weather] || 1.0;
  }
  
  trackAction(actionType) {
    if (this.userAchievements[actionType] !== undefined) {
      this.userAchievements[actionType]++;
      this.checkAchievements(actionType);
    }
    
    this.actionHistory.push({
      type: actionType,
      timestamp: new Date().toISOString()
    });
    
    // Limit history size to prevent memory issues
    if (this.actionHistory.length > 100) {
      this.actionHistory.shift();
    }
  }
  
  checkAchievements(actionType) {
    const count = this.userAchievements[actionType];
    const milestones = this.achievementMilestones[actionType];
    
    if (!milestones) return null;
    
    for (const milestone of milestones) {
      if (count === milestone) {
        return {
          type: 'achievement',
          actionType: actionType,
          level: milestones.indexOf(milestone) + 1,
          count: milestone,
          reward: {
            points: milestone * 5,
            badge: `${actionType}_level_${milestones.indexOf(milestone) + 1}`
          }
        };
      }
    }
    
    return null;
  }
  
  startSeasonalChallenge(season) {
    if (this.seasonalChallenges[season]) {
      this.seasonalChallenges[season].active = true;
      
      return {
        active: true,
        theme: this.seasonalChallenges[season].theme,
        multiplier: this.seasonalChallenges[season].multiplier,
        season: season
      };
    }
    
    return null;
  }
  
  setUserPreferences(preferences = {}) {
    if (preferences.preferredRewardTypes) {
      this.userPreferences.preferredRewardTypes = preferences.preferredRewardTypes;
    }
    
    if (preferences.sustainabilityFocus) {
      this.userPreferences.sustainabilityFocus = preferences.sustainabilityFocus;
    }
    
    return this.userPreferences;
  }
  
  getActionInsights() {
    const insights = {
      mostFrequent: this.getMostFrequentAction(),
      streakInfo: {
        current: this.streakCount,
        maxReached: Math.max(this.streakCount, this.getMaxHistoricalStreak())
      },
      lastActionTimestamp: this.lastActionDate,
      achievements: this.userAchievements,
      nextMilestones: this.getNextMilestones()
    };
    
    return insights;
  }
  
  getMostFrequentAction() {
    if (this.actionHistory.length === 0) return null;
    
    const counts = {};
    let maxAction = null;
    let maxCount = 0;
    
    for (const action of this.actionHistory) {
      if (!counts[action.type]) counts[action.type] = 0;
      counts[action.type]++;
      
      if (counts[action.type] > maxCount) {
        maxCount = counts[action.type];
        maxAction = action.type;
      }
    }
    
    return {
      actionType: maxAction,
      count: maxCount
    };
  }
  
  getMaxHistoricalStreak() {
    // Placeholder for a more complex implementation that would
    // analyze the actionHistory to find max streak
    return this.streakCount;
  }
  
  getNextMilestones() {
    const nextMilestones = {};
    
    for (const [action, count] of Object.entries(this.userAchievements)) {
      const milestones = this.achievementMilestones[action];
      if (!milestones) continue;
      
      const next = milestones.find(m => m > count);
      if (next) {
        nextMilestones[action] = {
          current: count,
          next: next,
          progress: Math.round((count / next) * 100)
        };
      }
    }
    
    return nextMilestones;
  }
}

module.exports = DynamicRewardsSystem;
