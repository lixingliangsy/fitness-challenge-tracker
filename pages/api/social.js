// pages/api/social.js
// Note

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Note
    const { challengeId } = req.query

    if (!challengeId) {
      return res.status(400).json({ error: 'Missing challengeId' })
    }

    // Note
    const feed = getSocialFeed(challengeId)

    return res.status(200).json(feed)
  }

  if (req.method === 'POST') {
    const { action } = req.query
    const { userId, challengeId, data } = req.body

    if (!action) {
      return res.status(400).json({ error: 'Missing action' })
    }

    let result = null

    switch (action) {
      case 'invite':
        // Note
        result = inviteFriend(userId, challengeId, data.email)
        break

      case 'share':
        // Note
        result = shareProgress(userId, challengeId, data.platform)
        break

      case 'comment':
        // Note
        result = addComment(userId, challengeId, data.comment)
        break

      case 'like':
        // Note
        result = likePost(userId, data.postId)
        break

      default:
        return res.status(400).json({ error: 'Invalid action' })
    }

    return res.status(200).json(result)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

// Note
function getSocialFeed(challengeId) {
  // Note
  const mockFeed = {
    challengeId: challengeId,
    participants: 156,
    posts: [
      {
        id: '1',
        userId: 'user-123',
        userName: 'Alex Chen',
        userAvatar: '/avatars/1.png',
        type: 'progress_update',
        content: 'Completed day 12 today! Feeling stronger 💪',
        day: 12,
        image: '/uploads/progress-12.jpg',
        likes: 24,
        comments: 5,
        createdAt: '2026-01-27T10:30:00Z',
      },
      {
        id: '2',
        userId: 'user-456',
        userName: 'Jordan Lee',
        userAvatar: '/avatars/2.png',
        type: 'milestone',
        content: 'Hit first milestone! 7-day streak 🎉',
        milestone: '7-day streak',
        likes: 42,
        comments: 8,
        createdAt: '2026-01-26T15:20:00Z',
      },
      {
        id: '3',
        userId: 'user-789',
        userName: 'Sam Rivera',
        userAvatar: '/avatars/3.png',
        type: 'invitation',
        content: 'Join my 30-day push-up challenge! 💪',
        inviteLink: '/challenge/1?ref=user-789',
        likes: 12,
        comments: 3,
        createdAt: '2026-01-25T09:15:00Z',
      },
    ],
    leaderboard: [
      { rank: 1, userId: 'user-123', userName: 'Alex Chen', completedDays: 12, streak: 5 },
      { rank: 2, userId: 'user-456', userName: 'Jordan Lee', completedDays: 10, streak: 3 },
      { rank: 3, userId: 'user-789', userName: 'Sam Rivera', completedDays: 8, streak: 2 },
    ],
  }

  return mockFeed
}

// Note
function inviteFriend(userId, challengeId, email) {
  // Note
  console.log(`Inviting ${email} to challenge ${challengeId} by user ${userId}`)

  return {
    success: true,
    invitation: {
      id: Date.now().toString(),
      userId: userId,
      challengeId: challengeId,
      email: email,
      sentAt: new Date().toISOString(),
    }
  }
}

// Note
function shareProgress(userId, challengeId, platform) {
  // Note
  const shareLink = generateShareLink(userId, challengeId, platform)

  return {
    success: true,
    shareLink: shareLink,
    platform: platform,
  }
}

// Note
function addComment(userId, challengeId, comment) {
  // Note
  const newComment = {
    id: Date.now().toString(),
    userId: userId,
    challengeId: challengeId,
    content: comment,
    likes: 0,
    createdAt: new Date().toISOString(),
  }

  return {
    success: true,
    comment: newComment,
  }
}

// Note
function likePost(userId, postId) {
  // Note
  console.log(`User ${userId} liked post ${postId}`)

  return {
    success: true,
    postId: postId,
    likes: 25, // API endpoint
  }
}

// Note
function generateShareLink(userId, challengeId, platform) {
  const baseUrl = 'https://fitness-challenge-tracker.com'
  const shareUrls = {
    'twitter': `https://twitter.com/intent/tweet?text=Check out my fitness challenge!&url=${baseUrl}/challenge/${challengeId}`,
    'facebook': `https://www.facebook.com/sharer/sharer.php?u=${baseUrl}/challenge/${challengeId}`,
    'linkedin': `https://www.linkedin.com/sharing/share-offsite/?url=${baseUrl}/challenge/${challengeId}`,
    'whatsapp': `https://wa.me/?text=Join me in this fitness challenge! ${baseUrl}/challenge/${challengeId}`,
  }

  return shareUrls[platform] || `${baseUrl}/challenge/${challengeId}?ref=${userId}`
}
