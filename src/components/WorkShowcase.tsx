import React, { useRef, useEffect } from 'react';
import { projects } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink, Layers, CheckCircle2, Shield, Wrench, Building2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const WorkShowcase: React.FC = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const projectCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectCardsRef.current.forEach((card) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-32 px-6 sm:px-8 max-w-7xl mx-auto w-full"
    >
      {/* Section Header */}
      <div className="mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-tech text-accent-cyan tracking-widest uppercase mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>{t.projects.badge}</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-extrabold tracking-tight text-white">
              {t.projects.headline}
            </h2>
            <p className="mt-4 text-zinc-400 font-tech text-sm sm:text-base max-w-2xl leading-relaxed">
              {t.projects.subhead}
            </p>
          </div>
          <div className="text-right hidden lg:block">
            <span className="text-4xl font-editorial font-bold text-zinc-600">
              {t.projects.projectCount}
            </span>
          </div>
        </div>
      </div>

      {/* Immersive Project Presentations (Editorial Storytelling) */}
      <div className="space-y-32">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (projectCardsRef.current[index] = el)}
            className="group relative rounded-3xl border border-white/[0.08] bg-[#0c0c11]/80 backdrop-blur-xl overflow-hidden p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] transition-all duration-500 hover:border-zinc-600/60"
          >
            {/* Background Radial Glow */}
            <div
              className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20 transition-opacity duration-500 group-hover:opacity-30"
              style={{ backgroundColor: project.accentColor }}
            />

            {/* Top Project Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/[0.08] text-xs font-tech">
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-editorial font-bold text-accent-cyan">
                  0{index + 1}
                </span>
                <div className="w-2 h-2 rounded-full bg-zinc-700" />
                <span className="tracking-widest text-zinc-400 uppercase">
                  {project.category[language]}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-zinc-300 text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Main Project Grid: Left Storytelling, Right Interactive Dimensional Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10 items-center">
              {/* Left Storytelling Content (7 Cols) */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <h3 className="text-3xl sm:text-5xl font-editorial font-extrabold text-white tracking-tight group-hover:text-zinc-100 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-base sm:text-lg text-accent-cyan font-normal">
                    {project.subtitle[language]}
                  </p>
                </div>

                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
                  {project.description[language]}
                </p>

                {/* Project Metrics Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-white/[0.06]">
                  {project.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="space-y-1">
                      <div className="text-lg sm:text-xl font-editorial font-bold text-white">
                        {metric.value}
                      </div>
                      <div className="text-[11px] font-tech text-zinc-500 uppercase tracking-wider">
                        {metric.label[language]}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Verified Key Features */}
                <div className="space-y-3">
                  <div className="text-xs font-tech text-zinc-400 tracking-wider uppercase flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-accent-cyan" />
                    <span>{t.projects.keyHighlights}</span>
                  </div>
                  <ul className="space-y-2">
                    {project.features[language].map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Working Live Project Action */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-cyan text-black font-tech font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] hover:scale-[1.02] transition-all duration-300"
                  >
                    <span>{t.projects.visitLive}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <span className="text-[11px] font-tech text-zinc-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>VERIFIED LIVE DEPLOYMENT</span>
                  </span>
                </div>
              </div>

              {/* Right Dimensional Interface Architecture Preview (5 Cols) */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl border border-zinc-700/60 bg-[#070709] p-6 shadow-2xl overflow-hidden group-hover:border-accent-cyan/50 transition-all duration-500">
                  {/* Browser Window Top Chrome Bar */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-tech text-zinc-400 truncate max-w-[180px]">
                      {project.liveUrl.replace('https://', '')}
                    </div>
                    <div className="w-3" />
                  </div>

                  {/* Specific Visual UI Mockup based on actual project */}
                  {project.id === 'sanix-tool' ? (
                    <div className="space-y-4">
                      {/* Sanix Tool Mockup */}
                      <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-900 to-[#121218] border border-zinc-800">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Wrench className="w-4 h-4 text-accent-cyan" />
                            <span className="font-editorial font-bold text-xs text-white">SANIX SUITE</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-tech bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                            34 TOOLS LIVE
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-tech text-zinc-300">
                          <div className="p-2 rounded bg-black/40 border border-white/5">
                            <span className="text-zinc-500 block text-[9px]">IMAGE</span>
                            Compressor & Resizer
                          </div>
                          <div className="p-2 rounded bg-black/40 border border-white/5">
                            <span className="text-zinc-500 block text-[9px]">PDF</span>
                            Merger & Splitter
                          </div>
                          <div className="p-2 rounded bg-black/40 border border-white/5">
                            <span className="text-zinc-500 block text-[9px]">DEV</span>
                            JSON & Base64
                          </div>
                          <div className="p-2 rounded bg-black/40 border border-white/5">
                            <span className="text-zinc-500 block text-[9px]">CALC</span>
                            EMI & Scientific
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent-cyan/20 border border-accent-cyan/40 flex items-center justify-center text-accent-cyan text-xs font-bold">
                            AS
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white">Sani AI Assistant</div>
                            <div className="text-[10px] font-tech text-zinc-500">Interactive Web Assistant</div>
                          </div>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Smart Village Management System Mockup */}
                      <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-900 to-[#0e1726] border border-zinc-800">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-sky-400" />
                            <span className="font-editorial font-bold text-xs text-white">GRAM PANCHAYAT</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-tech bg-sky-500/10 text-sky-400 border border-sky-500/20">
                            E-GOVERNANCE
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5 text-[11px] font-tech">
                            <span className="text-zinc-300">Public Grievances</span>
                            <span className="text-amber-400 font-bold">Active Tracking</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5 text-[11px] font-tech">
                            <span className="text-zinc-300">Village Asset Registry</span>
                            <span className="text-emerald-400 font-bold">Audited</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5 text-[11px] font-tech">
                            <span className="text-zinc-300">Citizen Direct Access</span>
                            <span className="text-accent-cyan font-bold">Online</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 text-[11px] font-tech text-zinc-400 flex items-center justify-between">
                        <span>PANCHAYAT WORKFLOW AUTOMATION</span>
                        <span className="text-sky-400 font-bold">v2.4</span>
                      </div>
                    </div>
                  )}

                  {/* Bottom Dimensional Shading Effect */}
                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-tech text-zinc-500">
                    <span>SECURITY: SSL CERTIFIED</span>
                    <span>STATUS: 200 OK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
