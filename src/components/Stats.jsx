'use client';

import React, { useEffect, useState, useRef } from 'react';

const defaultStats = [
  {
    id: 'stat-products',
    value: 10000,
    suffix: '+',
    heading: 'Products Available',
    sub: 'Wholesale items ready for dispatch',
  },
  {
    id: 'stat-brands',
    value: 500,
    suffix: '+',
    heading: 'Trusted Brands',
    sub: 'Verified global manufacturers & partners',
  },
  {
    id: 'stat-support',
    special: '24/7',
    heading: 'Customer Support',
    sub: 'Dedicated B2B managers on standby',
  },
  {
    id: 'stat-fulfillment',
    value: 99,
    suffix: '%',
    heading: 'Fulfillment Rate',
    sub: 'On-time delivery and accuracy guarantee',
  },
];

function CounterItem({ stat }) {
  const [count, setCount] = useState(0);
  const itemRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (stat.special) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const end = stat.value;
          const duration = 2000; // 2 seconds
          const frameDuration = 1000 / 60; // 60 FPS
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease out cubic for smooth animation
            const currentCount = Math.round(end * (1 - Math.pow(1 - progress, 3)));

            setCount(currentCount);

            if (frame >= totalFrames) {
              clearInterval(counter);
              setCount(end);
            }
          }, frameDuration);
        }
      },
      { threshold: 0.2 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [stat, hasAnimated]);

  const displayFormatted = () => {
    if (stat.special) return stat.special;
    
    if (stat.value >= 10000) {
      if (count >= 10000) return '10K+';
      const kValue = (count / 1000).toFixed(count > 1000 ? 1 : 0);
      return `${kValue}K+`;
    }
    
    return `${count}${stat.suffix || ''}`;
  };

  return (
    <div className="stat-item stat-item--animated" ref={itemRef} id={stat.id}>
      <h3 className="stat-item__number">{displayFormatted()}</h3>
      <p className="stat-item__heading">{stat.heading}</p>
      {stat.sub && <p className="stat-item__sub">{stat.sub}</p>}
    </div>
  );
}

export default function Stats({ items = defaultStats, title }) {
  return (
    <section className="stats" aria-label="Company statistics">
      <div className="container">
        {title && (
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="eyebrow">Key Metrics</span>
            <h2 className="section-h2">{title}</h2>
          </div>
        )}
        <div className="stats__grid">
          {items.map((stat) => (
            <CounterItem key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
