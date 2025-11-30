'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faPlay, faForward } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
// import axios from 'axios'

export default function Player({ fadeIn }: { fadeIn: boolean }) {
  return (
    <div className={`w-full max-w-md bg-stone-50/80 dark:bg-stone-900/80 p-8 rounded border border-stone-300/50 dark:border-stone-700/50 relative transition-all duration-1000 ${fadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ filter: fadeIn ? 'none' : 'blur(4px)' }}>
      <div className='flex flex-col justify-center items-center'>
        <p className="text-xs text-stone-500 dark:text-stone-500 uppercase tracking-widest mb-4 font-light">Favorite Song</p>

        <div className='flex gap-5 justify-between mx-5'>
          <Image src='/Tikoo1.png' className='w-30 border-grey-700 h-30 rounded-xl' 
            width={256} height={256}
            alt="cover art"
          />

          <div className='flex justify-center items-center flex-col'>
            <p className='text-2xl font-bold'>Microwave</p>
            <p className='tex-grey-700'>Not me</p>

            <div className='my-5 flex justify-between w-full'>
              <FontAwesomeIcon icon={faBackward} />
              <FontAwesomeIcon icon={faPlay} />
              <FontAwesomeIcon icon={faForward} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

