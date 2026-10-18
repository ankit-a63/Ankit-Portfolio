import React, { useRef, useEffect } from 'react';
import { portfolioContent } from '../data/translations';
import { ASMonogram } from './ASMonogram';
import { GraduationCap, Briefcase, Compass, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SectorStory: React.FC = () => {
  const { about } = portfolioContent;
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLParagraphElement>(null);

  const words = about.quote.split(' ');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordSpans = textContainerRef.current?.querySelectorAll('.spatial-word');
      if (wordSpans && wordSpans.length > 0) {
        gsap.fromTo(
          wordSpans,
          { opacity: 0.18, color: '#52525b' },
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
  }, [about.quote]);

  return (
    <section
      ref={sectionRef}
      id="sector-story"
      className="relative min-h-screen py-20 sm:py-32 px-4 sm:px-12 lg:px-24 z-10 flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Sector Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-cyan/30 bg-black/60 text-xs font-tech text-accent-cyan tracking-widest uppercase mb-6 sm:mb-8">
          <Compass className="w-3.5 h-3.5" />
          <span>{about.badge}</span>
        </div>

        {/* Heading */}
        <div className="mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-editorial font-extrabold tracking-tight text-white leading-[1.0] break-words">
            {about.headline}
          </h2>
        </div>

        {/* Scrubbed Narrative Pad */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#090910]/85 backdrop-blur-2xl p-6 sm:p-12 lg:p-16 mb-12 sm:mb-20 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
          <div className="absolute top-8 right-8 opacity-10 pointer-events-none hidden md:block">
            <ASMonogram size={180} glow={false} />
          </div>

          <div className="relative z-10 max-w-4xl space-y-4 sm:space-y-6">
            <span className="text-accent-cyan font-editorial text-3xl sm:text-4xl block leading-none">“</span>
            <p
              ref={textContainerRef}
              className="text-base sm:text-2xl lg:text-3xl font-editorial font-bold leading-relaxed tracking-tight"
            >
              {words.map((word, i) => (
                <span key={i} className="spatial-word inline-block mr-1.5 sm:mr-2 transition-colors duration-150">
                  {word}
                </span>
              ))}
            </p>

            <div className="pt-4 sm:pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-tech text-zinc-400">
              <span className="text-accent-cyan font-bold">ANKIT SINGH</span>
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 hidden sm:block" />
              <span>Government Polytechnic Bansdeeh, Ballia</span>
            </div>
          </div>
        </div>

        {/* Dual Pillar Consoles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-20">
          {/* Academic Pillar */}
          <div className="rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#090910]/80 backdrop-blur-xl p-6 sm:p-10 space-y-4 sm:space-y-5 hover:border-accent-cyan/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-accent-cyan">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[11px] sm:text-xs font-tech px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                ACADEMICS
              </span>
            </div>

            <div>
              <div className="text-xs font-tech text-accent-cyan tracking-wider uppercase mb-1">
                {about.educationTitle}
              </div>
              <h3 className="text-xl sm:text-2xl font-editorial font-bold text-white">
                {about.educationDegree}
              </h3>
              <div className="mt-1 text-sm font-tech text-emerald-400 font-medium">
                {about.educationPeriod}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-zinc-300 text-sm leading-relaxed space-y-1.5">
              <div className="text-white font-medium">{about.educationInstitute}</div>
              <p className="text-xs font-tech text-zinc-400">
                Curriculum focus: Object-oriented programming, data structures, database management systems, and web technologies.
              </p>
            </div>
          </div>

          {/* Training Pillar */}
          <div className="rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#090910]/80 backdrop-blur-xl p-6 sm:p-10 space-y-4 sm:space-y-5 hover:border-accent-cyan/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-accent-cyan">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[11px] sm:text-xs font-tech px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                SUMMER TRAINING
              </span>
            </div>

            <div>
              <div className="text-xs font-tech text-accent-cyan tracking-wider uppercase mb-1">
                {about.trainingTitle}
              </div>
              <h3 className="text-xl sm:text-2xl font-editorial font-bold text-white">
                {about.trainingRole}
              </h3>
              <div className="mt-1 text-sm font-tech text-accent-cyan font-medium">
                {about.trainingCompany}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-zinc-300 text-sm leading-relaxed space-y-1.5">
              <p>{about.trainingNote}</p>
              <p className="text-xs font-tech text-zinc-400">
                * Official summer industry training completed as part of diploma engineering technical practical curriculum.
              </p>
            </div>
          </div>
        </div>

        {/* Principles */}
        <div className="rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#06060a]/90 p-6 sm:p-12">
          <div className="flex items-center gap-2 mb-6 sm:mb-8 text-xs font-tech text-accent-cyan uppercase tracking-widest">
            <BookOpen className="w-4 h-4" />
            <span>{about.approachTitle}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {about.approachPoints.map((point, idx) => (
              <div key={idx} className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-accent-cyan text-xs font-tech font-bold shrink-0">
                    0{idx + 1}
                  </span>
                  <h4 className="text-base font-editorial font-bold text-white">{point.title}</h4>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
