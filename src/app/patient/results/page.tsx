'use client';

import Link from 'next/link';
import { 
  ImageIcon, 
  ScanFace, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function PatientResultsPage() {
  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0F1A] font-sans mb-1">
          My Results
        </h1>
        <p className="text-sm text-slate-500 font-sans">
          View your AI simulation previews and consultation history.
        </p>
      </div>

      {/* Empty State Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-12 sm:p-20 text-center shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
          <ImageIcon className="w-7 h-7" />
        </div>

        <h2 className="text-base font-bold text-[#0A0F1A] font-sans mb-1">No results yet</h2>
        <p className="text-xs text-slate-500 font-sans max-w-sm mx-auto mb-6 leading-relaxed">
          Complete a consultation to see your AI-generated surgical previews here.
        </p>

        <Link
          href="/patient/consultation"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#305A4F] hover:bg-[#25453C] text-white text-xs font-bold transition-all shadow-xs"
        >
          <ScanFace className="w-4 h-4" />
          <span>Start Consultation</span>
        </Link>
      </div>
    </div>
  );
}
