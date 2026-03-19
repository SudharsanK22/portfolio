import React, { useRef } from "react";

/**
 * Aceternity-style GlareCard — a card with a live mouse-tracking glare/shine effect.
 * Drop-in compatible: wrap any content with <GlareCard className="...">children</GlareCard>
 */
export function GlareCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !glareRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // Tilt: max ±15deg
    const rotateX = ((y - cy) / cy) * -15;
    const rotateY = ((x - cx) / cx) * 15;

    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;

    // Move glare highlight
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    glareRef.current.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255,255,255,0.18) 0%, transparent 60%)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glareRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    glareRef.current.style.background = "transparent";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glare overlay */}
      <div
        ref={glareRef}
        className="absolute inset-0 z-20 pointer-events-none rounded-3xl transition-all duration-100"
      />
      {children}
    </div>
  );
}
