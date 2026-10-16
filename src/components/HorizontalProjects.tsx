import React, { useRef, useEffect } from 'react';
import { projects } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink, Layers, CheckCircle2, Shield, Wrench, Building2, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalProjects: React.FC = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate horizontal pin on desktop/tablets where width > 850px for ideal UX
    const mm = gsap.matchMedia();

    mm.add('(min-width: 850px)', () => {
      const section = sectionRef.current;
      const trigger = triggerRef.current;
      if (!section || !trigger) return;

      const totalScrollWidth = section.scrollWidth - window.innerWidth;

      const pinTween = gsap.to(section, {
        x: -totalScrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: () => `+=${totalScrollWidth * 1.2}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        pinTween.kill();
      };
    });

    return () => mm.revert();
  }, [language]);

  return (
    <div id="work" ref={triggerRef} className="relative w-full overflow-hidden">
      <div
        ref={sectionRef}
        className="flex flex-col lg:flex-row items-stretch lg:h-screen w-full lg:w-max relative z-10 bg-transparent px-6 sm:px-12 lg:px-24 py-20 lg:py-0"
      >
        {/* Intro Slide */}
        <div className="w-full lg:w-[650px] shrink-0 flex flex-col justify-center pr-8 lg:pr-16 mb-16 lg:mb-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-tech text-accent-cyan tracking-widest uppercase mb-6 w-fit">
            <Layers className="w-3.5 h-3.5" />
            <span>{t.projects.badge}</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-extrabold tracking-tight text-white leading-[1.02]">
            {t.projects.headline}
          </h2>

          <p className="mt-6 text-zinc-400 font-tech text-sm sm:text-base leading-relaxed max-w-lg">
            {t.projects.subhead}
          </p>

          <div className="mt-10 flex items-center gap-4 text-xs font-tech text-zinc-500">
            <span className="text-accent-cyan font-bold">SCROLL RIGHT</span>
            <ArrowRight className="w-4 h-4 text-accent-cyan animate-pulse" />
            <div className="w-12 h-[1px] bg-zinc-800" />
            <span>02 CURATED WORKS</span>
          </div>
        </div>

        {/* Project Slides */}
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="w-full lg:w-[920px] shrink-0 flex flex-col justify-center px-0 lg:px-8 mb-16 lg:mb-0"
          >
            <div className="relative rounded-3xl border border-white/[0.1] bg-[#0c0c12]/90 backdrop-blur-2xl p-8 sm:p-12 overflow-hidden shadow-[0_25px_70px_-20px_rgba(0,0,0,0.8)] hover:border-zinc-500/60 transition-all duration-500">
              {/* Top Accent Aura */}
              <div
                className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20"
                style={{ backgroundColor: project.accentColor }}
              />

              {/* Header Meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08] text-xs font-tech">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-editorial font-extrabold text-accent-cyan">
                    0{index + 1}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  <span className="tracking-widest text-zinc-400 uppercase">
                    {project.category[language]}
                  </span>
                </div>

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

              {/* Main Split Content */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8 items-center">
                {/* Left Specs (7 Cols) */}
                <div className="md:col-span-7 space-y-6">
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-editorial font-extrabold text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-accent-cyan font-normal">
                      {project.subtitle[language]}
                    </p>
                  </div>

                  <p className="text-zinc-300 text-sm leading-relaxed font-normal">
                    {project.description[language]}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/[0.06]">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-base sm:text-lg font-editorial font-bold text-white">
                          {metric.value}
                        </div>
                        <div className="text-[10px] font-tech text-zinc-500 uppercase">
                          {metric.label[language]}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-tech text-zinc-400 uppercase flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-accent-cyan" />
                      <span>{t.projects.keyHighlights}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {project.features[language].slice(0, 3).map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent-cyan shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Link */}
                  <div className="pt-2 flex items-center gap-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-accent-cyan text-black font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.7)] hover:scale-105 transition-all duration-300"
                    >
                      <span>{t.projects.visitLive}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-[10px] font-tech text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>ONLINE</span>
                    </span>
                  </div>
                </div>

                {/* Right Interactive Visual Preview (5 Cols) */}
                <div className="md:col-span-5">
                  <div className="rounded-2xl border border-zinc-700/80 bg-[#070709] p-5 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-[9px] font-tech text-zinc-500 truncate max-w-[140px]">
                        {project.liveUrl.replace('https://', '')}
                      </span>
                    </div>

                    {project.id === 'sanix-tool' ? (
                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5">
                              <Wrench className="w-3.5 h-3.5 text-accent-cyan" />
                              <span className="text-xs font-bold text-white">SANIX SUITE</span>
                            </div>
                            <span className="text-[9px] font-tech text-accent-cyan">34 UTILITIES</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 text-[10px] font-tech text-zinc-300">
                            <div className="p-1.5 rounded bg-black/50 border border-white/5">IMAGE COMPRESS</div>
                            <div className="p-1.5 rounded bg-black/50 border border-white/5">PDF MERGER</div>
                            <div className="p-1.5 rounded bg-black/50 border border-white/5">JSON TOOLS</div>
                            <div className="p-1.5 rounded bg-black/50 border border-white/5">CALCULATORS</div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-[10px] font-tech text-zinc-400">
                          <span>Sani AI Assistant</span>
                          <span className="text-emerald-400">ACTIVE</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-[#0c1422] border border-zinc-800">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 text-sky-400" />
                              <span className="text-xs font-bold text-white">GRAM PANCHAYAT</span>
                            </div>
                            <span className="text-[9px] font-tech text-sky-400">E-GOVERNANCE</span>
                          </div>
                          <div className="space-y-1.5 text-[10px] font-tech text-zinc-300">
                            <div className="p-1.5 rounded bg-black/50 flex justify-between">
                              <span>Citizen Grievances</span>
                              <span className="text-amber-400 font-bold">Tracked</span>
                            </div>
                            <div className="p-1.5 rounded bg-black/50 flex justify-between">
                              <span>Public Asset Map</span>
                              <span className="text-emerald-400 font-bold">Verified</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-[10px] font-tech text-zinc-400">
                          <span>Civic Tech Workflow</span>
                          <span className="text-sky-400 font-bold">v2.4</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
