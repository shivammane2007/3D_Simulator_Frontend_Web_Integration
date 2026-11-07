'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  Smile,
  Target,
  Eye,
  Scissors,
  Check,
  Upload,
  Camera,
  Shield,
  Calendar,
  CheckCircle2
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

// Exact 6 Regions from faceifylabs.com / Screenshot 1
const REGIONS = [
  { id: 'face', name: 'Face', desc: 'Facelift, contouring, chin', icon: Smile },
  { id: 'nose', name: 'Nose', desc: 'Rhinoplasty, tip, bridge', icon: Target },
  { id: 'eyes', name: 'Eyes', desc: 'Eyelids, brow lift', icon: Eye },
  { id: 'body', name: 'Body', desc: 'Liposuction, tummy tuck', icon: Sparkles },
  { id: 'dental', name: 'Dental', desc: 'Smile design, veneers, whitening', icon: Smile },
  { id: 'hair', name: 'Hair', desc: 'Transplant, hairline, restoration', icon: Scissors },
];

const PROCEDURES_BY_REGION: Record<string, { id: string; name: string; desc: string }[]> = {
  nose: [
    { id: 'rhinoplasty', name: 'Rhinoplasty', desc: 'Reshape the nose for improved proportion and nasal airway' },
    { id: 'tip-refinement', name: 'Tip Refinement', desc: 'Refine the nasal tip shape, rotation, and projection' },
    { id: 'bridge-reduction', name: 'Bridge Reduction', desc: 'Smooth a dorsal hump for a straighter nasal profile' },
  ],
  face: [
    { id: 'facelift', name: 'Facelift', desc: 'Tighten and lift sagging skin for a more youthful facial contour' },
    { id: 'buccal-fat', name: 'Buccal Fat Removal', desc: 'Reduce cheek volume to create a slimmer, sculpted midface' },
    { id: 'chin-aug', name: 'Chin Augmentation', desc: 'Enhance chin projection and balance the lower facial profile' },
  ],
  eyes: [
    { id: 'blepharoplasty', name: 'Blepharoplasty', desc: 'Remove excess eyelid skin for a refreshed, alert appearance' },
    { id: 'brow-lift', name: 'Brow Lift', desc: 'Elevate the brow position to reduce forehead heaviness' },
    { id: 'under-eye', name: 'Under-Eye Treatment', desc: 'Address hollowing and dark circles beneath the eyes' },
  ],
  body: [
    { id: 'liposuction', name: 'Liposuction', desc: 'Remove stubborn fat deposits for improved body contour' },
    { id: 'tummy-tuck', name: 'Tummy Tuck', desc: 'Tighten abdominal muscles and remove excess skin' },
    { id: 'bbl', name: 'Brazilian Butt Lift', desc: 'Fat transfer to enhance buttock shape and volume' },
  ],
  dental: [
    { id: 'smile-design', name: 'Smile Design', desc: 'Reshape tooth form, alignment, and smile proportions' },
    { id: 'teeth-whitening', name: 'Teeth Whitening', desc: 'Brighten your smile with professional shade-matched whitening' },
    { id: 'veneers', name: 'Veneers', desc: 'Porcelain or composite shells for a complete smile transformation' },
  ],
  hair: [
    { id: 'hair-transplant', name: 'Hair Transplant', desc: 'FUE, FUT, or DHI graft techniques to restore a natural hairline' },
    { id: 'hairline-lowering', name: 'Hairline Lowering', desc: 'Surgical advancement or graft-based forehead reduction' },
    { id: 'eyebrow-restoration', name: 'Eyebrow Restoration', desc: 'Transplant or microblading to restore full, natural brows' },
  ],
};

