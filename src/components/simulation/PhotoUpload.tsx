'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Upload, Camera, RefreshCw } from 'lucide-react';
import { routes } from '@/config/routes';

interface PhotoUploadProps {
  onImageLoaded: (img: HTMLImageElement, src: string) => void;
  onError?: (msg: string) => void;
  maxSizeMB?: number;
  isProcessing?: boolean;
  hint?: string;
  variant?: 'dark' | 'light';
}

export default function PhotoUpload({
  onImageLoaded,
  onError,
  maxSizeMB = 10,
  isProcessing = false,
  variant = 'light',
}: PhotoUploadProps) {
  const [consentChecked, setConsentChecked] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file) return;
    if (file.size > maxSizeMB * 1024 * 1024) {
      onError?.(`File size exceeds ${maxSizeMB}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        onImageLoaded(img, src);
      };
      img.onerror = () => {
        onError?.('Failed to load image');
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!consentChecked || isProcessing) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* DPDP Act 2023 Consent Checkbox */}
      <label className="flex items-start gap-3 cursor-pointer select-none mb-6 text-left">
        <input
          type="checkbox"
          checked={consentChecked}
          onChange={(e) => setConsentChecked(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-black/20 accent-[#305A4F] shrink-0 cursor-pointer"
        />
        <span className="text-[#6C6460] text-xs leading-relaxed font-normal font-sans">
          I consent to Faceify processing my facial photograph as sensitive personal data under the{' '}
          <Link
            href={routes.privacy || '/privacy'}
            className="underline text-[#305A4F] hover:text-[#1F3D35] font-semibold transition-colors"
            target="_blank"
          >
            DPDP Act 2023
          </Link>
          . This image is processed on-device and is not shared without my consent.
        </span>
      </label>

      {/* Upload Card */}
      <div
        role="button"
        tabIndex={consentChecked && !isProcessing ? 0 : -1}
        onClick={() => consentChecked && !isProcessing && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`relative w-full border-2 border-dashed rounded-[28px] p-8 sm:p-12 text-center transition-all bg-white shadow-sm overflow-hidden ${
          !consentChecked || isProcessing
            ? 'opacity-60 cursor-not-allowed border-black/10'
            : 'cursor-pointer border-[#D8D0C5] hover:border-[#7C9082] hover:bg-[#FCFBFA]'
        }`}
      >
        {isProcessing && (
          <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-3.5 p-6">
            <RefreshCw className="w-8 h-8 text-[#7C9082] animate-spin" />
            <p className="text-sm font-semibold text-[#2C2C2C] font-sans">
              Calculating 468 landmarks &amp; facial ratios...
            </p>
            <p className="text-xs text-[#8C8480] font-sans">
              Evaluating vertical thirds and golden ratio symmetry locally in browser.
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileInput}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          capture="user"
          className="hidden"
          onChange={handleFileInput}
        />

        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#EDE8E0] flex items-center justify-center text-[#7C9082]">
          <Upload className="w-6 h-6" />
        </div>

        <p className="text-base font-bold text-[#2C2C2C] mb-1 font-sans">
          Upload your photo
        </p>
        <p className="text-xs text-[#8C8480] mb-1 font-sans">
          .JPG, .PNG, or WebP; max {maxSizeMB} MB
        </p>
        <p className="text-xs text-[#8C8480] mb-2 font-sans">
          Min 400x400px, front-facing, good lighting
        </p>
        <p className="text-xs text-[#7C9082] font-medium mb-6 font-sans">
          Photos processed in your browser. Nothing uploaded.
        </p>

        <button
          type="button"
          disabled={!consentChecked || isProcessing}
          onClick={(e) => {
            e.stopPropagation();
            cameraInputRef.current?.click();
          }}
          className="inline-flex items-center gap-2 px-7 py-3 bg-[#2C2C2C] hover:bg-[#1A1A1A] text-white text-xs font-semibold rounded-full transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-sans"
        >
          <Camera className="w-4 h-4" />
          <span>Take Photo</span>
        </button>
      </div>
    </div>
  );
}

