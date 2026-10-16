import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowDown, Sparkles, Terminal, Code2 } from 'lucide-react';

export const SectorHero: React.FC = () => {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="sector-origin"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 pt-28 pb-16 z-10"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Vessel Tag */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-700/80 bg-black/60 backdrop-blur-md text-xs font-tech tracking-widest text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.hero.greeting}</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] font-tech text-zinc-400">
            <Terminal className="w-3 h-3 text-accent-cyan" />
            <span>DIPLOMA IN CSE (SEM 4)</span>
          </div>

          <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] font-tech text-zinc-400">
            <Code2 className="w-3 h-3 text-accent-cyan" />
            <span>SUMMER TRAINING @ SKILLMANTHAN</span>
          </div>
        </div>

        {/* Massive Editorial Holographic Headlines */}
        <div className="space-y-1 sm:space-y-3 mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-editorial font-black tracking-tight leading-[0.92] text-white">
            {t.hero.headlinePart1}
          </h1>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-editorial font-black tracking-tight leading-[0.92] text-gradient-cyan">
            {t.hero.headlinePart2}
          </h1>
        </div>

        {/* Narrative Subhead */}
        <div className="max-w-3xl space-y-4 mb-12">
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-200 font-normal leading-relaxed">
            {t.hero.subhead}
          </p>
          <p className="text-sm sm:text-base text-zinc-400 font-tech leading-relaxed max-w-2xl">
            {t.hero.summary}
          </p>
        </div>

        {/* Cockpit Actions */}
        <div className="flex flex-wrap items-center gap-5">
          <button
            onClick={() => scrollTo('sector-creations')}
            className="group relative px-8 py-4 rounded-full bg-white text-black font-tech font-bold text-xs sm:text-sm tracking-wider uppercase overflow-hidden shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:shadow-[0_0_45px_rgba(56,189,248,0.6)] transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              <span>{t.hero.ctaWork}</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </span>
            <div className="absolute inset-0 bg-accent-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>

          <button
            onClick={() => scrollTo('sector-beacon')}
            className="group px-7 py-4 rounded-full border border-zinc-700/80 bg-black/50 hover:border-accent-cyan/80 hover:bg-zinc-900/80 text-zinc-200 hover:text-white font-tech font-semibold text-xs sm:text-sm tracking-wider uppercase backdrop-blur-md transition-all duration-300 flex items-center gap-2"
          >
            <span>{t.hero.ctaConnect}</span>
            <Sparkles className="w-4 h-4 text-accent-cyan transition-transform group-hover:rotate-45" />
          </button>
        </div>
      </div>
    </section>
  );
};
