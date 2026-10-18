import React, { useState, useEffect } from 'react';
import { portfolioContent } from '../data/translations';
import { Volume2, VolumeX, ArrowUpRight, Menu, X } from 'lucide-react';
import { ASMonogram } from './ASMonogram';

interface SpatialHUDProps {
  isMuted: boolean;
  onToggleSound: () => void;
}

export const SpatialHUD: React.FC<SpatialHUDProps> = ({ isMuted, onToggleSound }) => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSector, setActiveSector] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sectors = [
    { id: 'sector-origin', code: '01', name: 'INTRO' },
    { id: 'sector-story', code: '02', name: 'STORY' },
    { id: 'sector-creations', code: '03', name: 'WORK' },
    { id: 'sector-neural', code: '04', name: 'SKILLS' },
    { id: 'sector-beacon', code: '05', name: 'CONTACT' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const percent = Math.min(Math.max(Math.round((window.scrollY / maxScroll) * 100), 0), 100);
        setScrollPercent(percent);

        const currentPos = window.scrollY + window.innerHeight * 0.35;
        sectors.forEach((sec, idx) => {
          const el = document.getElementById(sec.id);
          if (el) {
            const top = el.offsetTop;
            const h = el.offsetHeight;
            if (currentPos >= top && currentPos < top + h) {
              setActiveSector(idx);
            }
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const warpToSector = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Precision Razor Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/[0.04] z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-accent-cyan via-white to-accent-cyan transition-all duration-75 ease-out shadow-[0_0_12px_#38bdf8]"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* Main Luxury Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-[#07070a]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Brand Identity */}
          <button
            onClick={() => warpToSector('sector-origin')}
            className="group flex items-center gap-3.5 focus:outline-none text-left"
          >
            <ASMonogram size={38} glow={true} className="transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-editorial font-bold text-sm sm:text-base tracking-widest text-white group-hover:text-accent-cyan transition-colors">
                ANKIT SINGH
              </span>
              <span className="text-[10px] font-tech tracking-wider text-zinc-400">
                Govt. Polytechnic Bansdeeh, Ballia
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-[#0c0c12]/70 backdrop-blur-md">
            {sectors.map((sec, idx) => {
              const isActive = activeSector === idx;
              return (
                <button
                  key={sec.id}
                  onClick={() => warpToSector(sec.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-tech tracking-widest uppercase transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-white/[0.1] shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {sec.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_#38bdf8]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Center: Audio Toggle + Contact Action */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onToggleSound}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-700/60 bg-zinc-900/60 hover:border-accent-cyan/60 hover:bg-zinc-800/80 transition-all text-xs font-tech tracking-wider text-zinc-300 hover:text-white focus:outline-none"
              title={isMuted ? 'Atmosphere Audio Off' : 'Atmosphere Audio On'}
              aria-label="Toggle ambient atmosphere audio"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-accent-cyan animate-pulse" />
              )}
              <span>{isMuted ? 'AUDIO OFF' : 'AUDIO ON'}</span>
            </button>

            <button
              onClick={() => warpToSector('sector-beacon')}
              className="group px-5 py-2 rounded-full border border-accent-cyan/40 bg-accent-cyan/10 hover:bg-accent-cyan hover:text-black transition-all duration-300 text-xs font-tech tracking-wider text-accent-cyan font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
            >
              <span>LET'S CONNECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={onToggleSound}
              className="p-2 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white"
              aria-label="Toggle audio"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-accent-cyan" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl border border-zinc-800 bg-zinc-900/90 text-zinc-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#07070a]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-24 lg:hidden animate-in fade-in duration-300">
          <div className="flex flex-col gap-6">
            <div className="text-[10px] font-tech tracking-widest text-zinc-500 uppercase">
              INDEX // NAVIGATION
            </div>
            {sectors.map((sec) => (
              <button
                key={sec.id}
                onClick={() => warpToSector(sec.id)}
                className="flex items-center justify-between text-2xl font-editorial font-bold text-zinc-200 hover:text-accent-cyan text-left border-b border-zinc-800/80 pb-4 transition-colors"
              >
                <span>{sec.name}</span>
                <span className="text-xs font-tech text-zinc-500">{sec.code}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-zinc-800 text-xs font-tech text-zinc-400">
            <div>Govt. Polytechnic Bansdeeh, Ballia</div>
            <div>Summer Training @ SkillManthan Technologies</div>
          </div>
        </div>
      )}

      {/* Right Holographic Waypoint Rail (Desktop) */}
      <nav
        aria-label="Spatial Sectors"
        className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-5 pointer-events-auto select-none"
      >
        {sectors.map((sec, idx) => {
          const isActive = activeSector === idx;
          return (
            <button
              key={sec.id}
              onClick={() => warpToSector(sec.id)}
              className="group flex items-center gap-3 focus:outline-none transition-all duration-300"
            >
              <span
                className={`text-[10px] font-tech tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? 'text-white translate-x-0 opacity-100'
                    : 'text-zinc-600 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                {sec.name}
              </span>

              <span
                className={`text-[11px] font-tech font-bold transition-all duration-300 ${
                  isActive ? 'text-accent-cyan scale-110' : 'text-zinc-600 group-hover:text-zinc-400'
                }`}
              >
                {sec.code}
              </span>

              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-[3px] h-8 bg-accent-cyan shadow-[0_0_12px_#38bdf8]'
                    : 'w-[1.5px] h-4 bg-zinc-800 group-hover:bg-zinc-600'
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
};
