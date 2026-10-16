import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ASMonogram } from './ASMonogram';
import { GraduationCap, Briefcase, Compass, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutJourney: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
          },
        }
      );

      // Quote reveal
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 85%',
          },
        }
      );

      // Cards staggered entrance
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: idx * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-6 sm:px-8 max-w-7xl mx-auto w-full"
    >
      {/* Section Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-tech text-accent-cyan tracking-widest uppercase mb-6">
        <Compass className="w-3.5 h-3.5" />
        <span>{t.about.badge}</span>
      </div>

      {/* Main Headline */}
      <div className="mb-16">
        <h2
          ref={headlineRef}
          className="text-3xl sm:text-5xl lg:text-7xl font-editorial font-extrabold tracking-tight text-white max-w-4xl"
        >
          {t.about.headline}
        </h2>
      </div>

      {/* Editorial Quote Presentation with AS Monogram Focal Point */}
      <div
        ref={quoteRef}
        className="relative rounded-3xl border border-white/[0.08] bg-[#0c0c11]/80 backdrop-blur-xl p-8 sm:p-12 lg:p-16 mb-20 overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden md:block">
          <ASMonogram size={180} glow={false} />
        </div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <span className="text-accent-cyan font-editorial text-4xl block leading-none">“</span>
          <p className="text-lg sm:text-2xl lg:text-3xl font-editorial font-semibold text-zinc-100 leading-relaxed tracking-tight">
            {t.about.quote}
          </p>
          <div className="pt-4 flex items-center gap-4 text-xs font-tech text-zinc-400">
            <span className="text-accent-cyan font-bold">ANKIT SINGH</span>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            <span>STUDENT DEVELOPER // BALLIA, UP</span>
          </div>
        </div>
      </div>

      {/* Two Pillars: Education & Summer Training */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {/* Pillar 1: Academic Foundation */}
        <div
          ref={(el) => (cardsRef.current[0] = el)}
          className="rounded-3xl border border-white/[0.08] bg-[#0c0c11]/60 backdrop-blur-md p-8 sm:p-10 space-y-6 hover:border-zinc-700 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-accent-cyan">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xs font-tech px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-zinc-400">
              ACADEMICS
            </span>
          </div>

          <div>
            <div className="text-xs font-tech text-accent-cyan tracking-wider uppercase mb-1">
              {t.about.educationTitle}
            </div>
            <h3 className="text-2xl font-editorial font-bold text-white">
              {t.about.educationDegree}
            </h3>
            <div className="mt-2 text-sm font-tech text-emerald-400 font-medium">
              {t.about.educationPeriod}
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] text-zinc-300 text-sm leading-relaxed space-y-2">
            <div className="text-zinc-400 font-medium">
              {t.about.educationInstitute}
            </div>
            <p className="text-xs font-tech text-zinc-500">
              Curriculum focus: Object-oriented programming, data structures, database management systems, computer networks, and web engineering.
            </p>
          </div>
        </div>

        {/* Pillar 2: Industry Summer Training */}
        <div
          ref={(el) => (cardsRef.current[1] = el)}
          className="rounded-3xl border border-white/[0.08] bg-[#0c0c11]/60 backdrop-blur-md p-8 sm:p-10 space-y-6 hover:border-zinc-700 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-accent-cyan">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="text-xs font-tech px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-zinc-400">
              PRACTICAL TRAINING
            </span>
          </div>

          <div>
            <div className="text-xs font-tech text-accent-cyan tracking-wider uppercase mb-1">
              {t.about.trainingTitle}
            </div>
            <h3 className="text-2xl font-editorial font-bold text-white">
              {t.about.trainingRole}
            </h3>
            <div className="mt-2 text-sm font-tech text-accent-cyan font-medium">
              {t.about.trainingCompany}
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] text-zinc-300 text-sm leading-relaxed space-y-2">
            <p>{t.about.trainingNote}</p>
            <p className="text-xs font-tech text-zinc-500">
              * Summer industry training completed as part of diploma engineering technical practical curriculum.
            </p>
          </div>
        </div>
      </div>

      {/* How I Approach Code: Philosophy & Principles */}
      <div
        ref={(el) => (cardsRef.current[2] = el)}
        className="rounded-3xl border border-white/[0.08] bg-[#0a0a0f] p-8 sm:p-12"
      >
        <div className="flex items-center gap-2 mb-8 text-xs font-tech text-accent-cyan uppercase tracking-widest">
          <BookOpen className="w-4 h-4" />
          <span>{t.about.approachTitle}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.about.approachPoints.map((point, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-accent-cyan text-xs font-tech font-bold">
                  0{idx + 1}
                </span>
                <h4 className="text-base font-editorial font-bold text-white">
                  {point.title}
                </h4>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
