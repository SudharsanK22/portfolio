import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Globe, Database, PencilRuler, Terminal, Wrench } from 'lucide-react';
import { GlareCard } from './GlareCard';

// Per-category accent color
const categoryAccent = {
  "Languages": "#6366f1",
  "Frontend":  "#14b8a6",
  "Backend":   "#f59e0b",
  "Tools":     "#02efff", // Cyan like the user's image
  "Design":    "#a855f7",
  "Core":      "#22c55e",
  "General":   "#5227FF",
};

const categoryIcons = {
  "Languages": Code2,
  "Frontend":  Globe,
  "Backend":   Database,
  "Tools":     Wrench,
  "Design":    PencilRuler,
  "Core":      Cpu,
  "General":   Code2,
};

const SkillCard = ({ category, skills }) => {
  const IconComp = categoryIcons[category] || categoryIcons["General"];

  return (
    <div className="h-full group/main">
      <GlareCard className="h-full rounded-[2.5rem]">
        {/* Card body — Deep blue backdrop with diagonal beams */}
        <div className="relative h-full bg-[#030712] flex flex-col gap-8 p-8 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 group-hover/main:border-blue-500/30">
          
          {/* Subtle Diagonal Beam Backdrop */}
          <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[linear-gradient(135deg,transparent_45%,#1e3a8a_50%,transparent_55%)] blur-3xl animate-pulse" />
          </div>

          {/* Header Section — Premium Rounded Icon and Bold Title */}
          <div className="flex items-center gap-6 relative z-10 p-2">
            <div className="relative">
              {/* Outer Glow Ring */}
              <div className="absolute -inset-2 bg-blue-500/20 blur-xl rounded-full opacity-50 group-hover/main:opacity-100 transition-opacity" />
              <div className="relative w-16 h-16 rounded-full bg-slate-800/60 border-4 border-slate-700/50 flex items-center justify-center shadow-inner">
                <IconComp size={32} className="text-white/90 drop-shadow-md" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-white tracking-tight drop-shadow-sm">{category}</h3>
          </div>

          {/* Skill Items — Rounded "Capsule" Pill-Shaped Glass Items */}
          <div className="space-y-6 relative z-10 flex-grow pb-4">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill._id || skill.id || idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Minimalist Glass Capsule */}
                <div className="relative overflow-hidden rounded-full bg-[#111827]/80 border border-white/10 backdrop-blur-xl px-7 py-6 shadow-xl group/capsule hover:bg-[#1f2937] transition-colors duration-300">
                  
                  {/* Subtle Gloss Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                  
                  {/* Label and Percentage — Bold All-Caps */}
                  <div className="flex justify-between items-center mb-4 relative z-10">
                    <span className="text-sm font-black text-white uppercase tracking-[0.1em] drop-shadow-sm">
                      {skill.name}
                    </span>
                    <span className="text-sm font-black text-white tracking-tighter drop-shadow-sm">
                      {skill.level}%
                    </span>
                  </div>

                  {/* High-Contrast Neon Progress Bar */}
                  <div className="relative h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
                      viewport={{ once: true }}
                      className="h-full rounded-full bg-[#02efff] shadow-[0_0_12px_rgba(2,239,255,0.6)]"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </GlareCard>
    </div>
  );
};

export default SkillCard;
