import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Briefcase, Mail, Zap } from 'lucide-react';

const Navbar = () => {
  const brandName = 'Sudharsan.';

  const publicLinks = [
    { name: 'Home', path: '/#home', icon: <Home size={20} /> },
    { name: 'About', path: '/#about', icon: <User size={20} /> },
    { name: 'Skills', path: '/#skills', icon: <Zap size={20} /> },
    { name: 'Projects', path: '/#projects', icon: <Briefcase size={20} /> },
    { name: 'Contact', path: '/#contact', icon: <Mail size={20} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
        {brandName}
      </h1>
      
      <div className="flex items-center gap-8">
        <div className="hidden md:flex gap-6">
          {publicLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `flex items-center gap-2 hover:text-white transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
