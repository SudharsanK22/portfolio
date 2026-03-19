import React, { useEffect, useRef } from 'react';

const AtmosphericOverlay = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let particles = [];
    const particleCount = 40;

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
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        this.growing = Math.random() > 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.growing) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= 0.6) this.growing = false;
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
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.3})`;
        ctx.fill();
        
        // Add a subtle glow to particles
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(255, 255, 255, 0.2)";
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

    window.addEventListener('resize', resize);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Canvas Particle Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Cinematic Noise Texture Overlay */}
      <div className="absolute inset-0 mix-blend-overlay opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Soft Sweeping Light Beams */}
      <svg className="absolute inset-0 w-full h-full opacity-20 filter blur-[100px]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(147, 51, 234, 0.1)" />
            <stop offset="100%" stopColor="transparent" />
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