export default function PatientConsultationPage() {
  const [currentStep, setCurrentStep] = useState(2); // Defaults to Step 2 as in Screenshot
  const [selectedRegion, setSelectedRegion] = useState('nose'); // Nose selected by default as in Screenshot
  const [selectedProcedure, setSelectedProcedure] = useState('rhinoplasty');
  const [goals, setGoals] = useState('Subtle and natural refinement');

  const currentProcedures = PROCEDURES_BY_REGION[selectedRegion] || PROCEDURES_BY_REGION.nose;

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* 7-Step Stepper (Matches Screenshot 1 & 2) */}
      <div className="py-4">
        <div className="relative flex items-center justify-between max-w-2xl mx-auto">
          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
          {STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(step.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#305A4F] text-white shadow-sm ring-4 ring-[#305A4F]/15'
                      : isCompleted
                      ? 'bg-[#141413] text-white'
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

      {/* Step 1: Welcome Screen */}
      {currentStep === 1 && (
        <div className="bg-white rounded-[32px] border border-black/5 p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-level-1">
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

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#555555] mb-8 font-normal">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#696969]" />
              <span>Takes about 3 minutes</span>
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-black/20" />
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#305A4F]" />
              <span>Real-time simulation runs in your browser</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[20px] bg-[#305A4F] hover:bg-[#25453c] text-white text-sm font-semibold shadow-sm transition-all cursor-pointer"
          >
            <span>Begin Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Select Area (Matches Screenshot 1 & 2 exactly!) */}
      {currentStep === 2 && (
        <div>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#141413]">
              What area would you like to explore?
            </h1>
            <p className="text-sm text-slate-400 mt-1 font-normal">
              Select the area you&apos;re most interested in
            </p>
          </div>

          {/* 6 Regions Grid in 2 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {REGIONS.map((region) => {
              const Icon = region.icon;
              const isSelected = selectedRegion === region.id;
              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setSelectedRegion(region.id)}
                  className={`p-6 sm:p-7 rounded-[22px] border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                    isSelected
                      ? 'border-[#305A4F] bg-[#F4F8F6] shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white shadow-2xs'
                  }`}
                >
                  {/* Icon Container */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
                    isSelected ? 'bg-[#305A4F]/10 text-[#305A4F]' : 'bg-slate-100 text-slate-400'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className={`text-base font-bold transition-colors ${
                    isSelected ? 'text-[#141413]' : 'text-slate-800'
                  }`}>
                    {region.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 mt-1 font-normal">
                    {region.desc}
                  </p>

                  {/* Checkmark when selected */}
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#305A4F] text-white flex items-center justify-center mt-3">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Navigation Buttons (Matches Screenshot 2) */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#141413] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-[20px] bg-[#305A4F] hover:bg-[#25453c] text-white text-sm font-semibold shadow-xs transition-all cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Select Procedure */}
      {currentStep === 3 && (
        <div>
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#141413]">
              Select a procedure
            </h1>
            <p className="text-sm text-slate-400 mt-1 font-normal">
              Choose the specific treatment you want to visualize
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {currentProcedures.map((proc) => {
              const isSelected = selectedProcedure === proc.id;
              return (
                <button
                  key={proc.id}
                  type="button"
                  onClick={() => setSelectedProcedure(proc.id)}
                  className={`p-6 rounded-[22px] border-2 transition-all cursor-pointer flex flex-col text-left ${
                    isSelected
                      ? 'border-[#305A4F] bg-[#F4F8F6] shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white shadow-2xs'
                  }`}
                >
                  <h3 className="text-base font-bold text-[#141413] mb-1.5">{proc.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal mb-4 flex-1">
                    {proc.desc}
                  </p>
                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-[#305A4F] text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-slate-300" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#141413] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-[20px] bg-[#305A4F] hover:bg-[#25453c] text-white text-sm font-semibold shadow-xs transition-all cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Preferences & Goals */}
      {currentStep === 4 && (
        <div className="bg-white rounded-[28px] border border-black/5 p-8 max-w-2xl mx-auto shadow-level-1">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#141413]">What are your aesthetic goals?</h2>
            <p className="text-xs text-slate-400 mt-1">Surgeons use this to customize simulation guidelines</p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              'Subtle and natural refinement',
              'Dramatic restructuring and projection',
              'Symmetry and contour balancing',
              'Reconstructive / revision adjustment',
            ].map((option) => (
              <label
                key={option}
                onClick={() => setGoals(option)}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  goals === option ? 'border-[#305A4F] bg-[#F4F8F6]' : 'border-slate-200 bg-white'
                }`}
              >
                <span className="text-sm font-medium text-[#141413]">{option}</span>
                <input
                  type="radio"
                  name="goals"
                  checked={goals === option}
                  onChange={() => setGoals(option)}
                  className="accent-[#305A4F]"
                />
              </label>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-ink cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-[20px] bg-[#305A4F] hover:bg-[#25453c] text-white text-sm font-semibold transition-all cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Photo Upload */}
      {currentStep === 5 && (
        <div className="bg-white rounded-[28px] border border-black/5 p-8 text-center max-w-2xl mx-auto shadow-level-1">
          <div className="w-16 h-16 rounded-full bg-[#F4F8F6] text-[#305A4F] flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-[#141413] mb-1">Upload a photo for simulation</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
            Front-facing, well-lit photo with neutral expression. Photos remain completely private and on your device.
          </p>

          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 mb-6 hover:border-[#305A4F] transition-colors cursor-pointer bg-slate-50/50">
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-700">Click to upload photo or drag & drop</p>
            <p className="text-xs text-slate-400 mt-1">JPEG, PNG or WEBP up to 10MB</p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-ink cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(6)}
              className="inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-[20px] bg-[#305A4F] hover:bg-[#25453c] text-white text-sm font-semibold transition-all cursor-pointer"
            >
              <span>Run Simulation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 6: 3D Simulation Preview */}
      {currentStep === 6 && (
        <div className="bg-white rounded-[28px] border border-black/5 p-8 text-center max-w-2xl mx-auto shadow-level-1">
          <div className="w-16 h-16 rounded-full bg-[#FDEEE7] text-[#CF4500] flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-[#141413] mb-1">Your 3D Simulation is Ready</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
            We have generated preview parameters for {selectedProcedure.replace(/-/g, ' ')}.
          </p>

          <div className="p-6 rounded-2xl bg-[#FCFBFA] border border-black/5 text-left mb-6 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Target Area:</span>
              <span className="font-semibold text-ink capitalize">{selectedRegion}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Selected Procedure:</span>
              <span className="font-semibold text-ink capitalize">{selectedProcedure.replace(/-/g, ' ')}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Aesthetic Goal:</span>
              <span className="font-semibold text-ink">{goals}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-ink cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <Link
              href={routes.simulate}
              className="inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-[20px] bg-[#305A4F] hover:bg-[#25453c] text-white text-sm font-semibold transition-all"
            >
              <span>Launch 3D Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
