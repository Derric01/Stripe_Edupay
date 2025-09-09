import React from 'react';

interface EduPayLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const EduPayLogo: React.FC<EduPayLogoProps> = ({ 
  className = "", 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle with Gradient */}
        <defs>
          <linearGradient id="eduPayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f3f4f6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main Circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#eduPayGradient)"
          filter="url(#glow)"
          className="drop-shadow-2xl"
        />
        
        {/* Book Icon */}
        <g transform="translate(25, 25)">
          {/* Book Base */}
          <rect
            x="10"
            y="15"
            width="30"
            height="35"
            rx="3"
            fill="url(#bookGradient)"
            stroke="#8b5cf6"
            strokeWidth="1.5"
          />
          
          {/* Book Pages */}
          <rect x="12" y="20" width="26" height="2" fill="#8b5cf6" opacity="0.6" rx="1" />
          <rect x="12" y="25" width="20" height="2" fill="#ec4899" opacity="0.6" rx="1" />
          <rect x="12" y="30" width="24" height="2" fill="#f59e0b" opacity="0.6" rx="1" />
          <rect x="12" y="35" width="18" height="2" fill="#8b5cf6" opacity="0.6" rx="1" />
          
          {/* Graduation Cap */}
          <g transform="translate(15, 5)">
            {/* Cap Top */}
            <polygon
              points="10,10 30,10 25,15 15,15"
              fill="#fbbf24"
              stroke="#f59e0b"
              strokeWidth="1"
            />
            {/* Cap Base */}
            <ellipse
              cx="20"
              cy="12"
              rx="12"
              ry="3"
              fill="#f59e0b"
            />
            {/* Tassel */}
            <circle cx="28" cy="10" r="1.5" fill="#ec4899" />
            <line x1="28" y1="11.5" x2="30" y2="16" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>
        
        {/* Dollar Sign for Payment */}
        <g transform="translate(65, 65)">
          <circle cx="10" cy="10" r="8" fill="#10b981" className="animate-pulse" />
          <text x="10" y="15" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">$</text>
        </g>
        
        {/* Sparkle Effects */}
        <g className="animate-pulse">
          <circle cx="20" cy="25" r="1.5" fill="#fbbf24" opacity="0.8" />
          <circle cx="80" cy="35" r="1" fill="#ec4899" opacity="0.6" />
          <circle cx="75" cy="20" r="1.2" fill="#8b5cf6" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
};

export default EduPayLogo;
