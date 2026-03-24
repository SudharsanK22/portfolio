import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Mail, User, Briefcase } from 'lucide-react';
import SkillCard from './SkillCard';
import ShinyText from './ShinyText';
import ps_image from '../assets/ps_image.jpeg';
import coding_bg from '../assets/coding_bg.png';
import robot_photo from '../assets/photo.jpg';
import rfid_photo from '../assets/1.avif';
import iot_demo from '../assets/iot_demo.png';

const Home = () => {
  const containerRef = useRef(null);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative">
      {/* SECTION 1: HOME (Hero) */}
      <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background element removed for minimalist theme */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-sm mb-4">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              
            </div>
            <h2 className="text-lg font-medium text-blue-500 tracking-wider uppercase">Hi, I'm Sudharsan</h2>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white">
              Sudharsan
            </h1>
            <p className="text-xl text-slate-400 max-w-lg">
              Robotics & Automation Engineer | Software Developer
            </p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="pt-4"
            >
              <div className="space-y-4">
                <div className="text-xl font-bold leading-relaxed">
                  <ShinyText 
                    text="I have hands-on experience building real-world projects using Python, Arduino, Raspberry Pi, and OpenCV. Passionate about innovation, I enjoy developing smart solutions that integrate hardware and software. I am eager to contribute and grow in a dynamic tech-driven environment."
                    color="#ffffff"
                    shineColor="#22d3ee"
                    speed={3}
                  />
                </div>
                <p className="text-sm text-slate-400 italic">
                  "Innovation happens when you look where others don't."
                </p>
              </div>
            </motion.div>
            <div className="flex gap-4 pt-4">
              <a href="#about" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">About Me</a>
              <a href="#projects" className="px-8 py-3 border border-slate-700 hover:border-slate-500 rounded-lg transition-all text-slate-300 font-medium">View My Work</a>
            </div>
          </motion.div>

          {/* Right Section: Profile Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 flex justify-center md:justify-end"
          >
            <div className="relative group w-full max-w-[340px] md:max-w-md">
              {/* Outer Decorative Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-purple-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/40 backdrop-blur-xl p-3 shadow-2xl">
                {!imgError ? (
                  <img 
                    src={ps_image} 
                    alt="Sudharsan" 
                    onError={() => setImgError(true)}
                    className="w-full h-auto aspect-[4/5] object-cover rounded-[2rem] group-hover:scale-[1.03] transition-transform duration-700 brightness-[1.1]"
                  />
                ) : (
                  <div className="w-full aspect-[4/5] bg-slate-800/50 rounded-[2rem] flex flex-col items-center justify-center text-slate-500 gap-4">
                    <div className="p-6 bg-blue-500/10 rounded-full text-blue-400/80">
                      <User size={64} />
                    </div>
                    <span className="text-sm font-medium opacity-40">Profile Photo Placeholder</span>
                  </div>
                )}
                
                {/* Subtle Glass Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: ABOUT ME */}
      <section id="about" className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
          {/* Main Content Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                About Me <span className="text-slate-700 font-light">|</span> <span className="text-slate-400 text-xl font-normal italic">Robotics & Automation Engineer</span>
              </h2>
              
              <div className="flex flex-col lg:flex-row gap-16 items-start">
                {/* Photo Column - Now on the Left */}
                <div className="flex-1 w-full max-w-md lg:max-w-xl group">
                  <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-3xl bg-slate-900 transition-transform duration-700 hover:scale-[1.02]">
                    <img 
                      src={coding_bg} 
                      alt="Coding and Automation" 
                      className="w-full h-full object-cover transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                    
                    {/* Decorative Corner Glow */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-[50px] rounded-full" />
                  </div>
                </div>

                {/* Text Column - Now on the Right */}
                <div className="flex-[1.5] text-white/90 leading-relaxed space-y-8 text-justify">
                  <p className="whitespace-pre-wrap text-xl md:text-2xl font-light">I am a passionate and detail-oriented IT professional with a Bachelor of Engineering in Robotics and Automation from Rajalakshmi Engineering College, along with a diploma in Mechatronics. I have a strong foundation in software development, embedded systems, and automation, with hands-on experience in building real-world projects.

I have developed projects such as an RFID-Based Traffic Violation Detection System and an Autonomous Delivery Robot using Aruco Marker Navigation, where I worked with technologies like Python, OpenCV, Arduino, Raspberry Pi, and MySQL. These experiences strengthened my ability to integrate hardware with software and solve practical problems efficiently.

I am skilled in Python, SQL, HTML, CSS, JavaScript, and familiar with modern development tools like PyCharm, Visual Studio, and Eclipse, along with Linux environments. My internship experience at TVS Sundram Fasteners Ltd. has helped me gain industry exposure and improve my teamwork, adaptability, and problem-solving skills.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2.5: SKILLS */}
      <section id="skills" className="relative min-h-screen py-24 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="space-y-4 mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Technical Skills
            </h2>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto">
              My technical expertise categorized by domain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            
            {/* HARDCODED LANGUAGES SECTION */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.0 }}>
              <SkillCard category="Languages" skills={[
                { name: "Python", level: 90, category: "Languages" },
               
                { name: "JavaScript", level: 90, category: "Languages" },
                { name: "SQL", level: 85, category: "Languages" }
              ]} />
            </motion.div>

            {/* HARDCODED FRONTEND SECTION */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <SkillCard category="Frontend" skills={[
                { name: "HTML", level: 95, category: "Frontend" },
                { name: "CSS", level: 95, category: "Frontend" },
                { name: "React", level: 90, category: "Frontend" },
                { name: "Tailwind CSS", level: 85, category: "Frontend" },
                { name: "Framer Motion", level: 80, category: "Frontend" }
              ]} />
            </motion.div>

            {/* HARDCODED BACKEND SECTION */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <SkillCard category="Backend" skills={[
                { name: "FastAPI", level: 80, category: "Backend" },
                { name: "MySQL", level: 85, category: "Backend" },
                { name: "MongoDB", level: 80, category: "Backend" }
              ]} />
            </motion.div>

            {/* HARDCODED TOOLS SECTION */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
              <SkillCard category="Tools" skills={[
                { name: "OpenCV", level: 85, category: "Tools" },
                { name: "Arduino", level: 80, category: "Tools" },
                { name: "Raspberry Pi", level: 80, category: "Tools" },
                { name: "Docker", level: 75, category: "Tools" },
                { name: "Git", level: 90, category: "Tools" },
                { name: "Linux", level: 80, category: "Tools" },
                { name: "Figma", level: 85, category: "Tools" },
                { name: "Canva", level: 85, category: "Tools" }
              ]} />
            </motion.div>

          </div>
        </div>
      </section>


      {/* SECTION 3: PROJECTS */}
      <section id="projects" className="relative min-h-screen py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              My Recent Work
            </h2>
            <p className="text-slate-500 text-xl max-w-2xl">
              A showcase of my recent creative endeavors and engineering solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* HARDCODED PROJECT 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-500 rounded-3xl overflow-hidden"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-950">
                <img 
                  src={rfid_photo} 
                  alt="RFID-Based Traffic Violation Detection System" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 gap-3">
                  {/* GitHub Link */}
                  <a href="#" target="_blank" rel="noreferrer" className="bg-slate-800 text-white p-3 rounded-full hover:bg-slate-700 transition-colors shadow-lg" title="View Source on GitHub">
                    <Github size={20} />
                  </a>
                  {/* Demo URL Link */}
                  <a href="#" target="_blank" rel="noreferrer" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-500 transition-colors shadow-lg" title="Live Demo">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">
                  RFID-Based Traffic Violation Detection System
                </h4>
                <p className="text-slate-400 text-sm line-clamp-2">
                  An automated system to detect traffic violations using RFID technology, integrated with hardware and software.
                </p>
              </div>
            </motion.div>

            {/* HARDCODED PROJECT 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-500 rounded-3xl overflow-hidden"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-950">
                <img 
                  src={robot_photo} 
                  alt="Autonomous Delivery Robot" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 gap-3">
                  {/* GitHub Link */}
                  <a href="#" target="_blank" rel="noreferrer" className="bg-slate-800 text-white p-3 rounded-full hover:bg-slate-700 transition-colors shadow-lg" title="View Source on GitHub">
                    <Github size={20} />
                  </a>
                  {/* Demo URL Link */}
                  <a href="#" target="_blank" rel="noreferrer" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-500 transition-colors shadow-lg" title="Live Demo">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">
                  Autonomous Delivery Robot
                </h4>
                <p className="text-slate-400 text-sm line-clamp-2">
                  A delivery robot that navigates autonomously using Aruco Marker Navigation, built with Python, OpenCV, and Raspberry Pi.
                </p>
              </div>
            </motion.div>

            {/* HARDCODED PROJECT 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-500 rounded-3xl overflow-hidden"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-950">
                <img 
                  src={iot_demo} 
                  alt="Smart IoT Automation Dashboard" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 gap-3">
                  {/* GitHub Link */}
                  <a href="#" target="_blank" rel="noreferrer" className="bg-slate-800 text-white p-3 rounded-full hover:bg-slate-700 transition-colors shadow-lg" title="View Source on GitHub">
                    <Github size={20} />
                  </a>
                  {/* Demo URL Link */}
                  <a href="#" target="_blank" rel="noreferrer" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-500 transition-colors shadow-lg" title="Live Demo">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">
                  Smart IoT Automation Dashboard
                </h4>
                <p className="text-slate-400 text-sm line-clamp-2">
                  A high-performance modern web dashboard for monitoring smart home sensors seamlessly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CONTACT */}
      <section id="contact" className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-center space-y-12"
          >
            <div className="space-y-4">
              <h2 className="text-5xl font-bold text-white">Get In Touch</h2>
              <p className="text-slate-400 text-xl">Let's work together on your next project.</p>
            </div>

            <div className="grid md:grid-cols-1 gap-6 max-w-md mx-auto">
                <a href="mailto:sudharsan@example.com" className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all group">
                  <div className="p-4 bg-blue-900/30 rounded-2xl text-blue-500 group-hover:scale-110 transition-transform"><Mail size={32} /></div>
                  <div className="space-y-1">
                    <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Email Me</p>
                    <p className="text-xl font-medium text-white break-all">sudharsan180302@gmail.com</p>
                  </div>
                </a>
            </div>

            <div className="flex justify-center gap-6 flex-wrap">
                <a href="https://github.com/SudharsanK22" target="_blank" rel="noreferrer" className="px-8 py-4 bg-slate-900 border border-slate-800 rounded-full hover:bg-slate-800 hover:border-slate-700 transition-all text-white font-medium">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/sudharsan-k-071950274/" target="_blank" rel="noreferrer" className="px-8 py-4 bg-slate-900 border border-slate-800 rounded-full hover:bg-slate-800 hover:border-slate-700 transition-all text-white font-medium">
                  LinkedIn
                </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
