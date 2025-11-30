'use client'

import { useEffect, useState } from 'react'
import { HealthData } from '@/types'
import Profile from '@/components/profile'
import Player from '@/components/player'
import Bio from '@/components/bio'
import Pronouns from '@/components/pronouns'
import MetersMenu from '@/components/metersmenu'

function getMoodStatusLabel(value: number): string {
  if (value >= 80) return 'Great!'
  if (value >= 60) return 'Good'
  if (value >= 40) return 'Neutral'
  if (value >= 20) return 'Low'

  return 'Struggling'
}

export default function Dashboard() {
  const [data, setData] = useState<HealthData | null>(null)
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  const [displayedMood, setDisplayedMood] = useState('')
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null

    if (stored) {
      setTheme(stored)
    }
  }, [])

  useEffect(() => {
    function updateTheme() {
      const isDark = theme == 'dark' || (theme == 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      
      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    updateTheme()

    if (theme == 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', updateTheme)
      return () => mediaQuery.removeEventListener('change', updateTheme)
    }
  }, [theme])

  function cycleTheme() {
    const next = theme == 'light' ? 'dark' : theme == 'dark' ? 'system' : 'light'

    setTheme(next)
    localStorage.setItem('theme', next)
  }

  const fetchStatus = () => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchStatus()

    const intervalId = setInterval(fetchStatus, 5000)
    return () => clearInterval(intervalId)
  }, []);

  useEffect(() => {
    if (!data) return
    
    const targetMood = getMoodStatusLabel(data.currentMoodValue)
    setDisplayedMood('')
    
    let currentIndex = 0
    const typeInterval = setInterval(() => {
      if (currentIndex <= targetMood.length) {
        setDisplayedMood(targetMood.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typeInterval)
      }
    }, 100)

    return () => clearInterval(typeInterval)
  }, [data?.currentMoodValue])

  useEffect(() => {
    if (loading) return

    setTimeout(() => setFadeIn(true), 100)
  }, [loading])

  if (loading) return <div className='min-h-screen p-10 text-center bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400'>Loading Status...</div>
  if (!data) return <div className='min-h-screen p-10 text-center bg-stone-100 dark:bg-stone-900 text-red-800 dark:text-red-400'>Error: Could not load status data.</div>

  const getMoodBg = (value: number): string => {
    if (value >= 80) return 'bg-emerald-50 dark:bg-emerald-950/20'
    if (value >= 60) return 'bg-blue-50 dark:bg-blue-950/20'
    if (value >= 40) return 'bg-stone-100 dark:bg-stone-900'
    if (value >= 20) return 'bg-amber-50 dark:bg-amber-950/20'

    return 'bg-red-50 dark:bg-red-950/20'
  }

  return (
    <main className={`min-h-screen min-w-2/3 ${getMoodBg(data.currentMoodValue)} p-6 flex sm:flex-row items-center sm:items-stretch flex-col gap-10 justify-center transition-colors duration-2000 ease-in-out`}>
      <div className='flex flex-col gap-10'>
        <Profile fadeIn={fadeIn} />

        <MetersMenu theme={theme} cycleTheme={cycleTheme} displayedMood={displayedMood} data={data} fadeIn={fadeIn} />
      </div>

      <div className='flex flex-col gap-10'>
        <Bio fadeIn={fadeIn} />

        <Pronouns fadeIn={fadeIn}/>

        <Player fadeIn={fadeIn} />


      </div>  
    </main>
  )
}
