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
  },
  {
    id: '2',
    title: '30-day running challenge',
    description: 'Start with 1 km per day, build up to 5 km',
    duration: 30,
    participants: 89,
    difficulty: 'easy',
    category: 'Cardio',
    createdAt: '2026-01-02'
  }
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Challenge[] | Challenge | { error: string }>
) {
  if (req.method === 'GET') {
    // Note
    return res.status(200).json(challenges)
  }
  
  if (req.method === 'POST') {
    // Create new challenge
    const { title, description, duration, difficulty, category } = req.body
    
    if (!title || !description || !duration || !difficulty || !category) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    
    const newChallenge: Challenge = {
      id: Date.now().toString(),
      title,
      description,
      duration: parseInt(duration),
      participants: 0,
      difficulty,
      category,
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    challenges.push(newChallenge)
    
    return res.status(201).json(newChallenge)
  }
  
  return res.status(405).json({ error: 'Method not allowed' })
}
