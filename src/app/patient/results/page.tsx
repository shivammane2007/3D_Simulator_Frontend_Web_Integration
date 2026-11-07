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
        <h1 className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-[#141413]">
          My Results
        </h1>
        <p className="text-sm text-[#555555] mt-1.5 font-normal">
          View your AI simulation previews and consultation history.
        </p>
      </div>

      {/* Empty State Card */}
      <div className="bg-white rounded-[24px] border border-black/5 p-12 sm:p-20 text-center shadow-level-1">
        <div className="w-16 h-16 rounded-[20px] bg-[#F3F0EE] text-[#696969] flex items-center justify-center mx-auto mb-4">
          <ImageIcon className="w-8 h-8" />
        </div>

        <h2 className="text-base font-medium text-[#141413]">No results yet</h2>
        <p className="text-xs text-[#555555] mt-1 max-w-sm mx-auto mb-6 leading-relaxed font-normal">
          Complete a consultation to see your AI-generated surgical previews here.
        </p>

        <Link
          href="/patient/consultation"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[20px] bg-[#141413] hover:bg-[#262627] text-[#F3F0EE] text-xs font-medium tracking-tight shadow-sm transition-all"
        >
          <ScanFace className="w-4 h-4" />
          <span>Start Consultation</span>
        </Link>
      </div>
    </div>
  );
}

