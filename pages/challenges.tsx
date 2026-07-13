import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import ChallengeCard from '../components/ChallengeCard'

interface Challenge {
  id: string
  title: string
  description: string
  duration: number
  participants: number
  difficulty: string
  category: string
}

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setChallenges([
        {
          id: '1',
          title: '30-day push-up challenge',
          description: 'Start with 10 push-ups per day, build up to 100',
          duration: 30,
          participants: 156,
          difficulty: 'medium',
          category: 'Strength'
        },
        {
          id: '2',
          title: '30-day running challenge',
          description: 'Start with 1 km per day, build up to 5 km',
          duration: 30,
          participants: 89,
          difficulty: 'easy',
          category: 'Cardio'
        },
        {
          id: '3',
          title: '30-day yoga challenge',
          description: '15 minutes of yoga daily for flexibility and balance',
          duration: 30,
          participants: 234,
          difficulty: 'easy',
          category: 'Flexibility'
        },
        {
          id: '4',
          title: '30-day plank challenge',
          description: 'Start at 30 seconds, build up to 5 minutes',
          duration: 30,
          participants: 67,
          difficulty: 'hard',
          category: 'Core'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredChallenges = filter === 'all' 
    ? challenges 
    : challenges.filter(c => c.category === filter)

  return (
    <Layout>
      <Head>
        <title>Challenges - Fitness Challenge Tracker</title>
      </Head>

      <h2 className="text-3xl font-bold text-gray-800 mb-8">Fitness challenges</h2>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('Strength')}
          className={`px-4 py-2 rounded-md ${filter === 'Strength' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Strength
        </button>
        <button
          onClick={() => setFilter('Cardio')}
          className={`px-4 py-2 rounded-md ${filter === 'Cardio' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Cardio
        </button>
        <button
          onClick={() => setFilter('Flexibility')}
          className={`px-4 py-2 rounded-md ${filter === 'Flexibility' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Flexibility
        </button>
        <button
          onClick={() => setFilter('Core')}
          className={`px-4 py-2 rounded-md ${filter === 'Core' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Core
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map(challenge => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      )}
    </Layout>
  )
}
