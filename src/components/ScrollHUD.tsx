import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const ScrollHUD: React.FC = () => {
  const { t } = useLanguage();
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    { id: 'hero', num: '01', label: t.nav.about === 'परिचय' ? 'प्रारंभ' : 'INTRO' },
    { id: 'philosophy', num: '02', label: t.nav.about === 'परिचय' ? 'परिचय' : 'STORY' },
    { id: 'work', num: '03', label: t.nav.work === 'प्रोजेक्ट्स' ? 'प्रोजेक्ट्स' : 'WORK' },
    { id: 'skills', num: '04', label: t.nav.skills === 'कौशल' ? 'कौशल' : 'SKILLS' },
    { id: 'contact', num: '05', label: t.nav.contact === 'संपर्क' ? 'संपर्क' : 'CONNECT' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const percent = Math.min(Math.max(Math.round((window.scrollY / maxScroll) * 100), 0), 100);
        setScrollPercent(percent);

        // Determine active chapter based on scroll position
        const scrollPos = window.scrollY + window.innerHeight * 0.35;
        chapters.forEach((chap, idx) => {
          const el = document.getElementById(chap.id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              setActiveChapter(idx);
            }
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapters]);

  const scrollToChapter = (id: string) => {
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

      {/* Right Cybernetic Chapter Rail (Desktop) */}
      <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-5 pointer-events-auto select-none">
        {chapters.map((chap, idx) => {
          const isActive = activeChapter === idx;
          return (
            <button
              key={chap.id}
              onClick={() => scrollToChapter(chap.id)}
              className="group flex items-center gap-3 focus:outline-none transition-all duration-300"
            >
              {/* Text Label on Hover or Active */}
              <span
                className={`text-[10px] font-tech tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? 'text-white translate-x-0 opacity-100'
                    : 'text-zinc-500 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                {chap.label}
              </span>

              {/* Chapter Number Badge */}
              <span
                className={`text-[11px] font-tech font-bold transition-all duration-300 ${
                  isActive ? 'text-accent-cyan scale-110' : 'text-zinc-600 group-hover:text-zinc-400'
                }`}
              >
                {chap.num}
              </span>

              {/* Vertical Reticle Line Indicator */}
              <div
                className={`h-4 transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-[3px] h-8 bg-accent-cyan shadow-[0_0_12px_#38bdf8]'
                    : 'w-[1.5px] bg-zinc-800 group-hover:bg-zinc-600'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Bottom Telemetry HUD Bar */}
      <div className="fixed bottom-6 left-8 z-40 hidden md:flex items-center gap-6 text-[10px] font-tech tracking-wider text-zinc-500 pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping" />
          <span className="text-zinc-400">BALLIA, UP // 25.76°N, 84.15°E</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-zinc-800" />
        <div>
          SCROLL_AXIS: <span className="text-white font-bold">{scrollPercent < 10 ? `00${scrollPercent}` : scrollPercent < 100 ? `0${scrollPercent}` : scrollPercent}%</span>
        </div>
      </div>
    </>
  );
};
