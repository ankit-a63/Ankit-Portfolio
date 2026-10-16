import React, { useState, useEffect } from 'react';
import { ASMonogram } from './ASMonogram';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  isMuted: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isMuted, onToggleSound }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['work', 'about', 'skills', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'work', label: t.nav.work, href: '#work' },
    { id: 'about', label: t.nav.about, href: '#about' },
    { id: 'skills', label: t.nav.skills, href: '#skills' },
    { id: 'contact', label: t.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#070709]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo with AS Monogram */}
          <a
            href="#"
            className="group flex items-center gap-3.5 focus:outline-none"
            aria-label="Ankit Singh Portfolio - Home"
          >
            <ASMonogram size={40} glow={true} className="transition-transform duration-300 group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="font-editorial font-bold text-sm sm:text-base tracking-widest text-zinc-100 group-hover:text-accent-cyan transition-colors">
                ANKIT SINGH
              </span>
              <span className="text-[10px] font-tech tracking-wider text-zinc-500 uppercase">
                CSE // 2026
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-[#0c0c10]/60 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-tech tracking-widest uppercase transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-white/[0.08] shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_#38bdf8]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Center: Lang Toggle + Audio + Connect CTA */}
          <div className="hidden lg:flex items-center gap-3.5">
            {/* Language Switcher (EN / HI) */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-700/60 bg-zinc-900/60 hover:border-accent-cyan/60 hover:bg-zinc-800/80 transition-all text-xs font-tech tracking-widest text-zinc-300 hover:text-white focus:outline-none"
              title="Toggle Language (English / हिन्दी)"
            >
              <Globe className="w-3.5 h-3.5 text-accent-cyan" />
              <span>{t.nav.langToggle}</span>
            </button>

            {/* Audio Experience Toggle */}
            <button
              onClick={onToggleSound}
              className="p-2 rounded-full border border-zinc-700/60 bg-zinc-900/60 hover:border-accent-cyan/60 hover:bg-zinc-800/80 transition-all text-zinc-400 hover:text-white focus:outline-none"
              title={isMuted ? t.nav.soundOff : t.nav.soundOn}
              aria-label="Toggle ambient audio"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-accent-cyan animate-pulse" />
              )}
            </button>

            {/* Connect Action Button */}
            <button
              onClick={() => handleNavClick('#contact')}
              className="relative group px-4 py-1.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 hover:bg-accent-cyan hover:text-black transition-all duration-300 text-xs font-tech tracking-wider text-accent-cyan flex items-center gap-1.5 overflow-hidden"
            >
              <span className="relative z-10 font-semibold">{t.nav.contact}</span>
              <ArrowUpRight className="w-3.5 h-3.5 relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Actions (Lang switch + Menu Toggle) */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-tech text-accent-cyan"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'हि' : 'EN'}</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl border border-zinc-800 bg-zinc-900/90 text-zinc-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#070709]/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-24 lg:hidden animate-in fade-in duration-300">
          <div className="flex flex-col gap-6">
            <div className="text-[10px] font-tech tracking-widest text-zinc-500 uppercase">
              INDEX // NAVIGATION
            </div>
            {navLinks.map((link, idx) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.href)}
                className="flex items-center justify-between text-2xl font-editorial font-bold text-zinc-200 hover:text-accent-cyan text-left border-b border-zinc-800/80 pb-4 transition-colors"
              >
                <span>{link.label}</span>
                <span className="text-xs font-tech text-zinc-500">0{idx + 1}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-tech text-zinc-400">ATMOSPHERE AUDIO</span>
              <button
                onClick={onToggleSound}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-900 text-xs font-tech text-zinc-300"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-accent-cyan" />}
                <span>{isMuted ? 'Muted' : 'Playing'}</span>
              </button>
            </div>

            <div className="text-[11px] font-tech text-zinc-500">
              {t.nav.status}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
