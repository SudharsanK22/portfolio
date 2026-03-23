import React, { useEffect, useRef } from 'react';

const AtmosphericOverlay = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let particles = [];
    const particleCount = 80; // Increased for better visibility

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1; // Larger "bubbles"
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.8; // More opaque
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        this.growing = Math.random() > 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.popping) {
          this.size += 0.5; // Grow fast
          this.opacity -= 0.1; // Fade fast
          if (this.opacity <= 0) this.reset();
          return;
        }

        if (this.growing) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= 0.8) this.growing = false;
        } else {
          this.opacity -= this.fadeSpeed;
          if (this.opacity <= 0) this.reset();
        }

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Warm white to golden particles for the morning theme
        ctx.fillStyle = this.size > 3 ? `rgba(255, 250, 230, ${this.opacity})` : `rgba(255, 255, 255, ${this.opacity * 0.8})`;
        ctx.fill();
        
        // Add a soft glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.size > 3 ? "rgba(255, 220, 100, 0.5)" : "rgba(255, 255, 255, 0.3)";
      }
    }

    const init = () => {
      resize();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleClick = (e) => {
      // Hit-test on bubbles
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      particles.forEach(p => {
        const dx = p.x - x;
        const dy = p.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < p.size + 15) { // 15px interaction radius
          p.popping = true;
        }
      });
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousedown', handleClick); // Use mousedown to feel more responsive
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousedown', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {/* Canvas Particle Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Cinematic Noise Texture Overlay */}
      <div className="absolute inset-0 mix-blend-overlay opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      {/* Soft Sweeping Light Beams */}
      <svg className="absolute inset-0 w-full h-full opacity-20 filter blur-[100px]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(200, 100, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(100, 50, 200, 0.1)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#beamGrad)">
          <animate 
            attributeName="opacity" 
            values="0.1;0.3;0.1" 
            dur="10s" 
            repeatCount="indefinite" 
          />
        </rect>
      </svg>
    </div>
  );
};

export default AtmosphericOverlay;
