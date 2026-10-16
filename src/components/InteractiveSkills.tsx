import React, { useState, useRef, useEffect } from 'react';
import { skillCategories } from '../data/skills';
import { useLanguage } from '../context/LanguageContext';
import { Cpu, CheckCircle, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const InteractiveSkills: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSkill, setActiveSkill] = useState<{
    name: string;
    level: string;
    description: { en: string; hi: string };
  } | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const allSkills = skillCategories.flatMap((cat) =>
    cat.skills.map((skill) => ({ ...skill, categoryId: cat.id }))
  );

  const filteredSkills =
    selectedCategory === 'all'
      ? allSkills
      : allSkills.filter((skill) => skill.categoryId === selectedCategory);

  useEffect(() => {
    // Initial active skill default
    if (!activeSkill && allSkills.length > 0) {
      setActiveSkill(allSkills[0]);
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory, language]);

  const categories = [
    { id: 'all', label: language === 'en' ? 'All Skills (11)' : 'सभी कौशल (11)' },
    { id: 'frontend', label: t.skills.categories.frontend },
    { id: 'backend', label: t.skills.categories.backend },
    { id: 'tools', label: t.skills.categories.tools },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-32 px-6 sm:px-8 max-w-7xl mx-auto w-full"
    >
      {/* Section Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-tech text-accent-cyan tracking-widest uppercase mb-6">
        <Cpu className="w-3.5 h-3.5" />
        <span>{t.skills.badge}</span>
      </div>

      {/* Heading */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-extrabold tracking-tight text-white">
            {t.skills.headline}
          </h2>
          <p className="mt-4 text-zinc-400 font-tech text-sm sm:text-base max-w-2xl leading-relaxed">
            {t.skills.subhead}
          </p>
        </div>
        <div className="text-xs font-tech text-zinc-500 hidden lg:block">
          {t.skills.interactiveHint}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2.5 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-tech tracking-wider uppercase transition-all duration-300 ${
              selectedCategory === cat.id
                ? 'bg-accent-cyan text-black font-bold shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                : 'bg-zinc-900/60 border border-white/[0.08] text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skills Matrix & Interactive Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Chips Grid (7 cols) */}
        <div
          ref={gridRef}
          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5"
        >
          {filteredSkills.map((skill) => {
            const isSelected = activeSkill?.name === skill.name;
            return (
              <button
                key={skill.name}
                onClick={() => setActiveSkill(skill)}
                onMouseEnter={() => setActiveSkill(skill)}
                className={`text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                  isSelected
                    ? 'border-accent-cyan bg-accent-cyan/10 shadow-[0_0_25px_rgba(56,189,248,0.15)]'
                    : 'border-white/[0.08] bg-[#0c0c11]/80 hover:border-zinc-700 hover:bg-zinc-900/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-editorial font-bold text-base sm:text-lg text-white group-hover:text-accent-cyan transition-colors">
                    {skill.name}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full transition-all ${
                      isSelected ? 'bg-accent-cyan animate-ping' : 'bg-zinc-700'
                    }`}
                  />
                </div>

                <div className="text-[11px] font-tech text-zinc-400 truncate">
                  {skill.level}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Detailed Telemetry Inspector (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 rounded-3xl border border-white/[0.08] bg-[#0c0c11]/90 backdrop-blur-xl p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] text-xs font-tech text-zinc-500">
              <span className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-accent-cyan" />
                <span>SKILL TELEMETRY</span>
              </span>
              <span>INSPECTION_MODE</span>
            </div>

            {activeSkill ? (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-tech text-accent-cyan tracking-widest uppercase">
                    ACTIVE MODULE
                  </span>
                  <h3 className="text-3xl font-editorial font-extrabold text-white mt-1">
                    {activeSkill.name}
                  </h3>
                  <div className="text-xs font-tech text-zinc-400 mt-2 px-2.5 py-1 rounded bg-white/[0.04] inline-block border border-white/[0.06]">
                    {activeSkill.level}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-tech text-zinc-500 block mb-2 uppercase tracking-wider">
                    {language === 'en' ? 'Practical Scope & Context' : 'व्यावहारिक उपयोग और विवरण'}
                  </span>
                  <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                    {activeSkill.description[language]}
                  </p>
                </div>

                {/* Verified Context Note */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-1.5 text-xs font-tech text-zinc-400">
                  <div className="flex items-center gap-1.5 text-accent-cyan font-bold text-[11px]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>VERIFIED CANDIDATE SKILL</span>
                  </div>
                  <div>Applied across academic semester coursework, SkillManthan training, and personal platforms.</div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-zinc-500 font-tech text-xs">
                Select a skill to inspect its practical context
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
