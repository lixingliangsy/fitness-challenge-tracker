
// pages/api/features.js
// Features API

export default function handler(req, res) {
  res.status(200).json({
    product: 'fitness-challenge-tracker',
    version: '1.0.0',
    features: [
      {
        id: 'feature_001',
        name: 'Challenge CRUD',
        status: 'implemented',
        description: 'Create, read, update, and delete fitness challenges. Supports custom duration, difficulty, and category.',
        endpoints: ['/api/challenges (GET, POST)', '/api/challenges/:id (GET, PUT, DELETE)']
      },
      {
        id: 'feature_002',
        name: 'Progress Tracking (Progress tracking)',
        status: 'implemented',
        description: 'Track daily completion, display progress bar and statistics. Includes streak tracking and completion rate.',
        endpoints: ['/api/progress (GET, POST)']
      },
      {
        id: 'feature_003',
        name: 'Social Sharing',
        status: 'implemented',
        description: 'Share challenge progress, invite friends, comment on posts, and like others\' achievements.',
        endpoints: ['/api/social (GET, POST)']
      },
      {
        id: 'feature_004',
        name: 'Challenge Templates',
        status: 'implemented',
        description: 'Pre-built challenge templates for weight loss, muscle gain, endurance, etc. One-click to start a challenge.',
        endpoints: ['/api/templates (GET)']
      },
      {
        id: 'feature_005',
        name: 'Reminder System',
        status: 'implemented',
        description: 'Email and notification reminders for daily workouts. Configurable reminder time and frequency.',
        endpoints: ['/api/reminders (GET, POST, PUT)']
      }
    ],
    upcoming: [
      {
        id: 'upcoming_001',
        name: 'AI Workout Generator',
        status: 'planned',
        expectedRelease: '2024-Q2',
        description: 'AI-generated daily workouts based on challenge type and user fitness level.'
      },
      {
        id: 'upcoming_002',
        name: 'Team Challenges',
        status: 'planned',
        expectedRelease: '2024-Q2',
        description: 'Create team-based challenges and compete with other teams.'
      }
    ]
  });
}
