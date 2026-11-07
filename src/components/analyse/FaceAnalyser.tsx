'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslations } from '@/i18n/messages';
import PhotoUpload from '@/components/simulation/PhotoUpload';
import AnalysisProgress from './AnalysisProgress';
import ProportionAnalysis from './ProportionAnalysis';
import IdealFacePreview from './IdealFacePreview';
import TreatmentRecommendations from './TreatmentRecommendations';
import DemographicsSelector from './DemographicsSelector';
import FaceHudView from './FaceHudView';
import { RadialGauge, HudLabel } from '@/components/ui/hud';
import IntendedUseNotice from '@/components/IntendedUseNotice';
import { initFaceLandmarker, detectLandmarks } from '@/lib/simulation/face-mesh';
import { analyzeFace } from '@/lib/analyse/facial-analysis';
import { calculateTransformation, applyTransformationToCanvas } from '@/lib/analyse/transformation-engine';
import { generateTreatmentPlan } from '@/lib/analyse/treatment-mapper';
import { downloadAnalysisReport } from '@/lib/analyse/report-generator';
import type { FacialAnalysisResult, ProcedureRecommendation, AnalysisTransformation } from '@/lib/analyse/types';
import type { Landmark } from '@/lib/simulation/types';

type Step = 'upload' | 'analyzing' | 'results';

// Existing palette severity tints for gauge arcs.
function gaugeColor(score: number): string {
  if (score >= 80) return '#7C9082'; // sage — strong
  if (score >= 60) return '#8C8480'; // warm gray — good
  if (score >= 40) return '#B8956A'; // warm amber — moderate
  return '#B05A50'; // warm muted red — needs attention
}

interface ScoreCardProps {
  harmony: number;
  proportionsScore: number;
  symmetry: number;
  faceShape: FacialAnalysisResult['faceShape'];
  t: (key: string) => string;
}

