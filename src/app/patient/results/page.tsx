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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-ink tracking-tight">
          My Results
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          View your AI simulation previews and consultation history.
        </p>
      </div>

      {/* Empty State Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 sm:p-20 text-center shadow-2xs">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-400 flex items-center justify-center mx-auto mb-4">
          <ImageIcon className="w-8 h-8" />
        </div>

        <h2 className="text-base font-bold text-ink">No results yet</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto mb-6 leading-relaxed">
          Complete a consultation to see your AI-generated surgical previews here.
        </p>

        <Link
          href="/patient/consultation"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2D5548] hover:bg-[#23453a] text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <ScanFace className="w-4 h-4" />
          <span>Start Consultation</span>
        </Link>
      </div>
    </div>
  );
}

