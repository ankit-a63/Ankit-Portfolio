import React, { useEffect, useState } from 'react';
import { ASMonogram } from './ASMonogram';
import { portfolioContent } from '../data/translations';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const { preloader } = portfolioContent;

  useEffect(() => {
    // Smooth progress counter simulation
    const startTime = performance.now();
    const duration = 1800; // 1.8s for smooth cinematic experience

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const calculatedProgress = Math.min(Math.round((elapsed / duration) * 100), 100);

      setProgress(calculatedProgress);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 800);
        }, 200);
      }
    };

    const animId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#070709] p-8 text-white transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? '-translate-y-full opacity-90' : 'translate-y-0 opacity-100'
      }`}
      aria-label="Loading portfolio"
    >
      {/* Top Status Line */}
      <div className="w-full max-w-6xl flex justify-between items-center text-xs font-tech tracking-widest text-zinc-500 uppercase">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
          {preloader.subtitle}
        </span>
        <span>{preloader.author}</span>
      </div>

      {/* Centerpiece: Animated AS Monogram with Counter */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="relative mb-8 transform transition-transform duration-500 hover:scale-105">
          <ASMonogram size={120} animated={true} glow={true} />
        </div>

        <div className="flex items-baseline gap-2 font-editorial">
          <span className="text-6xl md:text-8xl font-bold tracking-tight text-gradient-silver">
            {progress < 10 ? `0${progress}` : progress}
          </span>
          <span className="text-accent-cyan text-2xl font-tech font-normal">%</span>
        </div>

        <p className="mt-4 text-xs font-tech tracking-widest text-zinc-400 uppercase">
          {preloader.status}
        </p>
      </div>

      {/* Bottom Progress Bar & Details */}
      <div className="w-full max-w-xl">
        <div className="h-[2px] w-full bg-zinc-900 overflow-hidden rounded-full">
          <div
            className="h-full bg-gradient-to-r from-zinc-500 via-accent-cyan to-white transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center mt-3 text-[10px] font-tech text-zinc-600 tracking-wider">
          <span>LATENCY: ZERO</span>
          <span>SYSTEM_READY_2026</span>
        </div>
      </div>
    </div>
  );
};
