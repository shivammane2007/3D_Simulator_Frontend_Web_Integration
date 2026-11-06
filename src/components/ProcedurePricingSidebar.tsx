'use client';

import { useState, useEffect } from 'react';
import { type Procedure, type Region, REGIONS, DEFAULT_REGION, formatPrice } from '@/data/procedures';

interface ProcedurePricingSidebarProps {
    procedure: Procedure;
}

export function ProcedurePricingSidebar({ procedure }: ProcedurePricingSidebarProps) {
    // Always initialise with DEFAULT_REGION on both server and client so the
    // SSR-rendered markup matches the first client render (no hydration mismatch).
    // The persisted region preference is read from localStorage in useEffect,
    // after hydration, and applied as a state update on the client only.
    const [region, setRegion] = useState<Region>(DEFAULT_REGION);

    useEffect(() => {
        const saved = localStorage.getItem('faceify-region') as Region | null;
        if (saved && REGIONS[saved]) {
            // Reading a persisted preference once after hydration is the canonical
            // use for this effect; a useState initializer would diverge from the
            // SSR markup (DEFAULT_REGION) and cause a hydration mismatch.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setRegion(saved);
        }
    }, []);

    const handleRegionChange = (newRegion: Region) => {
        setRegion(newRegion);
        localStorage.setItem('faceify-region', newRegion);
    };

    const regionInfo = REGIONS[region];
    const price = procedure.pricing[region];

    return (
        <div>
            <p className="text-xs text-[#696969] uppercase tracking-wider">Typical Cost Range</p>
            <p className="text-sm text-[#141413] font-medium mt-0.5">
                {formatPrice(price)}
            </p>
            <p className="text-xs text-[#696969] mt-0.5">
                {regionInfo.flag} {regionInfo.name}
            </p>

            {/* Compact region switcher */}
            <div className="flex flex-wrap gap-1.5 mt-3">
                {Object.values(REGIONS).map((r) => (
                    <button
                        key={r.id}
                        onClick={() => handleRegionChange(r.id)}
                        className={`
                            inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium
                            transition-all duration-200 border
                            ${region === r.id
                                ? 'bg-[#CF4500] text-white border-[#CF4500] shadow-sm'
                                : 'bg-white text-[#555555] border-black/10 hover:border-[#CF4500]/40 hover:text-[#141413]'
                            }
                        `}
                        aria-pressed={region === r.id}
                        title={r.name}
                    >
                        <span className="leading-none">{r.flag}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
