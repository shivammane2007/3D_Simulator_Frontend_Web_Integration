"use client";

/**
 * CameraFaceGuide — live camera capture with face-framing overlay.
 *
 * Uses getUserMedia to show a live camera feed with an oval face guide
 * overlay indicating proper positioning for acne skin analysis.
 *
 * The guide shows:
 *   - Oval outline showing ideal face position (~60% of frame height)
 *   - Distance indicator (face should fill the oval)
 *   - Lighting/angle guidance text
 *
 * On capture, draws the current video frame to a canvas, converts to
 * an HTMLImageElement, and passes it to onCapture.
 *
 * Privacy: camera access is requested only when the component mounts;
 * the stream is stopped on unmount. No frames leave the device except
 * the explicitly captured one.
 */

import { useState, useRef, useCallback, useEffect } from "react";
import { Camera, X, RotateCcw } from "lucide-react";

interface CameraFaceGuideProps {
  onCapture: (img: HTMLImageElement, src: string) => void;
  onClose: () => void;
  /** Whether the face guide should use the wider acne framing (default true). */
  variant?: "acne" | "portrait";
}

export default function CameraFaceGuide({
  onCapture,
  onClose,
  variant = "acne",
}: CameraFaceGuideProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [ready, setReady] = useState(false);
  const [capturing, setCapturing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      setError(null);
      setReady(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          await videoRef.current.play();
          if (!cancelled) setReady(true);
        }
      } catch {
        if (!cancelled) {
          setError(
            "Camera access was denied or unavailable. Please use the upload option instead."
          );
        }
      }
    }

    init();

    return () => {
      cancelled = true;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [facingMode]);

  const handleFlip = useCallback(() => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  }, []);

  const handleCapture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !ready) return;

    setCapturing(true);
    // Set canvas to match video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw the current video frame (mirror if front camera)
    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setCapturing(false);
      onCapture(img, dataUrl);
    };
    img.onerror = () => {
      setCapturing(false);
      setError("Failed to capture photo. Please try again.");
    };
    img.src = dataUrl;
  }, [ready, facingMode, onCapture]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col" role="dialog" aria-label="Camera capture with face guide">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/90">
        <button
          type="button"
          onClick={onClose}
          className="p-2 -ml-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close camera"
        >
          <X className="w-6 h-6" />
        </button>
        <p className="text-xs text-white/60 font-medium">
          Position your face within the guide
        </p>
        <button
          type="button"
          onClick={handleFlip}
          className="p-2 -mr-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Flip camera"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Camera view */}
      <div className="flex-1 relative bg-black overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <Camera className="w-6 h-6 text-white/40" />
            </div>
            <p className="text-sm text-white/60 text-center">{error}</p>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
            >
              Use upload instead
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
              style={facingMode === "user" ? { transform: "scaleX(-1)" } : undefined}
            />
            {/* Face guide overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Dimmed background outside the guide */}
              <defs>
                <mask id="faceGuideMask">
                  <rect x="0" y="0" width="100" height="100" fill="white" />
                  <ellipse cx="50" cy={variant === "acne" ? "48" : "48"} rx="28" ry="36" fill="black" />
                </mask>
              </defs>
              <rect
                x="0" y="0" width="100" height="100"
                fill="rgba(0,0,0,0.45)"
                mask="url(#faceGuideMask)"
              />
              {/* Guide oval */}
              <ellipse
                cx="50" cy={variant === "acne" ? "48" : "48"}
                rx="28" ry="36"
                fill="none"
                stroke="white"
                strokeWidth="0.3"
                strokeDasharray="2,1.5"
                opacity="0.7"
              />
              {/* Corner markers */}
              {[
                { x: 22, y: 12 }, { x: 78, y: 12 },
                { x: 22, y: 84 }, { x: 78, y: 84 },
              ].map((p, i) => (
                <g key={i} stroke="white" strokeWidth="0.4" opacity="0.6">
                  <line x1={p.x} y1={p.y} x2={p.x + 3} y2={p.y} />
                  <line x1={p.x} y1={p.y} x2={p.x} y2={p.y + 3} />
                </g>
              ))}
              {/* Center crosshair (subtle) */}
              <line x1="48" y1="48" x2="52" y2="48" stroke="white" strokeWidth="0.15" opacity="0.3" />
              <line x1="50" y1="46" x2="50" y2="50" stroke="white" strokeWidth="0.15" opacity="0.3" />
            </svg>
            {/* Guidance text */}
            {ready && (
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <p className="text-white/50 text-[11px]">
                  Face should fill the oval · natural light · no filters
                </p>
              </div>
            )}
          </>
        )}
        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Capture button */}
      {ready && !error && (
        <div className="flex items-center justify-center py-6 bg-black">
          <button
            type="button"
            onClick={handleCapture}
            disabled={capturing}
            className="w-18 h-18 rounded-full border-4 border-white relative flex items-center justify-center transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            aria-label="Capture photo"
          >
            <div className="w-14 h-14 rounded-full bg-white" />
            {capturing && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
