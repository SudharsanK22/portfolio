import React from 'react';
import { motion } from 'framer-motion';

const RainbowButton = ({ children, className = "" }) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated continuous rainbow border */}
      <div className="absolute -inset-[2px] rounded-xl bg-[linear-gradient(45deg,#ff0000,#ff7300,#fffb00,#48ff00,#00ffd5,#002bff,#7a00ff,#ff00c8,#ff0000)] bg-[length:400%_400%] animate-[rainbow_4s_linear_infinite] opacity-70 blur-[1px]"></div>
      
      {/* Pulsing glow background */}
      <div className="absolute -inset-[4px] rounded-xl bg-[linear-gradient(45deg,#ff0000,#ff7300,#fffb00,#48ff00,#00ffd5,#002bff,#7a00ff,#ff00c8,#ff0000)] bg-[length:400%_400%] animate-[rainbow_8s_linear_infinite] opacity-20 filter blur-xl group-hover:opacity-40 transition-opacity"></div>

      <button className="relative w-full h-full px-8 py-4 bg-[#050010] hover:bg-[#0a001a] text-white font-bold text-lg rounded-[10px] transition-colors flex items-center justify-center tracking-wider uppercase">
        {children}
        
        {/* Subtle white shimmer sweep */}
        <motion.div
           initial={{ x: '-100%' }}
           animate={{ x: '100%' }}
           transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
           className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
        />
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
    </div>
  );
};

export default RainbowButton;
