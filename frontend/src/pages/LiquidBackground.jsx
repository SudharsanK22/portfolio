import React from 'react';
import { motion } from 'framer-motion';
import './LiquidBackground.css';

const LiquidBackground = ({ children, className = '' }) => {
  // Create multiple blobs with different sizes and animation paths
  const blobs = [
    { size: 100, delay: 0, duration: 18, x: [0, 50, -30, 0], y: [0, -40, 60, 0] },
    { size: 120, delay: 2, duration: 22, x: [0, -60, 40, 0], y: [0, 50, -30, 0] },
    { size: 80, delay: 4, duration: 20, x: [0, 40, -50, 0], y: [0, 30, -60, 0] },
    { size: 110, delay: 1, duration: 25, x: [-20, 30, 20, -20], y: [40, -20, 30, 40] },
  ];

  return (
    <div className={`liquid-container ${className}`}>
      {/* Root Background */}
      <div className="absolute inset-0 bg-white" />
      
      {/* Gooey Filter SVG (hidden) */}
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Animated Blobs with Gooey effect */}
      <div className="blobs-wrapper" style={{ filter: 'url(#goo)' }}>
        {blobs.map((blob, i) => (
          <motion.div
            key={i}
            className="blob"
            animate={{
              x: blob.x,
              y: blob.y,
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: blob.delay,
            }}
            style={{
              width: blob.size,
              height: blob.size,
              left: `${25 * (i + 1)}%`,
              top: '50%',
            }}
          />
        ))}
      </div>

      {/* Content Label */}
      <div className="relative z-10 flex items-center justify-center h-full">
        {children}
      </div>
    </div>
  );
};

export default LiquidBackground;
