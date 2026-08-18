import React from 'react';

export default function Logo({ height = 46, light = false, className = '' }) {
  const textColor = light ? '#FFFFFF' : '#1C1C1C';
  const subColor = light ? '#52B788' : '#1C5C53';
  const lineBg = light ? 'rgba(255,255,255,0.25)' : '#E7E5E0';
  const lineAccent = light ? '#52B788' : '#1C5C53';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 120"
      style={{ height: `${height}px`, width: 'auto', display: 'block' }}
      className={className}
      aria-label="Assemble Distribution Logo"
    >
      <defs>
        <filter id={`logoShadow-${light ? 'light' : 'dark'}`} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity={light ? "0.3" : "0.12"} />
        </filter>
      </defs>

      {/* LOGO MARK / ICON */}
      <g transform="translate(10, 10)" filter={`url(#logoShadow-${light ? 'light' : 'dark'})`}>
        {/* Category Block 1: Apparel (Deep Teal) */}
        <path d="M 20 20 L 45 20 A 5 5 0 0 1 50 25 L 50 50 L 25 50 A 5 5 0 0 1 20 45 Z" fill="#1C5C53" />

        {/* Category Block 2: Art & Craft (Dark Teal Accent) */}
        <path d="M 55 20 L 80 20 A 5 5 0 0 1 85 25 L 85 45 A 5 5 0 0 1 80 50 L 55 50 Z" fill="#134943" />

        {/* Category Block 3: Toys & Games (Neutral Gray) */}
        <path d="M 20 55 L 45 55 L 50 55 L 50 75 A 5 5 0 0 1 45 80 L 25 80 A 5 5 0 0 1 20 75 Z" fill="#6B6F6E" />

        {/* Category Block 4: Garden & Outdoor (Light Teal Accent) */}
        <path d="M 55 55 L 80 55 A 5 5 0 0 1 85 60 L 85 75 A 5 5 0 0 1 80 80 L 55 80 Z" fill="#2A8377" />

        {/* Central Interlocking Core Element */}
        <circle cx="52.5" cy="52.5" r="7.5" fill="#FBFAF8" />
        <circle cx="52.5" cy="52.5" r="4" fill="#1C1C1C" />
      </g>

      {/* TYPOGRAPHY */}
      <text
        x="115"
        y="62"
        fontFamily="'Poppins', system-ui, -apple-system, sans-serif"
        fontSize="38"
        fontWeight="700"
        letterSpacing="1.5"
        fill={textColor}
      >
        ASSEMBLE
      </text>

      <text
        x="117"
        y="85"
        fontFamily="'Poppins', system-ui, -apple-system, sans-serif"
        fontSize="14"
        fontWeight="600"
        letterSpacing="6"
        fill={subColor}
      >
        DISTRIBUTION
      </text>

      <rect x="117" y="93" width="225" height="2" fill={lineBg} rx="1" />
      <rect x="117" y="93" width="50" height="2" fill={lineAccent} rx="1" />
    </svg>
  );
}
