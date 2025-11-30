import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faReddit, faInstagram } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'

export default function Profile({ fadeIn }: { fadeIn: boolean }) {
  return (
    <div className={`w-full max-w-md bg-stone-50/80 dark:bg-stone-900/80 p-8 rounded border border-stone-300/50 dark:border-stone-700/50 relative transition-all duration-1000 ${fadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ filter: fadeIn ? 'none' : 'blur(4px)' }}>
      <div className='flex gap-5 justify-center items-center'>
        <Image 
          src='/Chicken.png'
          className='rounded-full h-50 w-50 border-stone-300/50 border'
          width={256} height={256}
          alt='profile image'
        />

        <div>
          <p className='text-4xl sm:text-6xl font-bold tracking-tighter text-stone-900 dark:text-stone-100 transition-colors duration-2000 wrap-break-word flex items-center justify-center'>John Doe</p>
          <p className='text-2xl sm:text-2xl tracking-tighter text-stone-600 dark:text-stone-600 transition-colors duration-2000'>@username</p>
          
          <div className='flex gap-3 justify-between text-2xl mx-5 my-3'>
            <button className='hover:text-blue-500 transition-all duration-200'><FontAwesomeIcon icon={faDiscord} /></button>
            <button className='hover:text-orange-500 transition-all duration-200'><FontAwesomeIcon icon={faReddit} /></button>
            <button className='hover:text-purple-500 transition-all duration-200'><FontAwesomeIcon icon={faInstagram} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
