import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ASMonogram } from './ASMonogram';
import { GraduationCap, Briefcase, Compass, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SectorStory: React.FC = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLParagraphElement>(null);

  const words = t.about.quote.split(' ');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordSpans = textContainerRef.current?.querySelectorAll('.spatial-word');
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
    }, sectionRef);

    return () => ctx.revert();
  }, [language, t]);

  return (
    <section
      ref={sectionRef}
      id="sector-story"
      className="relative min-h-screen py-36 px-6 sm:px-12 lg:px-24 z-10 flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Sector Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-cyan/30 bg-black/60 text-xs font-tech text-accent-cyan tracking-widest uppercase mb-8">
          <Compass className="w-3.5 h-3.5" />
          <span>SECTOR 02 // {t.about.badge}</span>
        </div>

        {/* Heading */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-editorial font-extrabold tracking-tight text-white leading-[0.98]">
            {t.about.headline}
          </h2>
        </div>

        {/* Scrubbed Narrative Pad */}
        <div className="relative rounded-3xl border border-white/[0.1] bg-[#08080e]/85 backdrop-blur-2xl p-8 sm:p-14 lg:p-20 mb-20 overflow-hidden shadow-[0_25px_80px_-20px_rgba(0,0,0,0.9)]">
          <div className="absolute top-8 right-8 opacity-10 pointer-events-none hidden md:block">
            <ASMonogram size={220} glow={false} />
          </div>

          <div className="relative z-10 max-w-5xl space-y-8">
            <span className="text-accent-cyan font-editorial text-5xl block leading-none">“</span>
            <p
              ref={textContainerRef}
              className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-bold leading-relaxed tracking-tight"
            >
              {words.map((word, i) => (
                <span key={i} className="spatial-word inline-block mr-2 transition-colors duration-150">
                  {word}
                </span>
              ))}
            </p>

            <div className="pt-6 border-t border-white/[0.08] flex items-center gap-4 text-xs font-tech text-zinc-400">
              <span className="text-accent-cyan font-bold">ANKIT SINGH</span>
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              <span>CSE DIPLOMA // BALLIA, UP</span>
            </div>
          </div>
        </div>

        {/* Dual Pillar Consoles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Academic Console */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0a0a10]/80 backdrop-blur-xl p-8 sm:p-12 space-y-6 hover:border-accent-cyan/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-accent-cyan">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xs font-tech px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan">
                ACADEMICS
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
              <div className="text-zinc-200 font-medium">{t.about.educationInstitute}</div>
              <p className="text-xs font-tech text-zinc-500">
                Core syllabus: Object-oriented programming, data structures, DBMS, web technologies, and systems engineering.
              </p>
            </div>
          </div>

          {/* Summer Training Console */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0a0a10]/80 backdrop-blur-xl p-8 sm:p-12 space-y-6 hover:border-accent-cyan/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-accent-cyan">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-xs font-tech px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan">
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

        {/* Code Principles */}
        <div className="rounded-3xl border border-white/[0.08] bg-[#06060a]/90 p-8 sm:p-14">
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
      </div>
    </section>
  );
};
