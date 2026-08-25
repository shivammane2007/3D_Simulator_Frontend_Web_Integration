'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BeforeAfterSliderProps {
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
  className?: string;
  procedureTitle?: string;
  transformationIntensity?: number;
}

export default function BeforeAfterSlider({
  beforeLabel = 'Original Profile',
  afterLabel = 'Simulated Preview',
  initialPosition = 50,
  className,
  procedureTitle = 'Rhinoplasty & Contour',
  transformationIntensity = 20,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative select-none overflow-hidden rounded-[32px] md:rounded-[40px] aspect-[4/3] bg-[#141413] shadow-level-2 border border-black/5 group cursor-ew-resize',
        className
      )}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* Background (After / Simulated State) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-[#1E1E1C] via-[#141413] to-[#0A0A09] flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <svg className="w-full h-full max-h-[320px]" viewBox="0 0 400 320" fill="none">
            {/* Refined face oval */}
            <ellipse cx="200" cy="160" rx="80" ry="104" fill="rgba(207, 69, 0, 0.08)" stroke="#CF4500" strokeWidth="1.5" />
            <path d="M125 160 Q200 238 275 160" stroke="#CF4500" strokeWidth="2" fill="none" />
            {/* Eyes */}
            <ellipse cx="170" cy="135" rx="13" ry="8" fill="rgba(255,255,255,0.15)" stroke="#F37338" strokeWidth="1.5" />
            <ellipse cx="230" cy="135" rx="13" ry="8" fill="rgba(255,255,255,0.15)" stroke="#F37338" strokeWidth="1.5" />
            <circle cx="170" cy="135" r="4" fill="#CF4500" />
            <circle cx="230" cy="135" r="4" fill="#CF4500" />
            {/* Nose Profile */}
            <path d="M200 120 L198 152 Q200 159 202 152 L200 120" stroke="#F37338" strokeWidth="1.5" fill="none" />
            {/* Lip Profile */}
            <path d="M180 182 Q200 190 220 182" stroke="#CF4500" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* Tag on Top Right */}
        <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-[#141413] text-white border border-white/20 text-[10px] font-bold tracking-wider uppercase shadow-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CF4500]" />
          {afterLabel}
        </div>
      </div>

      {/* Foreground (Before / Original State) clipped by slider */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-zinc-800 via-zinc-900 to-black flex items-center justify-center"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <svg className="w-full h-full max-h-[320px]" viewBox="0 0 400 320" fill="none">
            {/* Original broader face oval */}
            <ellipse cx="200" cy="160" rx="90" ry="110" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <path d="M115 160 Q200 252 285 160" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
            {/* Eyes */}
            <ellipse cx="170" cy="135" rx="14" ry="7" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
            <ellipse cx="230" cy="135" rx="14" ry="7" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
            <circle cx="170" cy="135" r="3.5" fill="rgba(255,255,255,0.5)" />
            <circle cx="230" cy="135" r="3.5" fill="rgba(255,255,255,0.5)" />
            {/* Nose Profile */}
            <path d="M200 120 L195 156 Q200 166 205 156 L200 120" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" fill="none" />
            {/* Lip Profile */}
            <path d="M178 186 Q200 193 222 186" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* Tag on Top Left */}
        <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white/90 text-[10px] font-bold tracking-wider uppercase border border-white/20">
          {beforeLabel}
        </div>
      </div>

      {/* Divider line & handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#141413] flex items-center justify-center shadow-level-2 border border-black/10">
          <MoveHorizontal className="w-4 h-4 text-[#CF4500]" />
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-white text-xs font-medium">
          {procedureTitle}
        </div>
        <div className="bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-zinc-300 text-[10px] uppercase font-bold tracking-widest">
          Drag to compare
        </div>
      </div>
    </div>
  );
}
