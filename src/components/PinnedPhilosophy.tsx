import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ASMonogram } from './ASMonogram';
import { GraduationCap, Briefcase, Compass, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PinnedPhilosophy: React.FC = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const words = t.about.quote.split(' ');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word scroll-scrubbed illumination
      const wordSpans = textContainerRef.current?.querySelectorAll('.scrolly-word');
      if (wordSpans && wordSpans.length > 0) {
        gsap.fromTo(
          wordSpans,
          { opacity: 0.15, color: '#52525b' },
          {
            opacity: 1,
            color: '#f4f4f5',
            stagger: 0.05,
            ease: 'none',
            scrollTrigger: {
              trigger: textContainerRef.current,
              start: 'top 75%',
              end: 'bottom 45%',
              scrub: 0.8,
            },
          }
        );
      }

      // Cards Parallax entrance
      if (cardsContainerRef.current) {
        gsap.fromTo(
          cardsContainerRef.current.children,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [language, t]);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-36 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto w-full"
    >
      {/* Chapter Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-tech text-accent-cyan tracking-widest uppercase mb-8">
        <Compass className="w-3.5 h-3.5" />
        <span>{t.about.badge}</span>
      </div>

      {/* Kinetic Headline */}
      <div className="mb-20">
        <h2 className="text-4xl sm:text-6xl lg:text-8xl font-editorial font-extrabold tracking-tight text-white max-w-5xl leading-[0.98]">
          {t.about.headline}
        </h2>
      </div>

      {/* Giant Word-by-Word Scrubbed Narrative */}
      <div className="relative rounded-3xl border border-white/[0.08] bg-[#0c0c12]/80 backdrop-blur-2xl p-8 sm:p-14 lg:p-20 mb-28 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
        <div className="absolute top-8 right-8 opacity-10 pointer-events-none hidden md:block">
          <ASMonogram size={200} glow={false} />
        </div>

        <div className="relative z-10 max-w-5xl space-y-8">
          <span className="text-accent-cyan font-editorial text-5xl block leading-none">“</span>
          <p
            ref={textContainerRef}
            className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-bold leading-relaxed tracking-tight"
          >
            {words.map((word, i) => (
              <span key={i} className="scrolly-word inline-block mr-2 transition-colors duration-150">
                {word}
              </span>
            ))}
          </p>

          <div className="pt-6 border-t border-white/[0.08] flex items-center gap-4 text-xs font-tech text-zinc-400">
            <span className="text-accent-cyan font-bold">ANKIT SINGH</span>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            <span>DIPLOMA IN CSE (SEM 4) // BALLIA, UP</span>
          </div>
        </div>
      </div>

      {/* Dual Academic & Training Pillars */}
      <div ref={cardsContainerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
        {/* Education Pillar */}
        <div className="rounded-3xl border border-white/[0.08] bg-[#0c0c12]/70 backdrop-blur-xl p-8 sm:p-12 space-y-6 hover:border-zinc-600 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-accent-cyan">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xs font-tech px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-zinc-400">
              ACADEMIC PILLAR
            </span>
          </div>

          <div>
            <div className="text-xs font-tech text-accent-cyan tracking-wider uppercase mb-1">
              {t.about.educationTitle}
            </div>
            <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-white">
              {t.about.educationDegree}
            </h3>
            <div className="mt-2 text-sm font-tech text-emerald-400 font-medium">
              {t.about.educationPeriod}
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] text-zinc-300 text-sm leading-relaxed space-y-2">
            <div className="text-zinc-300 font-medium">{t.about.educationInstitute}</div>
            <p className="text-xs font-tech text-zinc-500">
              Core subjects: Data Structures, Database Systems, Computer Networks, and Object-Oriented Software Design.
            </p>
          </div>
        </div>

        {/* Summer Training Pillar */}
        <div className="rounded-3xl border border-white/[0.08] bg-[#0c0c12]/70 backdrop-blur-xl p-8 sm:p-12 space-y-6 hover:border-zinc-600 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-accent-cyan">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="text-xs font-tech px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-zinc-400">
              SUMMER TRAINING
            </span>
          </div>

          <div>
            <div className="text-xs font-tech text-accent-cyan tracking-wider uppercase mb-1">
              {t.about.trainingTitle}
            </div>
            <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-white">
              {t.about.trainingRole}
            </h3>
            <div className="mt-2 text-sm font-tech text-accent-cyan font-medium">
              {t.about.trainingCompany}
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] text-zinc-300 text-sm leading-relaxed space-y-2">
            <p>{t.about.trainingNote}</p>
            <p className="text-xs font-tech text-zinc-500">
              * Official summer industry training completed as part of diploma engineering technical practical curriculum.
            </p>
          </div>
        </div>
      </div>

      {/* Code Philosophy Principles */}
      <div className="rounded-3xl border border-white/[0.08] bg-[#09090d] p-8 sm:p-14">
        <div className="flex items-center gap-2 mb-8 text-xs font-tech text-accent-cyan uppercase tracking-widest">
          <BookOpen className="w-4 h-4" />
          <span>{t.about.approachTitle}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.about.approachPoints.map((point, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-accent-cyan text-xs font-tech font-bold">
                  0{idx + 1}
                </span>
                <h4 className="text-base font-editorial font-bold text-white">{point.title}</h4>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
