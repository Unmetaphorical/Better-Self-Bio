export default function Pronouns({ fadeIn }: { fadeIn: boolean }) {
  return (
    <div className={`w-full max-w-md h-full bg-stone-50/80 dark:bg-stone-900/80 p-8 rounded border border-stone-300/50 dark:border-stone-700/50 relative transition-all duration-1000 ${fadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ filter: fadeIn ? 'none' : 'blur(4px)' }}>
      <p className='font-bold text-2xl mb-8 pb-6 border-b border-stone-300 dark:border-stone-700'>Names & Pronouns</p>
      <img src='fsh-spin.gif' width={300} height={300}/>
    </div>
  )
}
