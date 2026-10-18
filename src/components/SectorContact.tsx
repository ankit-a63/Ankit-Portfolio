import React, { useState } from 'react';
import { portfolioContent } from '../data/translations';
import { Send, Copy, Check, MessageSquare, ExternalLink, AlertCircle, Phone, PhoneCall, Mail } from 'lucide-react';
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

const WhatsappIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.44 19.66L5.27 16.63L5.07 16.31C4.24 15 3.8 13.48 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.06 7.42C8.89 7.42 8.62 7.48 8.39 7.73C8.16 7.97 7.5 8.59 7.5 9.87C7.5 11.15 8.43 12.38 8.56 12.56C8.69 12.73 10.37 15.33 12.94 16.44C13.55 16.7 14.03 16.86 14.4 16.98C15.02 17.18 15.58 17.15 16.03 17.08C16.53 17.01 17.57 16.45 17.78 15.84C18 15.24 18 14.72 17.93 14.61C17.86 14.5 17.69 14.44 17.44 14.31C17.19 14.19 15.96 13.58 15.73 13.5C15.5 13.41 15.34 13.37 15.17 13.62C15 13.87 14.53 14.44 14.39 14.61C14.24 14.77 14.1 14.79 13.85 14.67C13.6 14.54 12.79 14.28 11.83 13.42C11.08 12.75 10.58 11.93 10.43 11.68C10.29 11.43 10.42 11.29 10.54 11.17C10.65 11.06 10.79 10.88 10.92 10.73C11.04 10.58 11.09 10.47 11.17 10.31C11.25 10.14 11.21 10 11.15 9.87C11.09 9.75 10.62 8.6 10.43 8.13C10.24 7.68 10.05 7.74 9.9 7.73C9.76 7.73 9.6 7.72 9.43 7.72C9.26 7.72 9.06 7.42 9.06 7.42Z" />
  </svg>
);

const GmailIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const SectorContact: React.FC = () => {
  const { contact: tContact } = portfolioContent;
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isCopied, setIsCopied] = useState(false);
  const [isPhoneCopied, setIsPhoneCopied] = useState(false);
  const [submittedLink, setSubmittedLink] = useState<{ gmail: string; mailto: string } | null>(null);

  const contactEmail = 'ankitsani6288@gmail.com';
  const phoneNumber = '6388872564';
  const formattedPhone = '+91 63888 72564';
  const whatsappUrl = `https://wa.me/916388872564?text=${encodeURIComponent('Hi Ankit, I visited your 3D portfolio and would like to connect!')}`;
  const githubUrl = 'https://github.com/ankit-a63';
  const linkedinUrl = 'https://www.linkedin.com/in/ankit-singh-b501b8375/';
  const instagramUrl = 'https://www.instagram.com/justankix';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setIsPhoneCopied(true);
    setTimeout(() => setIsPhoneCopied(false), 3000);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = tContact.validationErrors.name;
    if (!formData.message.trim() || formData.message.trim().length < 3) {
      newErrors.message = tContact.validationErrors.message;
    }
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

    const subjectStr = formData.subject.trim() || (formData.name.trim() ? `Inquiry from ${formData.name.trim()}` : 'Portfolio Project Inquiry');
    const bodyStr = `Hi Ankit,\n\n${formData.message.trim()}\n\nBest regards,\n${formData.name.trim() || 'Visitor'}`;

    // 1. Direct Web Gmail Compose URL (Opens Gmail in browser with pre-filled To, Subject, and Body)
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}&su=${encodeURIComponent(subjectStr)}&body=${encodeURIComponent(bodyStr)}`;

    // 2. Standard mailto fallback
    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(subjectStr)}&body=${encodeURIComponent(bodyStr)}`;

    setSubmittedLink({ gmail: gmailComposeUrl, mailto: mailtoUrl });

    // Open Gmail directly in a new tab
    const newWindow = window.open(gmailComposeUrl, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = mailtoUrl;
    }
  };

  return (
    <section
      id="sector-beacon"
      className="relative min-h-screen py-20 sm:py-36 px-4 sm:px-12 lg:px-24 z-10 flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Sector Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-cyan/30 bg-black/60 text-xs font-tech text-accent-cyan tracking-widest uppercase mb-6 sm:mb-8">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>SECTOR 05 // {tContact.badge}</span>
        </div>

        {/* Heading */}
        <div className="mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-6xl lg:text-8xl font-editorial font-extrabold tracking-tight text-white leading-[0.98] max-w-5xl break-words">
            {tContact.headline}
          </h2>
          <p className="mt-4 sm:mt-6 text-zinc-400 font-tech text-xs sm:text-base max-w-2xl leading-relaxed">
            {tContact.subhead}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Dispatch Center (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            {/* Direct Email Card */}
            <div className="rounded-2xl sm:rounded-3xl border border-white/[0.1] bg-[#090910]/85 backdrop-blur-2xl p-5 sm:p-7 space-y-4 sm:space-y-5">
              <div className="text-xs font-tech text-accent-cyan tracking-widest uppercase">
                {tContact.directEmailTitle}
              </div>

              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/60 border border-white/[0.08] flex items-center justify-between gap-2.5">
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-tech text-xs sm:text-sm text-zinc-200 hover:text-accent-cyan truncate select-all transition-colors"
                  title="Send email"
                >
                  {contactEmail}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="shrink-0 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-zinc-800 hover:bg-accent-cyan hover:text-black text-zinc-300 transition-all"
                  title={isCopied ? tContact.copiedEmail : tContact.copyEmail}
                  aria-label="Copy email address"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-xs font-tech text-zinc-400 leading-relaxed">
                Directly opens your email client drafted to <span className="text-zinc-200">{contactEmail}</span>.
              </p>
            </div>

            {/* Direct Phone & WhatsApp Card */}
            <div className="rounded-2xl sm:rounded-3xl border border-white/[0.1] bg-[#090910]/85 backdrop-blur-2xl p-5 sm:p-7 space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-tech text-emerald-400 tracking-widest uppercase flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" />
                  <span>DIRECT CALL & WHATSAPP</span>
                </span>
                <span className="text-[10px] font-tech text-zinc-500 uppercase">INSTANT REACH</span>
              </div>

              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/60 border border-white/[0.08] flex items-center justify-between gap-2.5">
                <a
                  href={`tel:${phoneNumber}`}
                  className="font-tech text-xs sm:text-sm text-zinc-200 hover:text-emerald-400 truncate select-all transition-colors flex items-center gap-2"
                  title="Call directly"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{formattedPhone}</span>
                </a>
                <button
                  onClick={handleCopyPhone}
                  className="shrink-0 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-zinc-800 hover:bg-emerald-400 hover:text-black text-zinc-300 transition-all"
                  title={isPhoneCopied ? 'Phone Copied!' : 'Copy Phone Number'}
                  aria-label="Copy phone number"
                >
                  {isPhoneCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Instant WhatsApp Action Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 text-emerald-400 hover:text-emerald-300 font-tech text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.15)] text-center"
              >
                <WhatsappIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">CHAT ON WHATSAPP (+91 {phoneNumber})</span>
                <ExternalLink className="w-3 h-3 ml-1 shrink-0" />
              </a>

              <div className="pt-2 border-t border-white/[0.06] text-xs font-tech text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>{tContact.availability}</span>
              </div>
            </div>

            {/* Verified Profiles */}
            <div className="rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#08080e]/70 p-5 sm:p-7 space-y-3 sm:space-y-4">
              <div className="text-xs font-tech text-zinc-400 tracking-widest uppercase">
                {tContact.socialsTitle}
              </div>

              <div className="flex flex-col gap-2 sm:gap-2.5">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl border border-white/[0.06] bg-zinc-900/50 hover:border-zinc-500 text-xs font-tech text-zinc-200 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon className="w-4 h-4 text-accent-cyan shrink-0" />
                    <span>GitHub Profile (@ankit-a63)</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                </a>

                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl border border-white/[0.06] bg-zinc-900/50 hover:border-zinc-500 text-xs font-tech text-zinc-200 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedinIcon className="w-4 h-4 text-[#0077b5] shrink-0" />
                    <span>LinkedIn Professional Network</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl border border-pink-500/20 bg-pink-950/15 hover:border-pink-500/40 text-xs font-tech text-pink-200 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <InstagramIcon className="w-4 h-4 text-pink-400 shrink-0" />
                    <span>Instagram (@justankix)</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-pink-500/60 shrink-0" />
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-950/20 hover:border-emerald-500/40 text-xs font-tech text-emerald-300 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <WhatsappIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>WhatsApp Direct Transmission</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-500/60 shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Direct Gmail Dispatch Form (7 Cols) */}
          <div className="lg:col-span-7 w-full">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl sm:rounded-3xl border border-white/[0.1] bg-[#08080e]/95 backdrop-blur-2xl p-5 sm:p-8 md:p-12 space-y-5 sm:space-y-6 shadow-2xl"
            >
              {/* Recipient Notice Banner */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-accent-cyan/10 border border-accent-cyan/25 text-xs font-tech">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse shrink-0" />
                  <span className="text-zinc-400">TO (RECEIVER):</span>
                  <span className="text-white font-bold select-all">{contactEmail}</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-accent-cyan">AUTOMATICALLY PRE-FILLED</span>
              </div>

              {/* Form Inputs (text-base sm:text-sm avoids iOS auto-zoom shift) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs font-tech tracking-wider uppercase text-zinc-400 block">
                    {tContact.formName} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sanni Singh"
                    className={`w-full px-4 py-3 sm:py-3.5 rounded-xl bg-black/60 border text-base sm:text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                      errors.name ? 'border-red-500/80' : 'border-white/[0.08] focus:border-accent-cyan'
                    }`}
                  />
                  {errors.name && <span className="text-[11px] font-tech text-red-400 block">{errors.name}</span>}
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs font-tech tracking-wider uppercase text-zinc-400 block">
                    {tContact.formSubject}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Build medical app"
                    className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-black/60 border border-white/[0.08] text-base sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent-cyan transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-tech tracking-wider uppercase text-zinc-400 block">
                    {tContact.formMessage} *
                  </label>
                  <span className="text-[10px] sm:text-[11px] font-tech text-zinc-500">
                    Will appear in your Gmail
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message here (e.g. Please respond regarding medical app build)..."
                  className={`w-full px-4 py-3 sm:py-3.5 rounded-xl bg-black/60 border text-base sm:text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none ${
                    errors.message ? 'border-red-500/80' : 'border-white/[0.08] focus:border-accent-cyan'
                  }`}
                />
                {errors.message && <span className="text-[11px] font-tech text-red-400 block">{errors.message}</span>}
              </div>

              {/* Submit Action: Direct Launch in Gmail */}
              <button
                type="submit"
                className="w-full py-3.5 sm:py-4 rounded-xl bg-accent-cyan hover:bg-sky-400 text-black font-tech font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] flex items-center justify-center gap-2.5"
              >
                <GmailIcon className="w-4 h-4 text-black shrink-0" />
                <span>OPEN & SEND IN GMAIL</span>
                <Send className="w-4 h-4 ml-1 shrink-0" />
              </button>

              {/* Success / Feedback Banner with 1-click links */}
              {submittedLink && (
                <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0d1620] border border-accent-cyan/40 space-y-3">
                  <div className="flex items-start gap-2.5 text-xs font-tech text-accent-cyan">
                    <Check className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                    <span>
                      Gmail compose launched with receiver <strong className="text-white font-mono select-all">{contactEmail}</strong> and your message pre-filled. Just click <strong>Send</strong> in Gmail!
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-2 border-t border-white/[0.08] text-xs font-tech">
                    <a
                      href={submittedLink.gmail}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-lg bg-accent-cyan/20 hover:bg-accent-cyan/30 text-accent-cyan transition-colors flex items-center justify-center gap-1.5"
                    >
                      <GmailIcon className="w-3.5 h-3.5" />
                      <span>Re-open in Gmail Web</span>
                    </a>
                    <a
                      href={submittedLink.mailto}
                      className="px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Mail App (Outlook / Apple Mail)</span>
                    </a>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
