import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Smooth lerp coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const checkTouch = () => {
      const isTouch = !mediaQuery.matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
      if (!isTouch) {
        document.body.classList.add('custom-cursor-active');
      } else {
        document.body.classList.remove('custom-cursor-active');
      }
    };

    checkTouch();
    mediaQuery.addEventListener('change', checkTouch);

    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, input, textarea, select, [data-interactive="true"], [role="button"]');
      setIsHovered(!!interactive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    // Smooth animation loop for the outer ring
    const animate = () => {
      const lerpFactor = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      mediaQuery.removeEventListener('change', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.body.classList.remove('custom-cursor-active');
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Outer Magnetic Lag Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-4 -mt-4 rounded-full border transition-all duration-200 pointer-events-none will-change-transform ${
          isHovered
            ? 'w-14 h-14 -ml-7 -mt-7 border-accent-cyan bg-accent-cyan/10 backdrop-blur-[1px] shadow-[0_0_20px_rgba(56,189,248,0.4)]'
            : isClicking
            ? 'w-8 h-8 -ml-4 -mt-4 border-white bg-white/20'
            : 'w-8 h-8 border-zinc-400/50 bg-transparent'
        }`}
      />

      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 rounded-full pointer-events-none will-change-transform transition-transform duration-75 ${
          isHovered
            ? 'w-2.5 h-2.5 -ml-[5px] -mt-[5px] bg-accent-cyan shadow-[0_0_10px_#38bdf8]'
            : isClicking
            ? 'w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-white'
            : 'w-2 h-2 bg-white'
        }`}
      />
    </div>
  );
};
