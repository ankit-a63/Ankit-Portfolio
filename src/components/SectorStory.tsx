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

        {/* Editorial Profile Showcase & Scrubbed Narrative Pad */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#090910]/85 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 mb-12 sm:mb-20 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
          <div className="absolute top-8 right-8 opacity-5 pointer-events-none hidden lg:block">
            <ASMonogram size={220} glow={false} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Col: Authentic Portrait Showcase (5 cols) */}
            <div className="lg:col-span-5 relative group">
              {/* Subtle Cyan Glow Halo */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-accent-cyan/25 via-sky-500/10 to-transparent blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Main Portrait Card */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-accent-cyan/35 bg-[#06060c] shadow-2xl">
                {/* Photo with 1:1 profile square ratio */}
                <div className="relative aspect-square w-full overflow-hidden bg-zinc-950">
                  <img
                    src="/ankit-singh.png"
                    alt="Ankit Singh - CSE Student & Developer"
                    className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-[1.01] group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />

                  {/* Subtle bottom edge shadow for smooth transition */}
                  <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[#090914]/60 to-transparent pointer-events-none" />

                  {/* Top Status Pill */}
                  <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] font-tech text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>VERIFIED DEVELOPER</span>
                  </div>

                  {/* Top Right Semester Pill */}
                  <div className="absolute top-3.5 right-3.5 z-10 px-2.5 py-1 rounded-full bg-accent-cyan/20 backdrop-blur-md border border-accent-cyan/40 text-[10px] sm:text-[11px] font-tech text-accent-cyan font-bold">
                    SEM 05
                  </div>
                </div>

                {/* Portrait Card Telemetry Footer */}
                <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#090914] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-editorial font-bold text-lg sm:text-xl text-white tracking-wide">
                        ANKIT SINGH
                      </h3>
                      <p className="text-[11px] font-tech text-accent-cyan">
                        CSE 5th Semester • Full-Stack Developer
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[10px] font-tech text-zinc-500 uppercase">LOCATION</div>
                      <div className="text-xs font-tech text-zinc-300">Ballia, UP (IN)</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-tech text-zinc-400">
                    <span className="truncate max-w-[210px] xs:max-w-none">Govt. Polytechnic Bansdeeh</span>
                    <span className="text-emerald-400 font-medium shrink-0">● ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Scrubbed Narrative & Foundation Specs (7 cols) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div>
                <span className="text-accent-cyan font-editorial text-4xl sm:text-5xl block leading-none mb-3">“</span>
                <p
                  ref={textContainerRef}
                  className="text-lg sm:text-2xl lg:text-3xl font-editorial font-bold leading-relaxed tracking-tight"
                >
                  {words.map((word, i) => (
                    <span key={i} className="spatial-word inline-block mr-1.5 sm:mr-2 transition-colors duration-150">
                      {word}
                    </span>
                  ))}
                </p>
              </div>

              {/* Foundation Specification Pills */}
              <div className="pt-6 border-t border-white/[0.08] space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-accent-cyan/30 transition-colors">
                    <div className="text-[10px] font-tech text-accent-cyan uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>ACADEMIC FOUNDATION</span>
                    </div>
                    <div className="text-sm font-editorial font-bold text-white">
                      Diploma in Computer Science & Engg.
                    </div>
                    <div className="text-[11px] font-tech text-zinc-400 mt-1">
                      Govt. Polytechnic Bansdeeh, Ballia (5th Sem)
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-accent-cyan/30 transition-colors">
                    <div className="text-[10px] font-tech text-accent-cyan uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>SUMMER INDUSTRY TRAINING</span>
                    </div>
                    <div className="text-sm font-editorial font-bold text-white">
                      Web Development Practicum
                    </div>
                    <div className="text-[11px] font-tech text-zinc-400 mt-1">
                      SkillManthan Technologies Pvt. Ltd.
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-tech text-zinc-400 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-accent-cyan font-bold">ANKIT SINGH</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                    <span>Government Polytechnic Bansdeeh, Ballia</span>
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Scroll down to inspect engineered works ↓
                  </div>
                </div>
              </div>
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
