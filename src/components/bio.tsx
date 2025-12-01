import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faUser, 
    faTransgender, 
    faHeartCrack, 
    faVenus, 
    faMicrochip, 
    faCode, 
    faCommentSlash, 
    faHeart,
    faChevronDown, 
    faChevronUp 
} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

export default function Bio({ fadeIn }: { fadeIn: boolean }) {
    
    // Structured data (Emojis removed from display)
    const bioItems = [
        { 
            icon: faTransgender, 
            text: "Trans Fem",
            details: "I am a trans girl! Might be getting estrogen soon" 
        },
        { 
            icon: faHeartCrack, 
            text: "Asexual",
            details: "No sexual attraction, but plenty of romantic and platonic love!"
        },
        { 
            icon: faVenus, 
            text: "Just a silly girl",
            details: "Just enjoying the simple things and being myself :3" 
        },
        { 
            icon: faMicrochip, 
            text: "Protogen :3", 
            details: "A fan of robotic aesthetic and furry culture." 
        },
        { 
            icon: faCode, 
            text: "I like programming!", 
            details: "Mostly working with React and modern web technologies to build intuitive apps." 
        },
        { 
            icon: faCommentSlash, 
            text: "Trouble Communicating", 
            details: "I sometimes struggle to express myself clearly, so please be patient!" 
        },
        { 
            icon: faHeart, 
            text: "Taken (love you cooper :3)", 
            details: "In a committed relationship with my wonderful partner, Cooper." 
        },
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleOpen = (index: number) => {
        // Toggle or close if the same one is clicked
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={`w-full max-w-md bg-stone-50/80 dark:bg-stone-900/80 p-8 rounded border border-stone-300/50 dark:border-stone-700/50 relative transition-all duration-1000 ${fadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ filter: fadeIn ? 'none' : 'blur(4px)' }}>
            
            <p className='font-extrabold text-3xl mb-8 pb-4 border-b border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 flex items-center gap-2'>
                <FontAwesomeIcon icon={faUser} className='text-stone-500 text-xl'/>
                User Bio
            </p>

            <div className='flex flex-col gap-3'>
                {bioItems.map((item, index) => {
                    const isExpanded = openIndex === index;
                    const chevronIcon = isExpanded ? faChevronUp : faChevronDown;

                    return (
                        <div key={index} 
                             // Added border for a cleaner, defined look consistent with other components
                             className={`overflow-hidden rounded border border-stone-300 dark:border-stone-700/50 transition-all duration-300 ${isExpanded ? 'shadow-lg' : 'shadow-md'}`}>
                            
                            {/* Header/Toggle Button: Consistent style with subtle hover/expanded shift */}
                            <button 
                                onClick={() => toggleOpen(index)}
                                className={`flex items-center w-full text-left gap-3 px-3 py-2 
                                            transition duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500/50
                                            ${isExpanded 
                                                ? 'bg-stone-300/80 dark:bg-stone-700/80' // Slightly different background when open
                                                : 'bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700'
                                            }`}
                            >
                                {/* Icon */}
                                <FontAwesomeIcon 
                                    icon={item.icon} 
                                    className={`text-lg`}
                                />
                                
                                {/* Text Content */}
                                <span className='font-semibold text-base flex-grow text-stone-900 dark:text-stone-100'>
                                    {item.text}
                                </span>
                                
                                {/* Dropdown Chevron */}
                                <FontAwesomeIcon 
                                    icon={chevronIcon} 
                                    className={`text-sm text-stone-600 dark:text-stone-400 transform transition-transform duration-300`}
                                />
                            </button>

                            {/* Collapsible Content Area: Smoother animation using longer duration and better easing */}
                            <div 
                                // Added `duration-500` for a smoother, slower expansion
                                className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                            >
                                <div className='overflow-hidden'>
                                    <p className='p-4 text-sm text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-900 border-t border-stone-300 dark:border-stone-700'>
                                        {item.details}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}