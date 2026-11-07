'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Smile,
  Target,
  Eye,
  Scissors,
  Check
} from 'lucide-react';
import { routes } from '@/config/routes';

const STEPS = [
  { id: 1, label: 'Welcome' },
  { id: 2, label: 'Area' },
  { id: 3, label: 'Procedure' },
  { id: 4, label: 'Preferences' },
  { id: 5, label: 'Photo' },
  { id: 6, label: 'Simulation' },
  { id: 7, label: 'Review' },
];

const AREAS = [
  { id: 'nose', name: 'Nose (Rhinoplasty)', desc: 'Tip refinement, dorsal hump reduction, asymmetry correction', icon: Target },
  { id: 'face', name: 'Facial Contouring', desc: 'Chin augmentation, jawline narrowing, buccal fat reduction', icon: Smile },
  { id: 'eyes', name: 'Eyes & Brow', desc: 'Blepharoplasty, brow lift, under-eye rejuvenation', icon: Eye },
  { id: 'hair', name: 'Hair & Hairline', desc: 'Hairline lowering, density restoration, temple design', icon: Scissors },
];

export default function PatientConsultationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedArea, setSelectedArea] = useState('nose');

  return (
    <div className="space-y-8">
      {/* 7-Step Horizontal Stepper */}
      <div className="max-w-2xl mx-auto py-4">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
          {STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-[#2D5548] text-white shadow-sm ring-4 ring-[#2D5548]/15'
                      : isCompleted
                      ? 'bg-[#2D5548] text-white'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.id}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Welcome Screen (Matches Screenshot) */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-2xs">
          {/* Centered Sparkle Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#EBF3EF] text-[#2D5548] flex items-center justify-center mx-auto mb-6 shadow-2xs">
            <Sparkles className="w-8 h-8" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-ink tracking-tight mb-2">
            Welcome to Your Virtual Consultation
          </h1>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Powered by Faceify Labs
          </p>

          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mb-8">
            This guided experience helps you explore procedures and explore AI visualizations, all before your first appointment.
          </p>

          {/* Micro pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 mb-8">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Takes about 3 minutes</span>
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D5548]" />
              <span>Real-time simulation runs in your browser</span>
            </span>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#2D5548] hover:bg-[#23453a] text-white text-sm font-semibold shadow-md shadow-[#2D5548]/20 transition-all cursor-pointer"
          >
            <span>Begin Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Select Concern / Area */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 text-center max-w-2xl mx-auto shadow-2xs">
          <h2 className="text-xl font-bold font-serif text-ink mb-1">
            What area would you like to explore?
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Choose an area to tailor your consultation guidelines.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-8">
            {AREAS.map((area) => {
              const Icon = area.icon;
              const isSelected = selectedArea === area.id;
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => setSelectedArea(area.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#2D5548] bg-[#EBF3EF]/50 shadow-2xs ring-1 ring-[#2D5548]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isSelected ? 'bg-[#2D5548] text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-ink">{area.name}</span>
                  </div>
                  <p className="text-xs text-slate-500">{area.desc}</p>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-ink font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <Link
              href={routes.simulate}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#2D5548] hover:bg-[#23453a] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>Launch 3D Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

