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
  const accent = categoryAccent[category] || categoryAccent["General"];
  const IconComp = categoryIcons[category] || categoryIcons["General"];

  return (
    <div className="h-full group/main">
      <GlareCard className="h-full">
        {/* Card body — Refined deep dark aesthetic */}
        <div className="relative h-full bg-[#03030b] flex flex-col gap-6 p-6 rounded-[2rem] overflow-hidden border border-white/5">
          
          {/* Background Ambient Glow */}
          <div 
            className="absolute -top-24 -left-24 w-64 h-64 rounded-full blur-[100px] opacity-15 transition-opacity duration-500 group-hover/main:opacity-25"
            style={{ background: accent }}
          />

          {/* Header Section — Scaled Down */}
          <div className="flex items-center gap-4 relative z-10">
            <div className="relative group">
              <div 
                className="absolute -inset-1.5 rounded-full blur-md opacity-10 group-hover:opacity-30 transition-opacity duration-300"
                style={{ background: accent }}
              />
              <div className="relative w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-2xl shadow-xl">
                <IconComp size={24} className="text-white/80 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white tracking-widest uppercase opacity-90">{category}</h3>
          </div>

          {/* Skill Capsules List — Scaled Down */}
          <div className="space-y-4 relative z-10 flex-grow">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill._id || skill.id || idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="relative group/capsule"
              >
                {/* Compact Glass Capsule */}
                <div className="relative overflow-hidden rounded-[1.5rem] bg-white/[0.03] border border-white/5 p-4 backdrop-blur-xl transition-all duration-500 group-hover/capsule:bg-white/[0.07] group-hover/capsule:border-white/15 group-hover/capsule:scale-[1.01] shadow-lg">
                  
                  {/* Subtle Glassy Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />
                  
                  {/* Skill Text Layer — Smaller Fonts */}
                  <div className="flex justify-between items-center mb-3 px-1">
                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-[0.2em]">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-medium text-white/30 font-mono tracking-tighter">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Refined Progress Bar */}
                  <div className="relative h-[4px] w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-white/[0.01]" />
                    
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1], delay: idx * 0.12 }}
                      viewport={{ once: true }}
                      className="h-full rounded-full relative overflow-hidden"
                      style={{ 
                        background: `linear-gradient(90deg, ${accent}aa 0%, #fff 100%)`, 
                        boxShadow: `0 0 12px ${accent}33`
                      }}
                    >
                      {/* Animated Shimmer */}
                      <motion.div 
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[45deg]"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Corner Ambient Glow */}
          <div 
            className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-[120px] opacity-10"
            style={{ background: accent }}
          />

        </div>
      </GlareCard>
    </div>
  );
};

export default SkillCard;
