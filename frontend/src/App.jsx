import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home';
import Orb from './pages/Orb';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950 text-slate-300 relative overflow-x-hidden">
          {/* Top Orb Background */}
          <div className="absolute top-0 left-0 right-0 h-[800px] z-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 opacity-40">
              <Orb
                hue={0}
                hoverIntensity={2}
                rotateOnHover
                forceHoverState={false}
                backgroundColor="#020617"
              />
            </div>
            {/* Smooth transition to the dark bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950" />
          </div>

          <div className="relative z-10">
            <Navbar />
            <main className="pt-24">
              <Routes>
                <Route path="/" element={<Home />} />
              <Route path="/about" element={<Home />} />
              <Route path="/skills" element={<Home />} />
              <Route path="/projects" element={<Home />} />
              <Route path="/contact" element={<Home />} />
            </Routes>
          </main>
          <Toaster position="bottom-right" toastOptions={{
            style: { background: '#1e293b', color: '#fff', border: '1px solid #334155' }
          }} />
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
