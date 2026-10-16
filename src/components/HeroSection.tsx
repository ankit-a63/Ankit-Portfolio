import React, { useEffect, useRef } from 'react';
import { Hero3D } from './Hero3D';
import { useLanguage } from '../context/LanguageContext';
import { ArrowDown, Sparkles, Terminal, Code } from 'lucide-react';
import gsap from 'gsap';

export const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const headlinePart1Ref = useRef<HTMLHeadingElement>(null);
  const headlinePart2Ref = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLDivElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

      tl.fromTo(
        badgesRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          headlinePart1Ref.current,
          { opacity: 0, y: 50, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0 },
          '-=0.5'
        )
        .fromTo(
          headlinePart2Ref.current,
          { opacity: 0, y: 50, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0 },
          '-=0.9'
        )
        .fromTo(
          subheadRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0 },
          '-=0.8'
        )
        .fromTo(
          ctaContainerRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0 },
          '-=0.7'
        );
    }, heroRef);

    return () => ctx.revert();
  }, [language]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-12 px-6 sm:px-8 overflow-hidden bg-[#070709]"
    >
      {/* Background 3D Interactive Sculpture */}
      <Hero3D />

      {/* Depth Lighting and Atmospheric Vignette Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#070709]/40 to-[#070709] z-[1]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_20%,#070709_90%)] z-[1]" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        {/* System Status & Monogram Reticle Pill */}
        <div ref={badgesRef} className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-700/60 bg-zinc-900/60 backdrop-blur-md text-xs font-tech tracking-widest text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-200">{t.hero.greeting}</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] font-tech text-zinc-400">
            <Terminal className="w-3 h-3 text-accent-cyan" />
            <span>CSE DIPLOMA (SEM 4)</span>
          </div>

          <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] font-tech text-zinc-400">
            <Code className="w-3 h-3 text-accent-cyan" />
            <span>SUMMER TRAINING @ SKILLMANTHAN</span>
          </div>
        </div>

        {/* Giant Kinetic Editorial Headline */}
        <div className="space-y-1 sm:space-y-2 mb-8">
          <h1
            ref={headlinePart1Ref}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-editorial font-extrabold tracking-tight leading-[0.95] text-white"
          >
            {t.hero.headlinePart1}
          </h1>
          <h1
            ref={headlinePart2Ref}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-editorial font-extrabold tracking-tight leading-[0.95] text-gradient-cyan"
          >
            {t.hero.headlinePart2}
          </h1>
        </div>

        {/* Descriptive Subhead / Overview */}
        <div ref={subheadRef} className="max-w-3xl space-y-4 mb-10">
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed">
            {t.hero.subhead}
          </p>
          <p className="text-sm sm:text-base text-zinc-400 font-tech leading-relaxed max-w-2xl">
            {t.hero.summary}
          </p>
        </div>

        {/* Functional Actions: Explore My Work & Let's Connect */}
        <div ref={ctaContainerRef} className="flex flex-wrap items-center gap-4 sm:gap-6">
          <button
            onClick={() => scrollTo('work')}
            className="group relative px-8 py-4 rounded-full bg-white text-black font-tech font-bold text-xs sm:text-sm tracking-wider uppercase overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>{t.hero.ctaWork}</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </span>
            <div className="absolute inset-0 bg-accent-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>

          <button
            onClick={() => scrollTo('contact')}
            className="group px-7 py-4 rounded-full border border-zinc-700/80 bg-zinc-900/50 hover:border-accent-cyan/80 hover:bg-zinc-800/80 text-zinc-200 hover:text-white font-tech font-semibold text-xs sm:text-sm tracking-wider uppercase backdrop-blur-md transition-all duration-300 flex items-center gap-2"
          >
            <span>{t.hero.ctaConnect}</span>
            <Sparkles className="w-4 h-4 text-accent-cyan transition-transform group-hover:rotate-45" />
          </button>
        </div>
      </div>

      {/* Bottom Atmospheric Reticle & Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 flex items-center justify-between border-t border-white/[0.08] text-xs font-tech text-zinc-500">
        <div className="hidden sm:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-accent-cyan font-bold">01</span>
            <span>{t.hero.metrics.projects}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-zinc-700" />
          <div>{t.hero.metrics.approach}</div>
        </div>

        <button
          onClick={() => scrollTo('work')}
          className="flex items-center gap-2.5 text-zinc-400 hover:text-accent-cyan transition-colors ml-auto sm:ml-0"
        >
          <span className="text-[11px] font-tech tracking-widest">{t.hero.scrollHint}</span>
          <div className="w-5 h-8 rounded-full border border-zinc-700 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-accent-cyan animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};
