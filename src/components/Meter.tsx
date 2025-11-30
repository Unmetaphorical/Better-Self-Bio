'use client'; // This must be a client component because it uses animations

import React from 'react';
import { motion } from 'framer-motion'; // Animation library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface MeterProps {
  label: string;          // The title of the meter (e.g., "Mental Health")
  value: number;          // The current value (e.g., 3.5)
  min: number;            // Minimum possible value
  max: number;            // Maximum possible value
  icon?: IconDefinition;  // Optional FontAwesome icon
  color?: string;         // Optional tailwind color class override
  leftLabel?: string;     // Text on the left of the bar (e.g., "Dysphoria")
  rightLabel?: string;    // Text on the right of the bar (e.g., "Euphoria")
}

export default function Meter({ 
  label, 
  value, 
  min, 
  max, 
  icon,
  color = "bg-blue-500", // Default color
  leftLabel,
  rightLabel
}: MeterProps) {

  // Calculate the percentage (0 to 100%) for the bar width
  // Formula: ((value - min) / (max - min)) * 100
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

  return (
    <div className="w-full mb-6">
      {/* Header Section: Label and Icon */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800 dark:text-gray-100">
          {icon && <FontAwesomeIcon icon={icon} />}
          {label}
        </h3>
        {/* Display the numerical value */}
        <span className="text-sm font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
          {value} / {max}
        </span>
      </div>

      {/* The Meter Track (Background Bar) */}
      <div className="relative h-6 w-full bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
        
        {/* The Animated Bar */}
        {/* motion.div allows us to animate the 'width' property */}
        <motion.div 
          className={`h-full ${color}`}
          initial={{ width: 0 }} // Start at 0 width
          animate={{ width: `${percentage}%` }} // Animate to calculated %
          transition={{ duration: 1.5, ease: "easeOut" }} // Takes 1.5 seconds to fill
        />
      </div>

      {/* Optional Range Labels (for Dysphoria/Euphoria context) */}
      {(leftLabel || rightLabel) && (
        <div className="flex justify-between text-xs text-gray-500 mt-1 uppercase font-semibold">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      )}
    </div>
  );
}