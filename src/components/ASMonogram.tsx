import React from 'react';

interface ASMonogramProps {
  className?: string;
  size?: number;
  animated?: boolean;
  glow?: boolean;
}

export const ASMonogram: React.FC<ASMonogramProps> = ({
  className = '',
  size = 48,
  animated = false,
  glow = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="as-gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#e2e8f0" />
            <stop offset="75%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <linearGradient id="as-gradient-chrome" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <filter id="as-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Precision Hexagonal Frame / Kinetic Ring */}
        <polygon
          points="60,6 106,32 106,88 60,114 14,88 14,32"
          stroke="url(#as-gradient-chrome)"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          fill="rgba(10, 10, 15, 0.4)"
          className={animated ? 'animate-pulse-subtle' : ''}
        />

        {/* Secondary Accent Reticle Marks */}
        <line x1="60" y1="2" x2="60" y2="10" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.8" />
        <line x1="60" y1="110" x2="60" y2="118" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.8" />
        <circle cx="60" cy="60" r="48" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 6" />

        {/* Glow underlay for AS if glow enabled */}
        {glow && (
          <path
            d="M36 86 L60 28 L84 86 M45 66 L75 66 M72 44 C72 38, 54 36, 48 46 C42 56, 78 56, 72 74 C66 84, 46 84, 42 76"
            stroke="#38bdf8"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.3"
            filter="url(#as-glow)"
          />
        )}

        {/* The 'A' Letterform Geometric Base */}
        <path
          d="M36 86 L60 28 L84 86"
          stroke="url(#as-gradient-primary)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? 'animate-stroke-draw' : ''}
        />

        {/* The 'A' Crossbar (Refined Precision Segment) */}
        <line
          x1="45"
          y1="66"
          x2="75"
          y2="66"
          stroke="url(#as-gradient-primary)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* The Interlocking Fluid 'S' Letterform Curve */}
        <path
          d="M74 42 C74 36, 52 34, 48 45 C44 56, 76 56, 72 73 C68 83, 46 83, 40 76"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? 'animate-stroke-draw' : ''}
        />

        {/* Central Quantum Focal Point */}
        <circle cx="60" cy="56" r="3" fill="#38bdf8" />
      </svg>
    </div>
  );
};
