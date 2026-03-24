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
    <div className="group/main">
      <GlareCard className="rounded-[2.5rem]">
        {/* Card body — Deep blue backdrop with diagonal beams */}
        <div className="relative bg-[#030712] flex flex-col gap-5 p-6 rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 group-hover/main:border-blue-500/30">
          
          {/* Subtle Diagonal Beam Backdrop */}
          <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[linear-gradient(135deg,transparent_45%,#1e3a8a_50%,transparent_55%)] blur-3xl animate-pulse" />
          </div>

          {/* Header Section — Premium Rounded Icon and Bold Title */}
          <div className="flex items-center gap-4 relative z-10 p-1">
            <div className="relative">
              {/* Outer Glow Ring */}
              <div className="absolute -inset-2 bg-blue-500/20 blur-xl rounded-full opacity-50 group-hover/main:opacity-100 transition-opacity" />
              <div className="relative w-12 h-12 rounded-full bg-slate-800/60 border-2 border-slate-700/50 flex items-center justify-center shadow-inner">
                <IconComp size={24} className="text-white/90 drop-shadow-md" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-sm">{category}</h3>
          </div>

          {/* Skill List - Clean Pill Buttons */}
          <div className="flex flex-wrap gap-3 relative z-10 pb-2">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill._id || skill.id || idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="bg-[#0f172a]/80 hover:bg-[#1e293b] backdrop-blur-md transition-all duration-300 text-slate-200 font-medium text-[14px] px-5 py-2.5 rounded-full shadow-lg flex items-center gap-3 cursor-default border border-slate-700/50 hover:border-slate-500 hover:-translate-y-0.5 group/darkbtn">
                  <span className="tracking-wide font-bold">{skill.name}</span>
                  <span className="text-[11px] font-black px-2 py-1 rounded-full ml-auto bg-[#020617] border border-slate-700/50 text-slate-300 shadow-inner group-hover/darkbtn:text-white transition-colors">
                    {skill.level}%
                  </span>
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
