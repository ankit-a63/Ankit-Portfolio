import React from 'react';
import { portfolioContent } from '../data/translations';
import { ArrowDown, Sparkles, Terminal, Code2, GraduationCap } from 'lucide-react';

export const SectorHero: React.FC = () => {
  const { hero } = portfolioContent;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="sector-origin"
      className="relative min-h-[92vh] w-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 pt-32 pb-20 z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Status Badges */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md text-xs font-tech tracking-wider text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AVAILABLE FOR WORK</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-black/60 backdrop-blur-md text-[11px] font-tech text-zinc-300">
            <GraduationCap className="w-3.5 h-3.5 text-accent-cyan" />
            <span>GOVERNMENT POLYTECHNIC BANSDEEH, BALLIA</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-black/60 backdrop-blur-md text-[11px] font-tech text-zinc-300">
            <Code2 className="w-3.5 h-3.5 text-accent-cyan" />
            <span>SUMMER TRAINING @ SKILLMANTHAN</span>
          </div>
        </div>

        {/* Editorial Kinetic Headlines (Guaranteed Zero Clipping & Fluid Sizing) */}
        <div className="space-y-2 sm:space-y-3 mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.5rem] font-editorial font-extrabold tracking-tight leading-[1.0] text-white">
            {hero.headlinePart1}
          </h1>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.5rem] font-editorial font-extrabold tracking-tight leading-[1.0] text-gradient-cyan">
            {hero.headlinePart2}
          </h1>
        </div>

        {/* Supporting Narrative */}
        <div className="max-w-2xl space-y-4 mb-10">
          <p className="text-base sm:text-lg md:text-xl text-zinc-200 font-normal leading-relaxed">
            {hero.subhead}
          </p>
          <p className="text-xs sm:text-sm text-zinc-400 font-tech leading-relaxed">
            {hero.summary}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12">
          <button
            onClick={() => scrollTo('sector-creations')}
            className="group relative px-8 py-4 rounded-full bg-white text-black font-tech font-bold text-xs sm:text-sm tracking-wider uppercase overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              <span>{hero.ctaWork}</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </span>
            <div className="absolute inset-0 bg-accent-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>

          <button
            onClick={() => scrollTo('sector-beacon')}
            className="group px-7 py-4 rounded-full border border-zinc-700/80 bg-black/60 hover:border-accent-cyan/80 hover:bg-zinc-900/80 text-zinc-200 hover:text-white font-tech font-semibold text-xs sm:text-sm tracking-wider uppercase backdrop-blur-md transition-all duration-300 flex items-center gap-2"
          >
            <span>{hero.ctaConnect}</span>
            <Sparkles className="w-4 h-4 text-accent-cyan transition-transform group-hover:rotate-45" />
          </button>
        </div>

        {/* Clean Bottom Metrics & Scroll Guide */}
        <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-tech text-zinc-500">
          <div className="hidden sm:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-accent-cyan font-bold">01</span>
              <span>{hero.metrics.projects}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-zinc-700" />
            <div>{hero.metrics.approach}</div>
          </div>

          <button
            onClick={() => scrollTo('sector-story')}
            className="flex items-center gap-2.5 text-zinc-400 hover:text-accent-cyan transition-colors ml-auto sm:ml-0"
          >
            <span className="text-[11px] font-tech tracking-widest">{hero.scrollHint}</span>
            <div className="w-5 h-8 rounded-full border border-zinc-700 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-accent-cyan animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
