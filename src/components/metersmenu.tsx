import { HealthData } from '@/types'
import Meter from '@/components/Meter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartPulse, faTransgender, faClock, faUserGroup, faFaceSmileBeam, faFaceSmile, faFaceMeh, faFaceFrown, faFaceAngry, faBoltLightning, IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface g {
  theme: 'light' | 'dark' | 'system',
  cycleTheme: () => void,
  displayedMood: string,
  data: HealthData,
  fadeIn: boolean
}

export default function MetersMenu({ theme, cycleTheme, displayedMood, data, fadeIn }: g) {
  function getMoodColor(value: number): string {
    if (value >= 80) return 'bg-emerald-700 dark:bg-emerald-500'
    if (value >= 60) return 'bg-blue-700 dark:bg-blue-500'
    if (value >= 40) return 'bg-stone-700 dark:bg-stone-500'
    if (value >= 20) return 'bg-amber-700 dark:bg-amber-500'

    return 'bg-red-700 dark:bg-red-500'
  }

  const getHealthColor = (value: number): string => {
    if (value < 2.5) return 'bg-red-700 dark:bg-red-500'

    return 'bg-green-700 dark:bg-green-500'
  }

  function getSocialColor(value: number): string {
    if (value < 25) return 'bg-red-700 dark:bg-red-500'
    if (value < 60) return 'bg-yellow-700 dark:bg-yellow-500'

    return 'bg-green-700 dark:bg-green-500'
  }

  function getEuphoriaColor(value: number): string {
    if (value < 40) return 'bg-red-700 dark:bg-red-500'
    if (value < 60) return 'bg-orange-700 dark:bg-orange-500'

    return 'bg-green-700 dark:bg-green-500'
  }

  function getEnergyColor(value: number): string {
    if (value < 25) return 'bg-red-700 dark:bg-red-500'
    if (value < 60) return 'bg-yellow-700 dark:bg-yellow-500'

    return 'bg-green-700 dark:bg-green-500'
  }

  function getMoodIcon(value: number): IconDefinition {
    if (value >= 80) return faFaceSmileBeam
    if (value >= 60) return faFaceSmile
    if (value >= 40) return faFaceMeh
    if (value >= 20) return faFaceFrown

    return faFaceAngry
  }

  return (
    <div className={`w-full max-w-md bg-stone-50/80 dark:bg-stone-900/80 p-8 rounded border border-stone-300/50 dark:border-stone-700/50 relative transition-all duration-1000 ${fadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ filter: fadeIn ? 'none' : 'blur(4px)' }}>
      <button onClick={cycleTheme} className='absolute top-4 right-4 px-2 py-1 text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors text-xs font-light tracking-widest uppercase'>
        {theme == 'light' && 'LIGHT'}
        {theme == 'dark' && 'DARK'}
        {theme == 'system' && 'AUTO'}
      </button>

      <p className='text-xs text-stone-500 dark:text-stone-500 uppercase tracking-widest mb-8 font-light'>
        Current Status
      </p>

      <div className='text-center mb-8 pb-6 border-b border-stone-300 dark:border-stone-700'>
        <p className='text-xs text-stone-500 dark:text-stone-500 uppercase tracking-widest mb-4 font-light'>Mood Status</p>

        <p className='text-7xl sm:text-7xl font-bold tracking-tighter text-stone-900 dark:text-stone-100 transition-colors duration-2000 wrap-break-word min-h-20 flex items-center justify-center'>
          {displayedMood}
        </p>
      </div>

      <Meter 
        label='Mood Score' 
        value={data.currentMoodValue} 
        min={0} 
        max={100} 
        icon={getMoodIcon(data.currentMoodValue)}
        color={getMoodColor(data.currentMoodValue)} 
        leftLabel='Low'
        rightLabel='High'
      />

      <Meter 
        label='Mental Health' 
        value={data.mentalHealthScore} 
        min={0} 
        max={5} 
        icon={faHeartPulse}
        color={getHealthColor(data.mentalHealthScore)} 
        leftLabel='In Danger'
        rightLabel='Safe'
      />

      <Meter 
        label='Social Battery' 
        value={data.socialBattery} 
        min={0} 
        max={100} 
        icon={faUserGroup}
        color={getSocialColor(data.socialBattery)}
        leftLabel='Drained'
        rightLabel='Charged'
      />

      <Meter 
        label='Gender Euphoria' 
        value={data.dysphoriaEuphoriaRatio} 
        min={0} 
        max={100}
        icon={faTransgender} 
        color={getEuphoriaColor(data.dysphoriaEuphoriaRatio)}
        leftLabel='Dysphoria'
        rightLabel='Euphoria'
      />

      <Meter 
        label='Energy Level' 
        value={data.energyValue} 
        min={0} 
        max={100} 
        icon={faBoltLightning}
        color={getEnergyColor(data.energyValue)}
        leftLabel='Exhausted'
        rightLabel='Vibrant'
      />

      <div className='mt-6 pt-4 border-t border-stone-300 dark:border-stone-700 flex items-center justify-center text-xs text-stone-500 dark:text-stone-500'>
        <FontAwesomeIcon icon={faClock} className='mr-2' />
        <span className='wrap-break-word text-center'>{new Date(data.lastUpdated).toLocaleString()}</span>
      </div>
    </div>
  )
}