function ScoreCard({ harmony, proportionsScore, symmetry, faceShape, t }: ScoreCardProps) {
  const faceShapeLabels: Record<FacialAnalysisResult['faceShape'], string> = {
    oval: t('faceShapeOval'),
    round: t('faceShapeRound'),
    square: t('faceShapeSquare'),
    heart: t('faceShapeHeart'),
    oblong: t('faceShapeOblong'),
    diamond: t('faceShapeDiamond'),
  };

  const gauges = [
    { label: t('overallHarmony'), value: harmony, index: 1 },
    { label: t('proportionsScore'), value: proportionsScore, index: 2 },
    { label: t('symmetry'), value: symmetry, index: 3 },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-8 sm:grid-cols-4">
      {gauges.map(({ label, value, index }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-3 rounded-2xl border border-[#EDE8E0] bg-white p-4 text-center shadow-sm"
        >
          <RadialGauge value={value} label={label} suffix={t('outOf100')} color={gaugeColor(value)} />
          <HudLabel index={index}>{label}</HudLabel>
        </div>
      ))}
      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-[#EDE8E0] bg-white p-4 text-center shadow-sm">
        <HudLabel index={4}>{t('faceShape')}</HudLabel>
        <p className="font-serif text-2xl font-bold text-[#2C2C2C]">
          {faceShapeLabels[faceShape]}
        </p>
      </div>
    </div>
  );
}

export function FaceAnalyser() {
  const t = useTranslations('Analyse');
  const [step, setStep] = useState<Step>('upload');
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<FacialAnalysisResult | null>(null);
  const [recommendations, setRecommendations] = useState<ProcedureRecommendation[]>([]);
  const [transformation, setTransformation] = useState<AnalysisTransformation | null>(null);
  const [originalSrc, setOriginalSrc] = useState<string>('');
  const [idealSrc, setIdealSrc] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'analysis' | 'treatments'>('preview');
  const [selectedGender, setSelectedGender] = useState<FacialAnalysisResult['detectedGender'] | null>(null);
  const [selectedEthnicity, setSelectedEthnicity] = useState<FacialAnalysisResult['selectedEthnicity']>('neutral');
  // Morph intensity (0-100) — controlled, drives the ideal-preview recompute.
  const [intensity, setIntensity] = useState(70);
  const [isRecomputing, setIsRecomputing] = useState(false);

  // Stored for re-analysis on demographics change
  const storedLandmarks = useRef<Landmark[] | null>(null);
  const storedImageWidth = useRef(0);
  const storedImageHeight = useRef(0);
  const storedImage = useRef<HTMLImageElement | null>(null);
  // Cached 512px source canvas so intensity recomputes don't redraw the image.
  const previewSrcCanvas = useRef<HTMLCanvasElement | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Warp the cached 512px preview canvas for a given transformation and publish
   * it as `idealSrc`. Reused by both initial analysis and intensity recompute.
   */
  const renderPreview = useCallback(async (landmarks: Landmark[], tx: AnalysisTransformation) => {
    const srcCanvas = previewSrcCanvas.current;
    if (!srcCanvas) return;
    const dstCanvas = document.createElement('canvas');
    await applyTransformationToCanvas(srcCanvas, landmarks, tx, dstCanvas);
    setIdealSrc(dstCanvas.toDataURL('image/jpeg', 0.9));
  }, []);

  const runAnalysis = useCallback(
    async (
      landmarks: Landmark[],
      img: HTMLImageElement,
      gender: FacialAnalysisResult['detectedGender'] | null,
      ethnicity: FacialAnalysisResult['selectedEthnicity'],
      currentIntensity: number,
    ) => {
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      const result = analyzeFace(landmarks, w, h, gender, ethnicity);
      const tx = calculateTransformation(landmarks, result, currentIntensity / 100);

      setAnalysis(result);
      setTransformation(tx);
      setRecommendations(generateTreatmentPlan(result));
      // Sync the gender selector to the detected (or overridden) gender
      setSelectedGender(result.detectedGender);

      // Generate warped preview in background — cap at 512px to keep it fast.
      // Cache the downsampled source canvas so later intensity changes only warp.
      setIsGeneratingPreview(true);
      try {
        const MAX = 512;
        const scale = Math.min(1, MAX / Math.max(w, h));
        const sw = Math.round(w * scale);
        const sh = Math.round(h * scale);

        const srcCanvas = document.createElement('canvas');
        srcCanvas.width = sw;
        srcCanvas.height = sh;
        const srcCtx = srcCanvas.getContext('2d');
        if (!srcCtx) throw new Error('Could not get canvas context');
        srcCtx.drawImage(img, 0, 0, sw, sh);
        previewSrcCanvas.current = srcCanvas;

        // Landmarks are normalized [0-1], so they work directly with the downsampled canvas
        await renderPreview(landmarks, tx);
      } finally {
        setIsGeneratingPreview(false);
      }
    },
    [renderPreview],
  );

  // Debounced recompute when the user drags the morph-intensity slider.
  const handleIntensityChange = useCallback(
    (val: number) => {
      setIntensity(val);
      const landmarks = storedLandmarks.current;
      if (!landmarks || !analysis || !previewSrcCanvas.current) return;
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      setIsRecomputing(true);
      debounceTimer.current = setTimeout(async () => {
        const tx = calculateTransformation(landmarks, analysis, val / 100);
        setTransformation(tx);
        try {
          await renderPreview(landmarks, tx);
        } finally {
          setIsRecomputing(false);
        }
      }, 250);
    },
    [analysis, renderPreview],
  );

  // Clean up the debounce timer on unmount.
  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  const handleImageLoaded = useCallback(
    async (img: HTMLImageElement, src: string) => {
      setError(null);
      setIsProcessing(true);
      setStep('analyzing');
      setOriginalSrc(src);

      try {
        // Ensure face landmarker is ready
        await initFaceLandmarker();

        // Create HTMLImageElement from the loaded image
        const imgEl = new Image();
        imgEl.crossOrigin = 'anonymous';
        await new Promise<void>((resolve, reject) => {
          imgEl.onload = () => resolve();
          imgEl.onerror = () => reject(new Error('Failed to load image for detection'));
          imgEl.src = img.src;
        });

        const detection = await detectLandmarks(imgEl);
        if (!detection) {
          setError(t('noFaceDetected'));
          setStep('upload');
          setIsProcessing(false);
          return;
        }

        storedLandmarks.current = detection.landmarks;
        storedImageWidth.current = detection.width;
        storedImageHeight.current = detection.height;
        storedImage.current = imgEl;

        setStep('results');
        setActiveTab('preview');
        await runAnalysis(detection.landmarks, imgEl, selectedGender, selectedEthnicity, intensity);
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : t('analysisFailed');
        setError(msg);
        setStep('upload');
      } finally {
        setIsProcessing(false);
      }
    },
    [runAnalysis, t, selectedGender, selectedEthnicity, intensity],
  );

  const handleGenderChange = useCallback(
    async (gender: FacialAnalysisResult['detectedGender']) => {
      setSelectedGender(gender);
      if (!storedLandmarks.current || !storedImage.current || !analysis) return;
      await runAnalysis(
        storedLandmarks.current,
        storedImage.current,
        gender,
        analysis.selectedEthnicity,
        intensity,
      );
    },
    [analysis, runAnalysis, intensity],
  );

  const handleEthnicityChange = useCallback(
    async (ethnicity: FacialAnalysisResult['selectedEthnicity']) => {
      setSelectedEthnicity(ethnicity);
      if (!storedLandmarks.current || !storedImage.current || !analysis) return;
      await runAnalysis(
        storedLandmarks.current,
        storedImage.current,
        analysis.detectedGender,
        ethnicity,
        intensity,
      );
    },
    [analysis, runAnalysis, intensity],
  );

  const handleReset = () => {
    setStep('upload');
    setAnalysis(null);
    setTransformation(null);
    setOriginalSrc('');
    setIdealSrc('');
    setRecommendations([]);
    setError(null);
    setIsGeneratingPreview(false);
    setIsRecomputing(false);
    setIntensity(70);
    setSelectedGender(null);
    setSelectedEthnicity('neutral');
    storedLandmarks.current = null;
    storedImage.current = null;
    previewSrcCanvas.current = null;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    setActiveTab('preview');
  };

  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!analysis || isExporting) return;
    setIsExporting(true);
    try {
      await downloadAnalysisReport({
        analysis,
        recommendations,
        originalSrc,
        idealSrc: idealSrc || undefined,
      });
    } catch (err) {
      console.error('Report export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const TABS = [
    { id: 'preview' as const, label: t('tabPreview') },
    { id: 'analysis' as const, label: t('tabProportions') },
    { id: 'treatments' as const, label: t('tabTreatments') },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 pb-20">
      {/* Header */}
      <div className="text-center pt-10 pb-8">
        <HudLabel className="mb-4 justify-center">{t('eyebrow')}</HudLabel>
        <h1 className="font-serif text-4xl text-[#2C2C2C] mb-3">
          {t('titleLead')}{' '}
          <span className="font-bold">{t('titleEmphasis')}</span>
        </h1>
        <p className="text-[#8C8480] max-w-md mx-auto text-sm leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      {/* Upload step */}
      {step === 'upload' && (
        <div>
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
              {error}
            </div>
          )}
          {/* onError NOT wired here — PhotoUpload handles gate errors internally
              via its own ErrorBanner. FaceAnalyser only surfaces errors from its
              own detectLandmarks pass (set via setError in the catch below). */}
          <PhotoUpload
            onImageLoaded={handleImageLoaded}
            isProcessing={isProcessing}
            maxSizeMB={10}
            variant="light"
          />
        </div>
      )}

      {/* Analyzing step */}
      {step === 'analyzing' && <AnalysisProgress />}

      {/* Results step */}
      {step === 'results' && analysis && transformation && (
        <div>
          {/* Demographics */}
          <DemographicsSelector
            detectedGender={analysis.detectedGender}
            selectedEthnicity={analysis.selectedEthnicity}
            onGenderChange={handleGenderChange}
            onEthnicityChange={handleEthnicityChange}
          />

          {/* Score cards */}
          <ScoreCard
            harmony={analysis.overallHarmonyScore}
            proportionsScore={analysis.proportionsScore}
            symmetry={analysis.symmetryScore}
            faceShape={analysis.faceShape}
            t={t}
          />

          {/* Intended-use notice */}
          <IntendedUseNotice className="mb-5" />

          {/* Tab navigation */}
          <div role="tablist" className="flex gap-1 bg-[#EDE8E0] p-1 rounded-xl mb-6">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-[#2C2C2C] shadow-sm'
                    : 'text-[#6C6460] hover:text-[#2C2C2C]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'preview' && (
            <div role="tabpanel" id="tabpanel-preview" aria-labelledby="tab-preview" className="space-y-8">
              {/* HUD overlay over the uploaded face */}
              {originalSrc && storedLandmarks.current && (
                <FaceHudView
                  src={originalSrc}
                  landmarks={storedLandmarks.current}
                  analysis={analysis}
                />
              )}

              {isGeneratingPreview || !idealSrc ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="w-10 h-10 border-2 border-[#EDE8E0] border-t-[#7C9082] rounded-full animate-spin" />
                  <p className="text-sm text-[#8C8480]">{t('generatingPreview')}</p>
                </div>
              ) : (
                <IdealFacePreview
                  originalSrc={originalSrc}
                  idealSrc={idealSrc}
                  transformation={transformation}
                  intensity={intensity}
                  onIntensityChange={handleIntensityChange}
                  isRecomputing={isRecomputing}
                />
              )}
            </div>
          )}
          {activeTab === 'analysis' && (
            <div role="tabpanel" id="tabpanel-analysis" aria-labelledby="tab-analysis">
              <ProportionAnalysis analysis={analysis} />
            </div>
          )}
          {activeTab === 'treatments' && (
            <div role="tabpanel" id="tabpanel-treatments" aria-labelledby="tab-treatments">
              <TreatmentRecommendations recommendations={recommendations} />
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleReset}
              className="flex-1 py-3 px-6 rounded-full border-2 border-[#D8D0C5] text-[#4C4848] text-sm font-semibold hover:border-[#7C9082] hover:text-[#7C9082] transition-colors"
            >
              {t('analyzeAnother')}
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 py-3 px-6 rounded-full bg-[#7C9082] hover:bg-[#6A7D70] text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-wait"
            >
              {isExporting ? t('exporting') : t('exportReport')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
