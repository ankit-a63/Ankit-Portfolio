import React from 'react';
import { ASMonogram } from './ASMonogram';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUp, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#050507] pt-20 pb-12 px-6 sm:px-8 overflow-hidden text-zinc-400">
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-12">
        {/* Top Footer Grid */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
          {/* Monogram & Identity */}
          <div className="flex items-center gap-4">
            <ASMonogram size={54} glow={true} />
            <div>
              <div className="font-editorial font-bold text-lg text-white tracking-wider">
                ANKIT SINGH
              </div>
              <div className="text-xs font-tech text-zinc-500">
                {language === 'en'
                  ? 'Diploma in CSE @ Golu Polytechnic, Ballia'
                  : 'डिप्लोमा इन सीएसई @ गोलू पॉलिटेक्निक, बलिया'}
              </div>
            </div>
          </div>

          {/* Quick Anchor Jumps */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-tech uppercase tracking-widest text-zinc-400">
            <a href="#work" className="hover:text-accent-cyan transition-colors">
              {t.nav.work}
            </a>
            <a href="#philosophy" className="hover:text-accent-cyan transition-colors">
              {t.nav.about}
            </a>
            <a href="#skills" className="hover:text-accent-cyan transition-colors">
              {t.nav.skills}
            </a>
            <a href="#contact" className="hover:text-accent-cyan transition-colors">
              {t.nav.contact}
            </a>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/60 hover:border-accent-cyan hover:text-white transition-all text-xs font-tech text-zinc-300"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1 text-accent-cyan" />
          </button>
        </div>

        {/* Bottom Copyright & Architecture Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} Ankit Singh. {t.footer.copyright}
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
            <span>{t.footer.credit}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
