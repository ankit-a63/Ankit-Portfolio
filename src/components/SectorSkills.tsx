import React, { useState, useEffect } from 'react';
import { skillCategories } from '../data/skills';
import { portfolioContent } from '../data/translations';
import { Cpu, CheckCircle, Activity } from 'lucide-react';

interface ActiveSkillType {
  name: string;
  level: string;
  icon: string;
  description: string;
  categoryId?: string;
}

export const SectorSkills: React.FC = () => {
  const { skills: tSkills } = portfolioContent;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSkill, setActiveSkill] = useState<ActiveSkillType | null>(null);

  const allSkills: ActiveSkillType[] = skillCategories.flatMap((cat) =>
    cat.skills.map((skill) => ({ ...skill, categoryId: cat.id }))
  );

  const filteredSkills =
    selectedCategory === 'all'
      ? allSkills
      : allSkills.filter((skill) => skill.categoryId === selectedCategory);

  useEffect(() => {
    if (!activeSkill && allSkills.length > 0) {
      setActiveSkill(allSkills[0]);
    }
  }, [allSkills, activeSkill]);

  const categories = [
    { id: 'all', label: 'All Skills (11)' },
    { id: 'frontend', label: tSkills.categories.frontend },
    { id: 'backend', label: tSkills.categories.backend },
    { id: 'tools', label: tSkills.categories.tools },
  ];

  return (
    <section
      id="sector-neural"
      className="relative min-h-screen py-20 sm:py-36 px-4 sm:px-12 lg:px-24 z-10 flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Sector Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-cyan/30 bg-black/60 text-xs font-tech text-accent-cyan tracking-widest uppercase mb-6 sm:mb-8">
          <Cpu className="w-3.5 h-3.5" />
          <span>SECTOR 04 // {tSkills.badge}</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16">
          <div>
            <h2 className="text-3xl sm:text-6xl lg:text-8xl font-editorial font-extrabold tracking-tight text-white leading-[0.98] break-words">
              {tSkills.headline}
            </h2>
            <p className="mt-4 sm:mt-6 text-zinc-400 font-tech text-xs sm:text-base max-w-2xl leading-relaxed">
              {tSkills.subhead}
            </p>
          </div>
          <div className="text-xs font-tech text-zinc-500 hidden lg:block">
            {tSkills.interactiveHint}
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-tech tracking-wider uppercase transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-accent-cyan text-black font-bold shadow-[0_0_25px_rgba(56,189,248,0.4)]'
                  : 'bg-black/60 border border-white/[0.08] text-zinc-400 hover:text-white hover:border-zinc-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Interactive Matrix + Telemetry Monitor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Skill Nodes Matrix (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {filteredSkills.map((skill) => {
              const isSelected = activeSkill?.name === skill.name;
              return (
                <button
                  key={skill.name}
                  onClick={() => setActiveSkill(skill)}
                  onMouseEnter={() => setActiveSkill(skill)}
                  className={`text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                    isSelected
                      ? 'border-accent-cyan bg-accent-cyan/15 shadow-[0_0_30px_rgba(56,189,248,0.2)]'
                      : 'border-white/[0.08] bg-[#090910]/85 hover:border-zinc-600 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <span className="font-editorial font-bold text-base sm:text-lg text-white group-hover:text-accent-cyan transition-colors">
                      {skill.name}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full transition-all ${
                        isSelected ? 'bg-accent-cyan animate-ping' : 'bg-zinc-700'
                      }`}
                    />
                  </div>
                  <div className="text-[11px] sm:text-xs font-tech text-zinc-400 truncate">
                    {skill.level}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Neural Telemetry Monitor (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 sm:top-28 rounded-2xl sm:rounded-3xl border border-white/[0.1] bg-[#08080e]/95 backdrop-blur-2xl p-6 sm:p-10 space-y-6 sm:space-y-8 shadow-[0_25px_70px_-20px_rgba(0,0,0,0.9)]">
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/[0.08] text-xs font-tech text-zinc-500">
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-accent-cyan" />
                  <span>NEURAL TELEMETRY MONITOR</span>
                </span>
                <span className="text-accent-cyan font-bold">ONLINE</span>
              </div>

              {activeSkill ? (
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <span className="text-[10px] font-tech text-accent-cyan tracking-widest uppercase">
                      ACTIVE SATELLITE
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-editorial font-extrabold text-white mt-1 break-words">
                      {activeSkill.name}
                    </h3>
                    <div className="text-[11px] sm:text-xs font-tech text-zinc-400 mt-2 px-3 py-1.5 rounded-md bg-white/[0.04] inline-block border border-white/[0.08]">
                      {activeSkill.level}
                    </div>
                  </div>

                  <div className="pt-1 sm:pt-2">
                    <span className="text-xs font-tech text-zinc-500 block mb-2 uppercase tracking-wider">
                      Practical Context & Scope
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
                      {activeSkill.description}
                    </p>
                  </div>

                  {/* Candidate Validation Note */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-black/60 border border-white/[0.08] space-y-1.5 text-xs font-tech text-zinc-400">
                    <div className="flex items-center gap-2 text-accent-cyan font-bold text-xs">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>OFFICIAL CANDIDATE SKILL</span>
                    </div>
                    <div className="text-[11px] sm:text-xs">
                      Applied in CSE Diploma curriculum, SkillManthan training, and production projects.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 sm:py-16 text-center text-zinc-500 font-tech text-xs">
                  Select a skill satellite to inspect telemetry data
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
