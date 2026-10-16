import React, { useEffect, useRef } from 'react';

interface AudioAmbientProps {
  isPlaying: boolean;
}

export const AudioAmbient: React.FC<AudioAmbientProps> = ({ isPlaying }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  useEffect(() => {
    if (isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextClass) return;

        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.025, ctx.currentTime + 3);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Lowpass Filter for Atmospheric Warmth
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(280, ctx.currentTime);
        filter.connect(masterGain);

        // Harmonic Drones (A2 = 110Hz, E3 = 164.81Hz, A3 = 220Hz)
        const freqs = [110, 164.81, 220];
        const oscs: OscillatorNode[] = [];

        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = idx === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle LFO modulation for breathing texture
          const lfo = ctx.createOscillator();
          lfo.frequency.setValueAtTime(0.1 + idx * 0.05, ctx.currentTime);
          const lfoGain = ctx.createGain();
          lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();

          osc.connect(filter);
          osc.start();
          oscs.push(osc);
        });

        oscillatorsRef.current = oscs;
      } catch (err) {
        console.warn('Web Audio synthesis initialisation skipped:', err);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        try {
          const ctx = audioCtxRef.current;
          gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
          setTimeout(() => {
            oscillatorsRef.current.forEach((osc) => {
              try { osc.stop(); osc.disconnect(); } catch {}
            });
            oscillatorsRef.current = [];
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
              audioCtxRef.current.close();
            }
          }, 600);
        } catch {}
      }
    }

    return () => {
      oscillatorsRef.current.forEach((osc) => {
        try { osc.stop(); osc.disconnect(); } catch {}
      });
      oscillatorsRef.current = [];
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, [isPlaying]);

  return null;
};
