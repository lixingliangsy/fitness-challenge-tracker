// pages/api/templates.js
// Note

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { category, difficulty } = req.query

    // Note
    let templates = getAllTemplates()

    // Note
    if (category) {
      templates = templates.filter(t => t.category === category)
    }

    // Note
    if (difficulty) {
      templates = templates.filter(t => t.difficulty === difficulty)
    }

    res.status(200).json({
      success: true,
      total: templates.length,
      templates: templates,
    })
  } catch (error) {
    console.error('Templates error:', error)
    res.status(500).json({ error: 'Failed to get templates', details: error.message })
  }
}

// Note
function getAllTemplates() {
  return [
    {
      id: 'tpl-001',
      title: '30-Day Fat Loss Challenge',
      description: 'Cardio and diet control to lose 5-8 kg in 30 days',
      category: 'Fat loss',
      difficulty: 'medium',
      duration: 30,
      dailyWorkout: '45 min cardio + 20 min strength',
      caloriesBurn: '400-600/ days',
      tips: ['Watch your diet', 'Stay hydrated', 'Get enough sleep'],
      image: '/templates/weight-loss.jpg',
    },
    {
      id: 'tpl-002',
      title: '30-Day Muscle Gain Challenge',
      description: 'Strength training and protein to gain 2-3 kg in 30 days',
      category: 'Muscle gain',
      difficulty: 'hard',
      duration: 30,
      dailyWorkout: '60 min strength + 15 min cardio',
      caloriesBurn: '300-400/ days',
      tips: ['Increase protein intake', 'Progressive overload', 'Rest adequately'],
      image: '/templates/muscle-gain.jpg',
    },
    {
      id: 'tpl-003',
      title: '30-Day Endurance Challenge',
      description: 'Running and swimming to build endurance and finish your first 10K',
      category: 'Endurance',
      difficulty: 'medium',
      duration: 30,
      dailyWorkout: '30-60 min cardio',
      caloriesBurn: '500-800/ days',
      tips: ['Progress gradually', 'Mind your running form', 'Stretch and cool down'],
      image: '/templates/endurance.jpg',
    },
    {
      id: 'tpl-004',
      title: '30-Day Flexibility Challenge',
      description: 'Yoga and stretching to improve flexibility in 30 days',
      category: 'Flexibility',
      difficulty: 'easy',
      duration: 30,
      dailyWorkout: '30 min yoga/stretching',
      caloriesBurn: '150-250/ days',
      tips: ['Do not force stretches', 'Keep breathing steady', 'Practice daily'],
      image: '/templates/flexibility.jpg',
    },
    {
      id: 'tpl-005',
      title: '30-Day Core Challenge',
      description: 'Strengthen core, improve posture, reduce back pain',
      category: 'Strength',
      difficulty: 'medium',
      duration: 30,
      dailyWorkout: '20 min core workout',
      caloriesBurn: '200-300/ days',
      tips: ['Maintain proper form', 'Control your breathing', 'Increase difficulty gradually'],
      image: '/templates/core.jpg',
    },
    {
      id: 'tpl-006',
      title: '7-Day Quick Start Challenge',
      description: 'Short challenge for beginners to build a habit',
      category: 'General',
      difficulty: 'easy',
      duration: 7,
      dailyWorkout: '30 min full-body workout',
      caloriesBurn: '200-350/ days',
      tips: ['Do not give up', 'Track progress', 'Find a workout buddy'],
      image: '/templates/starter.jpg',
    },
  ]
}
