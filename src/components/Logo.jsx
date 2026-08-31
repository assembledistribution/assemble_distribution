import React from 'react';

export default function Logo({ height = 46, light = false, className = '' }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/Assemble-distribution (1).png"
      alt="Assemble Distribution Logo"
      width={Math.round(height * 3.5)}
      height={height}
      style={{
        height: `${height}px`,
        width: 'auto',
        display: 'block',
        objectFit: 'contain',
        imageRendering: '-webkit-optimize-contrast',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
      }}
      className={className}
      draggable={false}
    />
  );
}
