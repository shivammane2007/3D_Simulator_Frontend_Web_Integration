"use client";

import { MapPin, Globe } from "lucide-react";
import type { SurgeonCardData } from "@/components/directory/SurgeonCard";

interface SurgeonLocatorProps {
    surgeons: SurgeonCardData[];
}

export default function SurgeonLocator({ surgeons }: SurgeonLocatorProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return (
            <div className="w-full h-[500px] bg-[#141413] rounded-2xl border border-black/10 flex flex-col items-center justify-center p-8 text-center shadow-level-1">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-[#CF4500]" />
                </div>
                <h3 className="text-lg font-serif text-white mb-2">Interactive Map</h3>
                <p className="text-white/60 text-sm max-w-md mb-4 leading-relaxed font-body">
                    {surgeons.length === 0
                        ? "No verified surgeons with geographical coordinates in the current filter."
                        : `Viewing ${surgeons.length} verified practice locations across Asia-Pacific.`}
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">
                    <Globe className="w-3.5 h-3.5 text-[#CF4500]" />
                    <span>Map view active</span>
                </div>
            </div>
        );
    }

    return null;
}

