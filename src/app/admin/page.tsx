'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HealthData } from '@/types';
import { faFaceSmileBeam, faFaceSmile, faFaceMeh, faFaceFrown, faFaceAngry } from '@fortawesome/free-solid-svg-icons'

export default function AdminPage() {
  const router = useRouter();
  
  const [secret, setSecret] = useState(''); 
  const [moodValue, setMoodValue] = useState(50)
  // i present to you: the least convoluted of variable names
  const [stupidSliderMoodValueThingIDontKnowILowkeyForgotWhatThisIsUsedFor, setStupidSliderMoodValueThingIDontKnowILowkeyForgotWhatThisIsUsedFor] = useState(50)
  const [healthScore, setHealthScore] = useState(3); 
  const [socialBattery, setSocialBattery] = useState(75); 
  const [ratio, setRatio] = useState(50); 
  const [energyValue, setEnergyValue] = useState(50);
  
  const [status, setStatus] = useState<string | null>('Loading current status...');
  const [isLoading, setIsLoading] = useState(true)

  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    fetch('/api/status')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch status");
        return res.json();
      })
      .then((data: HealthData) => {
        setMoodValue(data.currentMoodValue || 50);
        setStupidSliderMoodValueThingIDontKnowILowkeyForgotWhatThisIsUsedFor(data.currentMoodValue || 50)
        setHealthScore(data.mentalHealthScore || 3);
        setSocialBattery(data.socialBattery || 75);
        setRatio(data.dysphoriaEuphoriaRatio || 50);
        
        setEnergyValue(data.energyValue || 50);
        
        setStatus(null);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading initial data:", error);
        setStatus('Error loading initial data. Using defaults.');
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (stored) {
      setTheme(stored);
    }

    const updateTheme = () => {
      const isDark = theme === 'dark' || 
        (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setResolvedTheme(isDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', isDark);
    };

    updateTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateTheme);
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [theme]);

  const cycleTheme = () => {
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('Updating...');

    // Send POST request to our API
    const res = await fetch('/api/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': secret, 
      },
      body: JSON.stringify({
        currentMoodValue: moodValue, 
        mentalHealthScore: healthScore,
        socialBattery: socialBattery,
        dysphoriaEuphoriaRatio: ratio,
        energyValue: energyValue,
      }),
    });

    if (res.ok) {
      setStatus('Success! Dashboard updated.');
    } else {
      setStatus('Failed. Check password or server status.');
    }
  };

  const getMoodBg = (value: number): string => {
    if (value >= 80) return "bg-emerald-50 dark:bg-emerald-950/20";
    if (value >= 60) return "bg-blue-50 dark:bg-blue-950/20";
    if (value >= 40) return "bg-stone-100 dark:bg-stone-900";
    if (value >= 20) return "bg-amber-50 dark:bg-amber-950/20";
    return "bg-red-50 dark:bg-red-950/20";
  };
  
  if (isLoading) {
    return (
        <div className="min-h-screen p-6 bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 flex items-center justify-center">
            <p className="text-xl">Loading current status...</p>
        </div>
    );
  }

  function cubicEaseOut(t: number) {
    return 1 - Math.pow(1 - t, 3)
  }

  function slideMoodValue(target: number) {
    let starting_value = moodValue
    let difference = target - starting_value
    let start_time = performance.now()

    function frame(time: number) {
      const elapsed = time - start_time
      const progress = Math.min(elapsed / 1000, 1)
      const eased = cubicEaseOut(progress)

      setStupidSliderMoodValueThingIDontKnowILowkeyForgotWhatThisIsUsedFor(starting_value + difference * eased)
      setMoodValue(Math.floor(starting_value + difference * eased))

      if (progress < 1) {
        requestAnimationFrame(frame)
      }
    }

    requestAnimationFrame(frame)
  }

  return (
    <div className={`min-h-screen ${getMoodBg(moodValue)} p-6 flex items-center justify-center transition-colors duration-2000 ease-in-out`}>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-stone-50/80 dark:bg-stone-900/80 p-8 rounded border border-stone-300/50 dark:border-stone-700/50 relative">
        
        {/* Theme Toggle Button */}
        <button
          onClick={cycleTheme}
          className="absolute top-4 right-4 px-2 py-1 text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors text-xs font-light tracking-widest uppercase"
          title={`Theme: ${theme}`}
        >
          {theme === 'light' && 'LIGHT'}
          {theme === 'dark' && 'DARK'}
          {theme === 'system' && 'AUTO'}
        </button>

        <p className="text-xs text-stone-500 dark:text-stone-500 uppercase tracking-widest mb-8 font-light">Update Status</p>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-widest mb-2 text-stone-600 dark:text-stone-400 font-light">Admin Password</label>
          <input 
            type="password" 
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="w-full p-3 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-400 dark:focus:border-stone-600 placeholder-stone-400 dark:placeholder-stone-600"
            placeholder="Enter password"
            required 
          />
        </div>

        <div className="h-px bg-stone-300 dark:bg-stone-700 my-6"/>

        {/* 1. Current Mood Slider (0-100) */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-widest mb-3 text-stone-600 dark:text-stone-400 font-light">Current Mood</label>
          <div className="flex items-center gap-4">
            <input 
              type="range" 
              min="0" 
              max="100" 
              step="1" 
              value={stupidSliderMoodValueThingIDontKnowILowkeyForgotWhatThisIsUsedFor}
              onChange={(e) => {setMoodValue(Number(e.target.value)); setStupidSliderMoodValueThingIDontKnowILowkeyForgotWhatThisIsUsedFor(Number(e.target.value))}}
              className="w-full h-px bg-stone-300 dark:bg-stone-700 rounded appearance-none cursor-pointer accent-stone-800 dark:accent-stone-400"
            />
            <span className="font-bold text-2xl text-stone-900 dark:text-stone-100 min-w-16 text-right">{moodValue}</span>
          </div>
          <div className="flex justify-between text-xs text-stone-500 dark:text-stone-500 mt-2 tracking-wider">
            <span>Struggling</span>
            <span>Great</span>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-3 text-stone-600 dark:text-stone-400 font-light">Mood Presets</label>

          <div className="flex items-center gap-4">
            <button className='bg-red-500 w-full h-15 text-2xl rounded mb-5' onClick={() => slideMoodValue(0)}> <FontAwesomeIcon className='text-white dark:text-white' icon={faFaceAngry}  /> </button>
            <button className='bg-amber-500 w-full h-15 text-2xl rounded mb-5' onClick={() => slideMoodValue(25)}> <FontAwesomeIcon className='text-white dark:text-white' icon={faFaceFrown} /> </button>
            <button className='bg-stone-400 w-full h-15 text-2xl rounded mb-5' onClick={() => slideMoodValue(50)}> <FontAwesomeIcon className='text-white dark:text-white' icon={faFaceMeh} /> </button>
            <button className='bg-blue-500 w-full h-15 text-2xl rounded mb-5' onClick={() => slideMoodValue(75)}> <FontAwesomeIcon className='text-white dark:text-white' icon={faFaceSmile} /> </button>
            <button className='bg-emerald-500 w-full h-15 text-2xl rounded mb-5' onClick={() => slideMoodValue(100)}> <FontAwesomeIcon className='text-white dark:text-white'icon={faFaceSmileBeam} /> </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-xs uppercase tracking-widest mb-3 text-stone-600 dark:text-stone-400 font-light">Mental Health</label>
          <div className="flex items-center gap-4">
            <input 
              type="range" 
              min="0" 
              max="5" 
              step="0.1" 
              value={healthScore}
              onChange={(e) => setHealthScore(Number(e.target.value))}
              className="w-full h-px bg-stone-300 dark:bg-stone-700 rounded appearance-none cursor-pointer accent-stone-800 dark:accent-stone-400"
            />
            <span className="font-bold text-2xl text-stone-900 dark:text-stone-100 min-w-16 text-right">{healthScore}</span>
          </div>
          <div className="flex justify-between text-xs text-stone-500 dark:text-stone-500 mt-2 tracking-wider">
            <span>Poor</span>
            <span>Amazing</span>
          </div>
        </div>
        
        {/* 3. Social Battery Slider (0-100) */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-widest mb-3 text-stone-600 dark:text-stone-400 font-light">Social Battery</label>
          <div className="flex items-center gap-4">
            <input 
              type="range" 
              min="0" 
              max="100" 
              step="1" 
              value={socialBattery}
              onChange={(e) => setSocialBattery(Number(e.target.value))}
              className="w-full h-px bg-stone-300 dark:bg-stone-700 rounded appearance-none cursor-pointer accent-stone-800 dark:accent-stone-400"
            />
            <span className="font-bold text-2xl text-stone-900 dark:text-stone-100 min-w-16 text-right">{socialBattery}</span>
          </div>
          <div className="flex justify-between text-xs text-stone-500 dark:text-stone-500 mt-2 tracking-wider">
            <span>Drained</span>
            <span>Charged</span>
          </div>
        </div>

        {/* 4. Dysphoria/Euphoria Slider (0-100)*/}
        <div className="mb-8">
          <label className="block text-xs uppercase tracking-widest mb-3 text-stone-600 dark:text-stone-400 font-light">Gender Euphoria</label>
          <div className="flex items-center gap-4">
            <input 
              type="range" 
              min="0" 
              max="100" 
              step="1" 
              value={ratio}
              onChange={(e) => setRatio(Number(e.target.value))}
              className="w-full h-px bg-stone-300 dark:bg-stone-700 rounded appearance-none cursor-pointer accent-stone-800 dark:accent-stone-400"
            />
            <span className="font-bold text-2xl text-stone-900 dark:text-stone-100 min-w-16 text-right">{ratio}</span>
          </div>
          <div className="flex justify-between text-xs text-stone-500 dark:text-stone-500 mt-2 tracking-wider">
            <span>Dysphoria</span>
            <span>Euphoria</span>
          </div>
        </div>

        {/* Energy Level Slider (0-100) */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-widest mb-3 text-stone-600 dark:text-stone-400 font-light">Energy Level</label>
          <div className="flex items-center gap-4">
            <input 
              type="range" 
              min="0" 
              max="100" 
              step="1" 
              value={energyValue}
              onChange={(e) => setEnergyValue(Number(e.target.value))}
              className="w-full h-px bg-stone-300 dark:bg-stone-700 rounded appearance-none cursor-pointer accent-stone-800 dark:accent-stone-400"
            />
            <span className="font-bold text-2xl text-stone-900 dark:text-stone-100 min-w-16 text-right">{energyValue}</span>
          </div>
          <div className="flex justify-between text-xs text-stone-500 dark:text-stone-500 mt-2 tracking-wider">
            <span>Exhausted</span>
            <span>Vibrant</span>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-stone-50 dark:text-stone-900 uppercase tracking-widest text-xs font-light py-3 px-4 rounded transition-colors"
        >
          Update Status
        </button>

        {/* Status Message */}
        {status && (
          <div className={`mt-4 text-center text-xs p-3 rounded border tracking-wider ${
            status.includes('Success') 
              ? 'bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-900' 
              : status.includes('Failed')
              ? 'bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-400 border-red-200 dark:border-red-900'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700'
          }`}>
            {status}
          </div>
        )}
      </form>
    </div>
  );
}