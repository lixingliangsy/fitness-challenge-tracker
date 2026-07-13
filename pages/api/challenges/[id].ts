import type { NextApiRequest, NextApiResponse } from 'next'

interface Challenge {
  id: string
  title: string
  description: string
  duration: number
  participants: number
  difficulty: string
  category: string
  createdAt: string
}

// Note
let challenges: Challenge[] = [
  {
    id: '1',
    title: '30-day push-up challenge',
    description: 'Start with 10 push-ups per day, build up to 100',
    duration: 30,
    participants: 156,
    difficulty: 'medium',
    category: 'Strength',
    createdAt: '2026-01-01'
  }
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Challenge | { error: string }>
) {
  const { id } = req.query
  
  const challengeIndex = challenges.findIndex(c => c.id === id)
  
  if (challengeIndex === -1) {
    return res.status(404).json({ error: 'Challenge not found' })
  }
  
  if (req.method === 'GET') {
    // Note
    return res.status(200).json(challenges[challengeIndex])
  }
  
  if (req.method === 'PUT') {
    // Note
    const { title, description, duration, difficulty, category } = req.body
    
    if (title) challenges[challengeIndex].title = title
    if (description) challenges[challengeIndex].description = description
    if (duration) challenges[challengeIndex].duration = parseInt(duration)
    if (difficulty) challenges[challengeIndex].difficulty = difficulty
    if (category) challenges[challengeIndex].category = category
    
    return res.status(200).json(challenges[challengeIndex])
  }
  
  if (req.method === 'DELETE') {
    // Note
    challenges = challenges.filter(c => c.id !== id)
    return res.status(204).end()
  }
  
  return res.status(405).json({ error: 'Method not allowed' })
}
