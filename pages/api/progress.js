// pages/api/progress.js
// Note

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Note
    const { userId, challengeId } = req.query

    if (!userId || !challengeId) {
      return res.status(400).json({ error: 'Missing userId or challengeId' })
    }

    // Note
    const progress = getProgress(userId, challengeId)

    return res.status(200).json(progress)
  }

  if (req.method === 'POST') {
    // Note
    const { userId, challengeId, day, completed, notes } = req.body

    if (!userId || !challengeId || !day) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Note
    const result = recordProgress(userId, challengeId, day, completed, notes)

    return res.status(200).json(result)
  }

  if (req.method === 'GET' && req.query.stats === 'true') {
    // Note
    const { userId, challengeId } = req.query
    const stats = calculateStats(userId, challengeId)

    return res.status(200).json(stats)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

// Note
function getProgress(userId, challengeId) {
  // Note
  const mockProgress = {
    userId: userId,
    challengeId: challengeId,
    startDate: '2026-01-15',
    currentDay: 12,
    totalDays: 30,
    completedDays: 8,
    missedDays: 4,
    streak: 3,
    completionRate: 27, // percent
    dailyLogs: [
      { day: 1, completed: true, date: '2026-01-15', notes: '' },
      { day: 2, completed: true, date: '2026-01-16', notes: '' },
      { day: 3, completed: false, date: '2026-01-17', notes: 'Too tired' },
      { day: 4, completed: true, date: '2026-01-18', notes: '' },
      // Note
    ],
    statistics: {
      totalWorkouts: 8,
      totalCalories: 2400,
      averagePace: '5:30',
      bestStreak: 5,
    }
  }

  return mockProgress
}

// Note
function recordProgress(userId, challengeId, day, completed, notes) {
  // Note
  console.log(`Recording progress: User ${userId}, Challenge ${challengeId}, Day ${day}, Completed: ${completed}`)

  return {
    success: true,
    progress: {
      userId: userId,
      challengeId: challengeId,
      day: day,
      completed: completed,
      notes: notes || '',
      recordedAt: new Date().toISOString(),
    }
  }
}

// Note
function calculateStats(userId, challengeId) {
  // Note
  return {
    userId: userId,
    challengeId: challengeId,
    overview: {
      totalDays: 30,
      completedDays: 18,
      missedDays: 12,
      completionRate: 60, // percent
      currentStreak: 4,
      bestStreak: 7,
    },
    charts: {
      weeklyProgress: [
        { week: 1, planned: 7, completed: 5 },
        { week: 2, planned: 7, completed: 6 },
        { week: 3, planned: 7, completed: 4 },
        { week: 4, planned: 7, completed: 3 },
      ],
      completionTrend: [
        { date: '2026-01-15', count: 1 },
        { date: '2026-01-16', count: 2 },
        { date: '2026-01-17', count: 2 },
        { date: '2026-01-18', count: 3 },
        // Note
      ],
    },
    insights: {
      strongestDay: 'Wednesday',
      weakestDay: 'Monday',
      averageWorkoutTime: '45 mins',
      improvementRate: '+12%',
    }
  }
}
