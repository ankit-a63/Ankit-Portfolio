import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Volume2, VolumeX, Compass, Navigation } from 'lucide-react';

interface SpatialHUDProps {
  velocity: number;
  isMuted: boolean;
  onToggleSound: () => void;
}

export const SpatialHUD: React.FC<SpatialHUDProps> = ({
  velocity,
  isMuted,
  onToggleSound,
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSector, setActiveSector] = useState(0);

  const sectors = [
    { id: 'sector-origin', code: 'SEC_01', name: language === 'en' ? 'ORIGIN CORE' : 'मूल केंद्र' },
    { id: 'sector-story', code: 'SEC_02', name: language === 'en' ? 'IDENTITY ARCHIVE' : 'परिचय अभिलेख' },
    { id: 'sector-creations', code: 'SEC_03', name: language === 'en' ? 'HOLO CREATIONS' : 'लाइव प्रोजेक्ट्स' },
    { id: 'sector-neural', code: 'SEC_04', name: language === 'en' ? 'NEURAL REACTOR' : 'कौशल केंद्र' },
    { id: 'sector-beacon', code: 'SEC_05', name: language === 'en' ? 'TRANSMISSION BEACON' : 'संपर्क बीकन' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const percent = Math.min(Math.max(Math.round((window.scrollY / maxScroll) * 100), 0), 100);
        setScrollPercent(percent);

        const currentPos = window.scrollY + window.innerHeight * 0.4;
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
  }, [sectors]);

  const warpToSector = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Cockpit Telemetry Rail */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-5 flex items-center justify-between pointer-events-none select-none bg-gradient-to-b from-[#050508]/90 via-[#050508]/40 to-transparent backdrop-blur-[2px]">
        {/* Left: Vessel Identity */}
        <div className="flex items-center gap-3.5 pointer-events-auto">
          <div className="relative w-8 h-8 rounded-lg border border-accent-cyan/40 bg-black/60 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <span className="font-editorial font-extrabold text-xs text-white">AS</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="font-editorial font-bold text-xs sm:text-sm tracking-wider text-white">
              ANKIT SINGH // 2026
            </span>
            <span className="text-[10px] font-tech text-zinc-500 tracking-widest">
              CSE DIPLOMA // BALLIA, UP
            </span>
          </div>
        </div>

        {/* Center: Warp Velocity Indicator */}
        <div className="hidden lg:flex items-center gap-6 px-4 py-1.5 rounded-full border border-white/[0.08] bg-black/50 backdrop-blur-md pointer-events-auto">
          <div className="flex items-center gap-2 text-[10px] font-tech text-zinc-400">
            <Compass className="w-3.5 h-3.5 text-accent-cyan animate-spin" style={{ animationDuration: '10s' }} />
            <span>WARP VELOCITY:</span>
            <span className="text-white font-bold">{Math.round(velocity * 12)} KM/S</span>
          </div>
          <div className="w-[1px] h-3 bg-zinc-700" />
          <div className="text-[10px] font-tech text-zinc-400">
            SECTOR: <span className="text-accent-cyan font-bold">{sectors[activeSector].code}</span>
          </div>
        </div>

        {/* Right: Audio + Language Toggles */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-700/80 bg-black/60 hover:border-accent-cyan text-xs font-tech text-zinc-300 hover:text-white transition-all shadow-[0_0_12px_rgba(0,0,0,0.5)]"
            title="Toggle Language (English / हिन्दी)"
          >
            <Globe className="w-3.5 h-3.5 text-accent-cyan" />
            <span>{language === 'en' ? 'हिन्दी' : 'ENGLISH'}</span>
          </button>

          <button
            onClick={onToggleSound}
            className="p-2 rounded-full border border-zinc-700/80 bg-black/60 hover:border-accent-cyan text-zinc-400 hover:text-white transition-all"
            title={isMuted ? 'Atmosphere Audio Off' : 'Atmosphere Audio On'}
            aria-label="Toggle ambient audio"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-accent-cyan animate-pulse" />}
          </button>
        </div>
      </header>

      {/* Right Holographic Waypoint Radar (Desktop) */}
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

      {/* Bottom Spatial Coordinates HUD */}
      <footer className="fixed bottom-6 left-8 right-8 z-40 hidden md:flex items-center justify-between text-[10px] font-tech text-zinc-500 pointer-events-none select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-zinc-300">SPATIAL WARP ENGINE V3.0</span>
          </div>
          <div className="w-[1px] h-3 bg-zinc-800" />
          <span>ORIGIN: GOLU POLYTECHNIC // BALLIA, UP</span>
        </div>

        <div className="flex items-center gap-3">
          <span>PROGRESSION:</span>
          <span className="text-white font-bold">{scrollPercent < 10 ? `00${scrollPercent}` : scrollPercent < 100 ? `0${scrollPercent}` : scrollPercent}%</span>
          <div className="w-20 h-1 bg-zinc-900 rounded-full overflow-hidden">
            <div className="h-full bg-accent-cyan" style={{ width: `${scrollPercent}%` }} />
          </div>
        </div>
      </footer>
    </>
  );
};
