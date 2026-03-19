import React, { useState, useEffect } from 'react';
import api from '../api';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Mail, Phone, MapPin } from 'lucide-react';
import GradientText from './GradientText';
import StarBorder from './StarBorder';
import AnimatedContent from './AnimatedContent';
import Orb from './Orb';
import RainbowButton from './RainbowButton';
import SkillCard from './SkillCard';

const Home = () => {
  const [data, setData] = useState({ home: null, about: null, skills: [], projects: [], contact: null, settings: null });
  const [loading, setLoading] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleTilt = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 22;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -22;
    setTilt({ x, y });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });

  useEffect(() => {
    const fetchAll = async () => {
        try {
            const [home, about, skills, projects, contact, settings] = await Promise.all([
                api.get('/content/home'),
                api.get('/content/about'),
                api.get('/content/skills'),
                api.get('/content/projects'),
                api.get('/content/contact'),
                api.get('/content/settings')
            ]);
            setData({ 
                home: home.data, 
                about: about.data, 
                skills: skills.data, 
                projects: projects.data, 
                contact: contact.data,
                settings: settings.data
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    fetchAll();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl font-medium">Building your experience...</div>;

  return (
    <div className="relative">
      {/* SECTION 1: WELCOME (Hero + Orb Background) */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Orb
            hoverIntensity={2}
            rotateOnHover
            hue={0}
            forceHoverState={false}
            backgroundColor="#000000"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-6"
          >
            <h2 className="text-lg font-medium text-primary-400 tracking-wider uppercase">{data.home?.welcome_text || "Hi, I'm Sudharsan"}</h2>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              <GradientText
                colors={["#5227FF","#FF9FFC","#B19EEF"]}
                animationSpeed={8}
                showBorder={false}
              >
                {data.home?.title}
              </GradientText>
            </h1>
            <p className="text-xl text-slate-400 max-w-lg">
              {data.home?.subtitle}
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#work" className="btn-primary">{data.home?.view_work_label || "View My Work"}</a>
              <a href="#profile" className="px-6 py-2 border border-slate-700 rounded-lg hover:bg-white/5 transition-all">{data.home?.about_me_label || "About Me"}</a>
            </div>
          </motion.div>
          
          {data.home?.hero_image && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex-1 flex items-center justify-center"
            >
              <div
                className="relative"
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                style={{ perspective: '900px' }}
              >
                {/* Orbiting particles */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-10 pointer-events-none"
                >
                  <div className="absolute top-1/2 left-0 w-3 h-3 -translate-y-1/2 rounded-full bg-[#5227FF] shadow-[0_0_12px_4px_#5227FF88]" />
                  <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 rounded-full bg-[#FF9FFC] shadow-[0_0_10px_3px_#FF9FFC88]" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-10 pointer-events-none"
                >
                  <div className="absolute bottom-0 left-1/2 w-2.5 h-2.5 -translate-x-1/2 rounded-full bg-[#B19EEF] shadow-[0_0_10px_3px_#B19EEF88]" />
                  <div className="absolute top-1/2 right-0 w-2 h-2 -translate-y-1/2 rounded-full bg-[#FF9FFC] shadow-[0_0_8px_2px_#FF9FFC88]" />
                </motion.div>

                {/* Background glow blob */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#5227FF]/30 via-[#FF9FFC]/20 to-[#B19EEF]/30 blur-3xl rounded-full scale-110 pointer-events-none" />

                {/* 3D tilt card */}
                <div
                  style={{
                    transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                    transition: 'transform 0.12s ease-out',
                    transformStyle: 'preserve-3d',
                  }}
                  className="relative z-10"
                >
                  {/* Neon border */}
                  <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-[#5227FF] via-[#FF9FFC] to-[#B19EEF] opacity-80" />

                  {/* Cinematic clip-path reveal */}
                  <motion.div
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    animate={{ clipPath: 'inset(0 0% 0 0)' }}
                    transition={{ duration: 1, ease: [0.77, 0, 0.175, 1], delay: 0.4 }}
                    className="relative rounded-3xl overflow-hidden"
                  >
                    <img
                      src={`http://localhost:8008${data.home.hero_image}`}
                      alt="Hero"
                      className="w-full max-w-sm object-cover block"
                      style={{ maxHeight: '460px' }}
                    />
                    {/* Hover shimmer sweep */}
                    <motion.div
                      initial={{ x: '-100%', opacity: 0 }}
                      whileHover={{ x: '200%', opacity: 0.15 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 pointer-events-none"
                    />
                    {/* Bottom vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* SECTION 2: PROFILE (About + Skills) */}
      <section id="profile" className="min-h-screen flex items-center justify-center py-24">
        <div className="max-w-7xl mx-auto px-6 w-full space-y-24">
          <div className="space-y-12">
              <h2 className="text-4xl font-bold flex items-center gap-4">
                <GradientText
                  colors={["#5227FF","#FF9FFC","#B19EEF"]}
                  animationSpeed={6}
                >
                  {data.about?.section_title || "My Profile"}
                </GradientText>
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  {data.about?.profile_image && (
                      <img src={`http://localhost:8008${data.about.profile_image}`} alt="Profile" className="w-full max-w-sm rounded-2xl shadow-xl border-4 border-slate-900" />
                  )}
                  <div className="text-lg text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {data.about?.description}
                  </div>
              </div>
          </div>

          <div className="space-y-12">
            <h3 className="text-2xl font-bold text-slate-400 uppercase tracking-widest">{data.settings?.skills_section_title || "Technical Skills"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-5xl">
              {Object.entries(
                data.skills.reduce((acc, skill) => {
                  const cat = skill.category || "General";
                  if (!acc[cat]) acc[cat] = [];
                  acc[cat].push(skill);
                  return acc;
                }, {})
              ).map(([category, skills], idx) => (
                <AnimatedContent
                  key={category}
                  distance={50}
                  direction="vertical"
                  delay={idx * 0.1}
                  duration={0.6}
                >
                  <SkillCard category={category} skills={skills} />
                </AnimatedContent>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WORK & CONNECT (Projects + Contact) */}
      <section id="work" className="min-h-screen flex items-center justify-center py-24">
        <div className="max-w-7xl mx-auto px-6 w-full space-y-24">
          <div className="space-y-12">
              <h2 className="text-4xl font-bold flex items-center gap-4">
                <GradientText
                  colors={["#5227FF","#FF9FFC","#B19EEF"]}
                  animationSpeed={6}
                >
                  {data.settings?.projects_section_title || "Recent Work"}
                </GradientText>
              </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.projects.map(project => (
                <div key={project._id} className="group glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all border border-white/5">
                  {project.image_url && (
                    <div className="relative overflow-hidden h-48">
                        <img src={`http://localhost:8008${project.image_url}`} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            {project.link && <a href={project.link} target="_blank" className="p-3 bg-white rounded-full text-black hover:scale-110 transition-transform"><ExternalLink size={20} /></a>}
                        </div>
                    </div>
                  )}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-primary-400">{project.title}</h3>
                    <p className="text-slate-400 text-sm line-clamp-3">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="contact" className="space-y-12 bg-slate-900/40 p-12 rounded-3xl border border-white/5 backdrop-blur-sm">
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-primary-400">{data.contact?.section_title || "Get In Touch"}</h2>
                <p className="text-slate-400">{data.contact?.subtitle || "Let's work together on your next project"}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-12">
                {data.contact?.email && (
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white min-w-[250px] border border-slate-200 shadow-sm">
                        <div className="p-3 bg-primary-100 rounded-xl text-primary-600"><Mail /></div>
                        <div><p className="text-sm text-slate-500">Email Me</p><p className="font-semibold text-black">{data.contact.email}</p></div>
                    </div>
                )}
                {data.contact?.phone && (
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white min-w-[250px] border border-slate-200 shadow-sm">
                        <div className="p-3 bg-green-100 rounded-xl text-green-600"><Phone /></div>
                        <div><p className="text-sm text-slate-500">Call Me</p><p className="font-semibold text-black">{data.contact.phone}</p></div>
                    </div>
                )}
            </div>
            <div className="flex justify-center gap-6 pt-8">
                {data.contact?.social_links?.map((social, idx) => (
                    <a key={idx} href={social.url} target="_blank" className="p-4 glass rounded-full hover:bg-primary-600 transition-all font-medium border border-white/5">
                        {social.platform}
                    </a>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
