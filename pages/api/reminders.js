// pages/api/reminders.js
// Note

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Note
    const { userId } = req.query

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' })
    }

    // Note
    const reminders = getReminders(userId)

    return res.status(200).json(reminders)
  }

  if (req.method === 'POST') {
    // Note
    const { userId, challengeId, type, time, frequency, enabled } = req.body

    if (!userId || !challengeId || !type || !time) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Note
    const reminder = createReminder(userId, challengeId, type, time, frequency, enabled)

    return res.status(201).json(reminder)
  }

  if (req.method === 'PUT') {
    // Note
    const { reminderId, ...updates } = req.body

    if (!reminderId) {
      return res.status(400).json({ error: 'Missing reminderId' })
    }

    // Note
    const result = updateReminder(reminderId, updates)

    return res.status(200).json(result)
  }

  if (req.method === 'DELETE') {
    // Note
    const { reminderId } = req.query

    if (!reminderId) {
      return res.status(400).json({ error: 'Missing reminderId' })
    }

    // Note
    const result = deleteReminder(reminderId)

    return res.status(200).json(result)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

// Note
function getReminders(userId) {
  // Note
  const mockReminders = {
    userId: userId,
    reminders: [
      {
        id: 'rem-001',
        challengeId: '1',
        challengeTitle: '30-day push-up challenge',
        type: 'email', // email, push, sms
        time: '08:00',
        frequency: 'daily', // daily, weekly, custom
        enabled: true,
        lastSent: '2026-01-27T08:00:00Z',
        createdAt: '2026-01-14T10:00:00Z',
      },
      {
        id: 'rem-002',
        challengeId: '2',
        challengeTitle: '30-day running challenge',
        type: 'push',
        time: '18:00',
        frequency: 'daily',
        enabled: true,
        lastSent: '2026-01-27T18:00:00Z',
        createdAt: '2026-01-14T10:00:00Z',
      },
    ],
    settings: {
      globalEnabled: true,
      quietHours: {
        enabled: true,
        start: '22:00',
        end: '07:00',
      },
      timezone: 'Asia/Shanghai',
    }
  }

  return mockReminders
}

// Note
function createReminder(userId, challengeId, type, time, frequency, enabled) {
  // Note
  const newReminder = {
    id: `rem-${Date.now()}`,
    userId: userId,
    challengeId: challengeId,
    type: type, // email, push, sms
    time: time,
    frequency: frequency || 'daily',
    enabled: enabled !== false,
    lastSent: null,
    createdAt: new Date().toISOString(),
  }

  console.log('Created reminder:', newReminder)

  return {
    success: true,
    reminder: newReminder,
  }
}

// Note
function updateReminder(reminderId, updates) {
  // Note
  console.log(`Updating reminder ${reminderId}:`, updates)

  return {
    success: true,
    reminder: {
      id: reminderId,
      ...updates,
      updatedAt: new Date().toISOString(),
    }
  }
}

// Note
function deleteReminder(reminderId) {
  // Note
  console.log(`Deleting reminder ${reminderId}`)

  return {
    success: true,
    message: 'Reminder deleted successfully',
  }
}
