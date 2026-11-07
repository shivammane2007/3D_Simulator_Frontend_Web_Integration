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
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-black/10 -z-0" />
          {STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    isCurrent
                      ? 'bg-[#141413] text-[#F3F0EE] shadow-sm ring-4 ring-[#141413]/10'
                      : isCompleted
                      ? 'bg-[#CF4500] text-white'
                      : 'bg-white text-[#696969] border border-black/10'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.id}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Welcome Screen */}
      {currentStep === 1 && (
        <div className="bg-white rounded-[32px] border border-black/5 p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-level-1">
          {/* Centered Sparkle Icon */}
          <div className="w-16 h-16 rounded-[20px] bg-[#FDEEE7] text-[#CF4500] flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Sparkles className="w-8 h-8" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-[#141413] mb-2">
            Welcome to Your Virtual Consultation
          </h1>
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#696969] mb-4">
            POWERED BY FACEIFY LABS
          </p>

          <p className="text-sm text-[#555555] max-w-lg mx-auto leading-relaxed mb-8 font-normal">
            This guided experience helps you explore procedures and explore AI visualizations, all before your first appointment.
          </p>

          {/* Micro pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#555555] mb-8 font-normal">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#696969]" />
              <span>Takes about 3 minutes</span>
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-black/20" />
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CF4500]" />
              <span>Real-time simulation runs in your browser</span>
            </span>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[20px] bg-[#141413] hover:bg-[#262627] text-[#F3F0EE] text-sm font-medium tracking-tight shadow-sm transition-all cursor-pointer"
          >
            <span>Begin Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Select Concern / Area */}
      {currentStep === 2 && (
        <div className="bg-white rounded-[32px] border border-black/5 p-8 text-center max-w-2xl mx-auto shadow-level-1">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-[#141413] mb-1">
            What area would you like to explore?
          </h2>
          <p className="text-xs text-[#555555] mb-6 font-normal">
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
                  className={`p-4 rounded-[20px] border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#CF4500] bg-[#FDEEE7]/40 shadow-xs ring-1 ring-[#CF4500]'
                      : 'border-black/5 hover:border-black/15 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className={`w-8 h-8 rounded-[12px] flex items-center justify-center ${isSelected ? 'bg-[#CF4500] text-white' : 'bg-[#F3F0EE] text-[#555555]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-[#141413]">{area.name}</span>
                  </div>
                  <p className="text-xs text-[#555555] font-normal">{area.desc}</p>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-black/5">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-1.5 text-xs text-[#555555] hover:text-[#141413] font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <Link
              href={routes.simulate}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[20px] bg-[#CF4500] hover:bg-[#F37338] text-white text-xs font-semibold shadow-xs transition-all"
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

