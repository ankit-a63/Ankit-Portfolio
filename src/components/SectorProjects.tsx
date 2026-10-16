import React from 'react';
import { projects } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink, Layers, CheckCircle2, Shield, Wrench, Building2, Terminal } from 'lucide-react';

export const SectorProjects: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section
      id="sector-creations"
      className="relative min-h-screen py-36 px-6 sm:px-12 lg:px-24 z-10"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Sector Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-cyan/30 bg-black/60 text-xs font-tech text-accent-cyan tracking-widest uppercase mb-8">
          <Layers className="w-3.5 h-3.5" />
          <span>SECTOR 03 // {t.projects.badge}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-24">
          <div>
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-editorial font-extrabold tracking-tight text-white leading-[0.98]">
              {t.projects.headline}
            </h2>
            <p className="mt-6 text-zinc-400 font-tech text-sm sm:text-base max-w-2xl leading-relaxed">
              {t.projects.subhead}
            </p>
          </div>
          <div className="text-right hidden lg:block">
            <span className="text-5xl font-editorial font-extrabold text-zinc-700">
              02 / 02
            </span>
          </div>
        </div>

        {/* Project Spatial Cards */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative rounded-3xl border border-white/[0.1] bg-[#090910]/90 backdrop-blur-2xl p-8 sm:p-14 lg:p-16 overflow-hidden shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] hover:border-zinc-500/80 transition-all duration-500"
            >
              {/* Holographic Radial Flare */}
              <div
                className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-25 group-hover:opacity-35 transition-opacity"
                style={{ backgroundColor: project.accentColor }}
              />

              {/* Top Telemetry Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/[0.08] text-xs font-tech">
                <div className="flex items-center gap-4">
                  <span className="text-3xl sm:text-4xl font-editorial font-extrabold text-accent-cyan">
                    HOLO_{index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  <span className="tracking-widest text-zinc-400 uppercase">
                    {project.category[language]}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-zinc-300 text-xs font-tech"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Main Holo Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10 items-center">
                {/* Left Story / Specs */}
                <div className="lg:col-span-7 space-y-8">
                  <div>
                    <h3 className="text-3xl sm:text-5xl font-editorial font-extrabold text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-base sm:text-lg text-accent-cyan font-normal">
                      {project.subtitle[language]}
                    </p>
                  </div>

                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
                    {project.description[language]}
                  </p>

                  {/* Metrics Array */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/[0.06]">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-lg sm:text-xl font-editorial font-bold text-white">
                          {metric.value}
                        </div>
                        <div className="text-[11px] font-tech text-zinc-500 uppercase mt-1">
                          {metric.label[language]}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-tech text-zinc-400 uppercase flex items-center gap-2">
                      <Shield className="w-4 h-4 text-accent-cyan" />
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

                  {/* Warp Action Button */}
                  <div className="pt-4 flex flex-wrap items-center gap-5">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-cyan text-black font-tech font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_40px_rgba(56,189,248,0.7)] hover:scale-105 transition-all duration-300"
                    >
                      <span>{t.projects.visitLive}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <div className="text-xs font-tech text-emerald-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>LIVE SYSTEM // 200 OK</span>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Holographic Screen */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl border border-zinc-700/80 bg-[#050508] p-6 shadow-2xl overflow-hidden group-hover:border-accent-cyan/60 transition-colors">
                    {/* Top Browser Bar */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-tech text-zinc-400 truncate max-w-[180px]">
                        {project.liveUrl.replace('https://', '')}
                      </span>
                      <Terminal className="w-3.5 h-3.5 text-zinc-600" />
                    </div>

                    {/* Realistic UI Simulation */}
                    {project.id === 'sanix-tool' ? (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-900 to-[#101018] border border-zinc-800">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Wrench className="w-4 h-4 text-accent-cyan" />
                              <span className="font-editorial font-bold text-xs text-white">SANIX CORE PLATFORM</span>
                            </div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-tech bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30">
                              34 UTILITIES
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[11px] font-tech text-zinc-300">
                            <div className="p-2 rounded bg-black/50 border border-white/5">Image Suite</div>
                            <div className="p-2 rounded bg-black/50 border border-white/5">PDF Merger/Split</div>
                            <div className="p-2 rounded bg-black/50 border border-white/5">JSON/Regex Tools</div>
                            <div className="p-2 rounded bg-black/50 border border-white/5">EMI & Calculators</div>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent-cyan/20 border border-accent-cyan/40 flex items-center justify-center text-accent-cyan text-xs font-bold">
                              AS
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-white">Sani AI Assistant</div>
                              <div className="text-[10px] font-tech text-zinc-500">Zero Server Upload Engine</div>
                            </div>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-900 to-[#0e1726] border border-zinc-800">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-sky-400" />
                              <span className="font-editorial font-bold text-xs text-white">GRAM PANCHAYAT PORTAL</span>
                            </div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-tech bg-sky-500/10 text-sky-400 border border-sky-500/30">
                              CIVIC TECH
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 rounded bg-black/50 text-[11px] font-tech">
                              <span className="text-zinc-300">Public Grievances</span>
                              <span className="text-amber-400 font-bold">Real-Time Tracking</span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded bg-black/50 text-[11px] font-tech">
                              <span className="text-zinc-300">Village Asset Registry</span>
                              <span className="text-emerald-400 font-bold">Audited & Verified</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/40 text-[11px] font-tech text-zinc-400 flex items-center justify-between">
                          <span>Workflow Automation Standard</span>
                          <span className="text-sky-400 font-bold">v2.4</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
