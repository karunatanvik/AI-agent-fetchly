import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Main F shape with gradient */}
        <path
          d="M8 32 L8 8 L28 8 L28 12 L12 12 L12 18 L24 18 L24 22 L12 22 L12 32 Z"
          fill="url(#fetchlyGradient)"
        />
        
        {/* Network nodes */}
        <circle cx="30" cy="10" r="2" fill="#60A5FA" className="animate-pulse" />
        <circle cx="26" cy="16" r="1.5" fill="#34D399" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        <circle cx="32" cy="20" r="1.5" fill="#F59E0B" className="animate-pulse" style={{ animationDelay: '1s' }} />
        <circle cx="28" cy="26" r="2" fill="#EF4444" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Connection lines */}
        <path
          d="M28 8 L30 10 M24 18 L26 16 M24 22 L32 20 M12 32 L28 26"
          stroke="url(#connectionGradient)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
          className="animate-pulse"
        />
        
        {/* Speed lines for motion effect */}
        <path
          d="M32 8 L36 6 M34 12 L38 10 M36 16 L40 14"
          stroke="#FF6B35"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
        
        {/* Gradients */}
        <defs>
          <linearGradient id="fetchlyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};