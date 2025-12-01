import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Importing specific icons for each sentiment
import { 
    faHeart, 
    faHeartbeat, 
    faTag, 
    faCrown, 
    faUserFriends, 
    faBan, 
    faSkullCrossbones 
} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

export default function Pronouns({ fadeIn }: { fadeIn: boolean }) {
  
  // Data structure integrating all terms into their natural sections (unchanged)
  const allSections = [
    { 
      title: "Pronouns", 
      icon: faTag, 
      terms: [
        { item: "She/Her", sentiment: "love" },
        { item: "He/Him", sentiment: "hated" },
        { item: "They/Them", sentiment: "dislike" },
      ]
    },
    { 
      title: "Honorifics", 
      icon: faCrown, 
      terms: [
        { item: "Mrs.", sentiment: "love" },
        { item: "Miss", sentiment: "preferred" },
        { item: "Ma'am", sentiment: "love" },
        { item: "Sir", sentiment: "hated" },
        { item: "Mister", sentiment: "hated" },
        { item: "broskie", sentiment: "hated" },
        { item: "man", sentiment: "hated" },
        { item: "Girlie", sentiment: "preferred" },
        { item: "Girl", sentiment: "preferred" },
      ]
    },
    { 
      title: "Compliments", 
      icon: faHeart, 
      terms: [
        { item: "Cute", sentiment: "love" },
        { item: "Pretty", sentiment: "preferred" },
        { item: "Lovely", sentiment: "love" },
        { item: "Hot", sentiment: "hated" },
        { item: "Handsome", sentiment: "hated" },
      ]
    },
    { 
      title: "Relationship Terms", 
      icon: faUserFriends, 
      terms: [
        { item: "Bestie", sentiment: "close_only" },
        { item: "Babe", sentiment: "close_only" },
        { item: "Sweetheart", sentiment: "close_only" },
        { item: "Friend", sentiment: "preferred" },
        { item: "Girl", sentiment: "love" },
        { item: "Love", sentiment: "love" },
        { item: "Pal", sentiment: "hated" },
        { item: "Dude", sentiment: "hated" },
        { item: "Bro", sentiment: "hated" },
      ]
    },
  ];

  const visibleSections = allSections.filter(section => section.terms.length > 0);

  // Helper function to define the visual style for all five sentiments
  const getChipClasses = (sentiment: string) => {
    // Only defining icon colors and symbols now. Container style is applied universally below.
    switch (sentiment) {
      case 'love':
        return { 
          icon: 'text-red-500', // Strong red for love
          symbol: faHeartbeat, 
          textDecoration: ''
        };
      case 'preferred':
        return { 
          icon: 'text-pink-400', // Soft pink for preferred
          symbol: faHeart, 
          textDecoration: ''
        };
      case 'close_only':
        return { 
          icon: 'text-teal-400', // Teal/Blue for distinction
          symbol: faUserFriends, 
          textDecoration: ''
        };
      case 'disliked':
        return { 
          icon: 'text-amber-500', // Amber/Orange for warning
          symbol: faBan, 
          textDecoration: 'line-through' // Keep strikethrough for disliked terms
        };
      case 'hated':
        return { 
          icon: 'text-stone-500 dark:text-stone-400', // Neutral color, but uses the powerful symbol
          symbol: faSkullCrossbones, 
          textDecoration: 'line-through font-bold' // Keep strong strikethrough for hated terms
        };
      default:
        return { 
          icon: 'text-stone-400',
          symbol: faHeart,
          textDecoration: ''
        };
    }
  };

  return (
    // Dynamic Sizing: No h-full
    <div className={`w-full max-w-md bg-stone-50/80 dark:bg-stone-900/80 p-8 rounded border border-stone-300/50 dark:border-stone-700/50 relative transition-all duration-1000 ${fadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ filter: fadeIn ? 'none' : 'blur(4px)' }}>
      
      {/* Header Style Maintained */}
      <p className='font-extrabold text-3xl mb-8 pb-4 border-b border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100'>
        Identity & Terms
      </p>

      <div className='flex flex-col gap-8'>
        {visibleSections.map((section, index) => (
          <div key={index}>
            
            {/* Category Title: Using requested label styling */}
            <p className='block text-xs uppercase tracking-widest mb-2 text-stone-600 dark:text-stone-400 font-light'>
                <FontAwesomeIcon icon={section.icon} className='text-base mr-2'/>
                {section.title}
            </p>

            {/* Terms Display */}
            <div className='flex flex-wrap gap-2'>
              {section.terms.map((term, termIndex) => {
                const { icon, symbol, textDecoration } = getChipClasses(term.sentiment);

                return (
                  // Neutral Chip Container Styling applied to ALL chips
                  <div key={termIndex} className="group relative">
                    <div className={
                         `flex items-center gap-2 px-3 py-1 rounded-full 
                          font-medium text-base shadow-sm cursor-default transition duration-150 ease-in-out
                          bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100` // Neutral background/text color
                      }>
                      
                      {/* Icon is the only element that receives color coding */}
                      <FontAwesomeIcon 
                        icon={symbol} 
                        className={`${icon} text-sm`}
                      /> 
                      {/* Text decoration for disliked/hated terms */}
                      <span className={textDecoration}>{term.item}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}