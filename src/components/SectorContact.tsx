import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Send, Copy, Check, MessageSquare, ExternalLink, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export const SectorContact: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isCopied, setIsCopied] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);

  const contactEmail = 'ankitsingh.dev.in@gmail.com';
  const githubUrl = 'https://github.com/ankit-a63/Ankit-Portfolio';
  const linkedinUrl = 'https://linkedin.com/';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = t.contact.validationErrors.name;
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = t.contact.validationErrors.email;
    if (!formData.message.trim() || formData.message.length < 5) newErrors.message = t.contact.validationErrors.message;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#38bdf8', '#ffffff', '#0284c7'],
      });
    } catch {}

    const subjectParam = encodeURIComponent(formData.subject.trim() || `Transmission from ${formData.name}`);
    const bodyParam = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n[Transmitted via Ankit Singh Spatial 3D Terminal]`
    );

    const mailtoUrl = `mailto:${contactEmail}?subject=${subjectParam}&body=${bodyParam}`;
    window.location.href = mailtoUrl;

    setSubmissionFeedback(
      language === 'en'
        ? `Opening email client to send transmission to ${contactEmail}. If your client didn't open, use "Copy Email" button!`
        : `ईमेल क्लाइंट खुल रहा है (${contactEmail})। यदि ईमेल क्लाइंट नहीं खुलता है, तो 'ईमेल कॉपी करें' बटन का उपयोग करें!`
    );
  };

  return (
    <section
      id="sector-beacon"
      className="relative min-h-screen py-36 px-6 sm:px-12 lg:px-24 z-10 flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Sector Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-cyan/30 bg-black/60 text-xs font-tech text-accent-cyan tracking-widest uppercase mb-8">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>SECTOR 05 // {t.contact.badge}</span>
        </div>

        {/* Heading */}
        <div className="mb-20">
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-editorial font-extrabold tracking-tight text-white leading-[0.98] max-w-5xl">
            {t.contact.headline}
          </h2>
          <p className="mt-6 text-zinc-400 font-tech text-sm sm:text-base max-w-2xl leading-relaxed">
            {t.contact.subhead}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Dispatch Center (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-3xl border border-white/[0.1] bg-[#090910]/85 backdrop-blur-2xl p-8 space-y-6">
              <div className="text-xs font-tech text-accent-cyan tracking-widest uppercase">
                {t.contact.directEmailTitle}
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] flex items-center justify-between gap-3">
                <span className="font-tech text-sm text-zinc-200 truncate select-all">
                  {contactEmail}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="shrink-0 p-2.5 rounded-xl bg-zinc-800 hover:bg-accent-cyan hover:text-black text-zinc-300 transition-all"
                  title={isCopied ? t.contact.copiedEmail : t.contact.copyEmail}
                  aria-label="Copy email address"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-xs font-tech text-zinc-400 leading-relaxed">
                {t.contact.directEmailNote}
              </p>

              <div className="pt-4 border-t border-white/[0.06] text-xs font-tech text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t.contact.availability}</span>
              </div>
            </div>

            {/* Socials */}
            <div className="rounded-3xl border border-white/[0.08] bg-[#08080e]/70 p-8 space-y-4">
              <div className="text-xs font-tech text-zinc-400 tracking-widest uppercase">
                {t.contact.socialsTitle}
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.06] bg-zinc-900/50 hover:border-zinc-500 text-xs font-tech text-zinc-200 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon className="w-4 h-4 text-accent-cyan" />
                    <span>GitHub Repositories</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                </a>

                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.06] bg-zinc-900/50 hover:border-zinc-500 text-xs font-tech text-zinc-200 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedinIcon className="w-4 h-4 text-accent-cyan" />
                    <span>LinkedIn Professional Network</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Quantum Transmission Form (7 Cols) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/[0.1] bg-[#08080e]/95 backdrop-blur-2xl p-8 sm:p-12 space-y-6 shadow-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-tech tracking-wider uppercase text-zinc-400 block">
                    {t.contact.formName} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full px-4 py-3.5 rounded-xl bg-black/60 border text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                      errors.name ? 'border-red-500/80' : 'border-white/[0.08] focus:border-accent-cyan'
                    }`}
                  />
                  {errors.name && <span className="text-[11px] font-tech text-red-400 block">{errors.name}</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-tech tracking-wider uppercase text-zinc-400 block">
                    {t.contact.formEmail} *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@domain.com"
                    className={`w-full px-4 py-3.5 rounded-xl bg-black/60 border text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500/80' : 'border-white/[0.08] focus:border-accent-cyan'
                    }`}
                  />
                  {errors.email && <span className="text-[11px] font-tech text-red-400 block">{errors.email}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-tech tracking-wider uppercase text-zinc-400 block">
                  {t.contact.formSubject}
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Collaboration, Web Development or Project Inquiry"
                  className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent-cyan transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-tech tracking-wider uppercase text-zinc-400 block">
                  {t.contact.formMessage} *
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your note, proposal, or thoughts here..."
                  className={`w-full px-4 py-3.5 rounded-xl bg-black/60 border text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none ${
                    errors.message ? 'border-red-500/80' : 'border-white/[0.08] focus:border-accent-cyan'
                  }`}
                />
                {errors.message && <span className="text-[11px] font-tech text-red-400 block">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-accent-cyan hover:bg-sky-400 text-black font-tech font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{t.contact.sendBtn}</span>
              </button>

              {submissionFeedback && (
                <div className="p-4 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-xs font-tech text-accent-cyan leading-relaxed flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{submissionFeedback}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
