/**
 * Face Analysis Report Generator — canvas-based consultation report (downloads as PNG).
 * Follows the same pattern as lib/simulation/report-generator.ts.
 */

import type { FacialAnalysisResult, ProcedureRecommendation } from './types';
import { loadImage } from '@/lib/simulation/load-image';

export interface AnalysisReportOptions {
  analysis: FacialAnalysisResult;
  recommendations: ProcedureRecommendation[];
  originalSrc: string; // base64 data URL of uploaded photo
  idealSrc?: string;   // base64 data URL of warped preview (optional)
}

const BRAND_NAVY = '#002B5B';
const BRAND_SAGE = '#7C9082';
const BRAND_BLUE = '#0D92F4';
const FONT = 'Inter, system-ui, sans-serif';

// Measurement keys in display order, grouped by region
const MEASUREMENT_GROUPS: Array<{
  region: string;
  keys: Array<keyof FacialAnalysisResult>;
}> = [
  { region: 'Vertical Balance', keys: ['upperThird', 'middleThird', 'lowerThird'] },
  { region: 'Nose', keys: ['nasalWidth', 'nasolabialAngle', 'tipProjection'] },
  { region: 'Lips', keys: ['lipRatio'] },
  { region: 'Jaw & Chin', keys: ['jawToCheekRatio', 'chinProjection'] },
  { region: 'Eyes & Midface', keys: ['eyeSpacing', 'cheekProjection'] },
];

function severityColor(severity: string): string {
  switch (severity) {
    case 'optimal': return '#34d399';
    case 'mild': return '#a3e635';
    case 'moderate': return '#fbbf24';
    case 'significant': return '#f87171';
    default: return '#94a3b8';
  }
}

function priorityLabel(priority: string): string {
  switch (priority) {
    case 'high': return 'HIGH';
    case 'medium': return 'MED';
    case 'low': return 'LOW';
    default: return priority.toUpperCase();
  }
}

function priorityColor(priority: string): string {
  switch (priority) {
    case 'high': return '#ef4444';
    case 'medium': return '#f59e0b';
    case 'low': return '#6b7280';
    default: return '#94a3b8';
  }
}


function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawScoreGauge(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, radius: number,
  score: number, label: string,
) {
  // Background circle
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = '#f1f5f9';
  ctx.fill();

  // Score arc (270° sweep max)
  const startAngle = -Math.PI * 0.75;
  const endAngle = startAngle + (Math.PI * 1.5 * (score / 100));
  ctx.beginPath();
  ctx.arc(cx, cy, radius, startAngle, endAngle);
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.strokeStyle = score >= 80 ? '#34d399' : score >= 60 ? BRAND_SAGE : score >= 40 ? '#fbbf24' : '#f87171';
  ctx.stroke();

  // Score text
  ctx.fillStyle = BRAND_NAVY;
  ctx.font = `bold ${radius * 0.7}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(score), cx, cy - 2);

  // Label
  ctx.fillStyle = '#64748b';
  ctx.font = `${Math.max(9, radius * 0.3)}px ${FONT}`;
  ctx.fillText(label, cx, cy + radius + 14);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}

/**
 * Generate a branded face analysis report as a downloadable PNG Blob.
 */
export async function generateAnalysisReport(options: AnalysisReportOptions): Promise<Blob> {
  const { analysis, recommendations, originalSrc, idealSrc } = options;

  // Load images
  const originalImg = await loadImage(originalSrc);
  const idealImg = idealSrc ? await loadImage(idealSrc) : null;

  // Layout constants
  const pad = 40;
  const canvasW = 900;
  const headerH = 80;
  const scoresSectionH = 120;
  const imgW = idealImg ? 380 : 400;
  const imgH = Math.round(imgW * (originalImg.height / originalImg.width));
  const imgSectionH = imgH + 40;
  const measurementRowH = 22;
  const regionHeaderH = 28;

  // Count measurement rows
  let totalMeasurementRows = 0;
  let totalRegions = 0;
  for (const group of MEASUREMENT_GROUPS) {
    totalRegions++;
    totalMeasurementRows += group.keys.length;
  }
  const measurementsSectionH = 40 + totalRegions * regionHeaderH + totalMeasurementRows * measurementRowH + 20;

  // Recommendations section
  const topRecs = recommendations.slice(0, 6);
  const recRowH = 28;
  const recsSectionH = topRecs.length > 0 ? 40 + topRecs.length * recRowH + 20 : 0;

  const footerH = 60;
  const canvasH = headerH + pad + scoresSectionH + imgSectionH + measurementsSectionH + recsSectionH + footerH;

  const canvas = document.createElement('canvas');
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext('2d')!;

  // --- Background ---
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvasW, canvasH);

  // --- Header ---
  ctx.fillStyle = BRAND_NAVY;
  ctx.fillRect(0, 0, canvasW, headerH);
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 22px ${FONT}`;
  ctx.fillText('Faceify Labs', pad, 35);
  ctx.font = `14px ${FONT}`;
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Facial Analysis Report', pad, 55);

  // Date + demographics
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  ctx.fillStyle = '#cbd5e1';
  ctx.font = `11px ${FONT}`;
  ctx.textAlign = 'right';
  ctx.fillText(dateStr, canvasW - pad, 30);
  const genderLabel = analysis.detectedGender === 'female' ? 'Female' : 'Male';
  const ethnicityLabel = analysis.selectedEthnicity.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  ctx.fillText(`${genderLabel} · ${ethnicityLabel}`, canvasW - pad, 46);
  ctx.fillText(`Face Shape: ${analysis.faceShape.charAt(0).toUpperCase() + analysis.faceShape.slice(1)}`, canvasW - pad, 62);
  ctx.textAlign = 'left';

  // --- Score Gauges ---
  let y = headerH + pad;
  const gaugeRadius = 30;
  const gaugeSpacing = canvasW / 4;
  const gauges = [
    { score: analysis.overallHarmonyScore, label: 'Overall Harmony' },
    { score: analysis.proportionsScore, label: 'Key Proportions' },
    { score: analysis.symmetryScore, label: 'Symmetry' },
  ];
  for (let i = 0; i < gauges.length; i++) {
    drawScoreGauge(ctx, pad + gaugeSpacing * i + gaugeSpacing / 2, y + gaugeRadius + 10, gaugeRadius, gauges[i].score, gauges[i].label);
  }
  // Face shape badge
  const badgeX = pad + gaugeSpacing * 3 + gaugeSpacing / 2;
  ctx.fillStyle = '#f1f5f9';
  roundRect(ctx, badgeX - 45, y + 5, 90, 50, 12);
  ctx.fill();
  ctx.fillStyle = BRAND_NAVY;
  ctx.font = `bold 16px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillText(analysis.faceShape.charAt(0).toUpperCase() + analysis.faceShape.slice(1), badgeX, y + 30);
  ctx.fillStyle = '#64748b';
  ctx.font = `9px ${FONT}`;
  ctx.fillText('Face Shape', badgeX, y + 72);
  ctx.textAlign = 'left';

  y += scoresSectionH;

  // --- Images ---
  if (idealImg) {
    // Before label
    ctx.fillStyle = '#0f172a';
    ctx.font = `bold 11px ${FONT}`;
    ctx.fillText('ORIGINAL', pad, y - 6);
    ctx.fillStyle = BRAND_BLUE;
    ctx.fillText('IDEAL PREVIEW', pad + imgW + 40, y - 6);

    // Draw original
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, pad, y, imgW, imgH, 8);
    ctx.clip();
    ctx.drawImage(originalImg, pad, y, imgW, imgH);
    ctx.restore();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    roundRect(ctx, pad, y, imgW, imgH, 8);
    ctx.stroke();

    // Draw ideal
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, pad + imgW + 40, y, imgW, imgH, 8);
    ctx.clip();
    ctx.drawImage(idealImg, pad + imgW + 40, y, imgW, imgH);
    ctx.restore();
    ctx.strokeStyle = BRAND_BLUE + '40';
    ctx.lineWidth = 1;
    roundRect(ctx, pad + imgW + 40, y, imgW, imgH, 8);
    ctx.stroke();
  } else {
    // Only original
    ctx.fillStyle = '#0f172a';
    ctx.font = `bold 11px ${FONT}`;
    ctx.fillText('ORIGINAL', pad, y - 6);
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, pad, y, imgW, imgH, 8);
    ctx.clip();
    ctx.drawImage(originalImg, pad, y, imgW, imgH);
    ctx.restore();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    roundRect(ctx, pad, y, imgW, imgH, 8);
    ctx.stroke();
  }

  y += imgSectionH;

  // --- Measurements Table ---
  ctx.fillStyle = BRAND_NAVY;
  ctx.font = `bold 14px ${FONT}`;
  ctx.fillText('Facial Proportions Analysis', pad, y);
  y += 22;

  // Column headers
  ctx.fillStyle = '#94a3b8';
  ctx.font = `bold 9px ${FONT}`;
  ctx.fillText('MEASUREMENT', pad + 10, y);
  ctx.fillText('ACTUAL', pad + 320, y);
  ctx.fillText('IDEAL', pad + 400, y);
  ctx.fillText('DEVIATION', pad + 480, y);
  ctx.fillText('STATUS', pad + 580, y);
  y += 4;

  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(pad, y);
  ctx.lineTo(canvasW - pad, y);
  ctx.stroke();
  y += 6;

  for (const group of MEASUREMENT_GROUPS) {
    // Region header
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(pad, y - 2, canvasW - pad * 2, regionHeaderH - 4);
    ctx.fillStyle = BRAND_SAGE;
    ctx.font = `bold 10px ${FONT}`;
    ctx.fillText(group.region.toUpperCase(), pad + 10, y + 12);
    y += regionHeaderH;

    for (const key of group.keys) {
      const m = analysis[key];
      if (!m || typeof m !== 'object' || !('actual' in m)) continue;

      const measurement = m as FacialAnalysisResult['nasalWidth'];

      // Alternating row bg
      ctx.fillStyle = '#fafafa';
      ctx.fillRect(pad + 5, y - 2, canvasW - pad * 2 - 10, measurementRowH);

      // Name
      ctx.fillStyle = '#475569';
      ctx.font = `11px ${FONT}`;
      ctx.fillText(measurement.name, pad + 14, y + 13);

      // Actual
      ctx.fillStyle = BRAND_NAVY;
      ctx.font = `bold 11px ${FONT}`;
      const unit = measurement.unit || '';
      ctx.fillText(`${measurement.actual.toFixed(1)}${unit}`, pad + 320, y + 13);

      // Ideal
      ctx.fillStyle = '#94a3b8';
      ctx.font = `11px ${FONT}`;
      ctx.fillText(`${measurement.ideal.toFixed(1)}${unit}`, pad + 400, y + 13);

      // Deviation
      const devSign = measurement.deviation > 0 ? '+' : '';
      ctx.fillStyle = severityColor(measurement.severity);
      ctx.font = `bold 11px ${FONT}`;
      ctx.fillText(`${devSign}${measurement.deviation.toFixed(1)}%`, pad + 480, y + 13);

      // Status dot + label
      const dotX = pad + 584;
      const dotY = y + 9;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
      ctx.fillStyle = severityColor(measurement.severity);
      ctx.fill();
      ctx.fillStyle = '#64748b';
      ctx.font = `10px ${FONT}`;
      ctx.fillText(measurement.severity.charAt(0).toUpperCase() + measurement.severity.slice(1), dotX + 10, y + 13);

      y += measurementRowH;
    }
  }

  y += 15;

  // --- Treatment Recommendations ---
  if (topRecs.length > 0) {
    ctx.fillStyle = BRAND_NAVY;
    ctx.font = `bold 14px ${FONT}`;
    ctx.fillText('Recommended Procedures', pad, y);
    y += 22;

    // Column headers
    ctx.fillStyle = '#94a3b8';
    ctx.font = `bold 9px ${FONT}`;
    ctx.fillText('PROCEDURE', pad + 10, y);
    ctx.fillText('PRIORITY', pad + 280, y);
    ctx.fillText('IMPACT', pad + 370, y);
    ctx.fillText('EST. IMPROVEMENT', pad + 450, y);
    ctx.fillText('ADDRESSES', pad + 580, y);
    y += 4;

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(canvasW - pad, y);
    ctx.stroke();
    y += 8;

    for (let i = 0; i < topRecs.length; i++) {
      const rec = topRecs[i];

      // Alternating bg
      if (i % 2 === 0) {
        ctx.fillStyle = '#fafafa';
        ctx.fillRect(pad + 5, y - 4, canvasW - pad * 2 - 10, recRowH);
      }

      // Procedure name
      ctx.fillStyle = BRAND_NAVY;
      ctx.font = `bold 11px ${FONT}`;
      ctx.fillText(rec.procedureName, pad + 10, y + 12);

      // Category badge
      ctx.fillStyle = '#e2e8f0';
      const catText = rec.category.replace(/-/g, ' ');
      ctx.font = `8px ${FONT}`;
      const catW = ctx.measureText(catText).width + 10;
      roundRect(ctx, pad + 200, y + 1, catW, 16, 4);
      ctx.fill();
      ctx.fillStyle = '#64748b';
      ctx.fillText(catText, pad + 205, y + 12);

      // Priority
      ctx.fillStyle = priorityColor(rec.priority);
      ctx.font = `bold 10px ${FONT}`;
      ctx.fillText(priorityLabel(rec.priority), pad + 285, y + 12);

      // Impact bar
      const barX = pad + 370;
      const barW = 60;
      const barH = 6;
      const barY = y + 8;
      ctx.fillStyle = '#e2e8f0';
      roundRect(ctx, barX, barY, barW, barH, 3);
      ctx.fill();
      ctx.fillStyle = BRAND_BLUE;
      roundRect(ctx, barX, barY, barW * (rec.impactScore / 10), barH, 3);
      ctx.fill();
      ctx.fillStyle = '#475569';
      ctx.font = `9px ${FONT}`;
      ctx.fillText(`${rec.impactScore}/10`, barX + barW + 5, y + 12);

      // Est improvement
      ctx.fillStyle = '#34d399';
      ctx.font = `bold 11px ${FONT}`;
      ctx.fillText(`+${rec.estimatedImprovement}%`, pad + 460, y + 12);

      // Addresses (truncated)
      ctx.fillStyle = '#94a3b8';
      ctx.font = `9px ${FONT}`;
      const issuesText = rec.addressesIssues.slice(0, 2).join(', ');
      const maxIssueW = canvasW - pad - (pad + 580) - 10;
      let displayIssues = issuesText;
      while (ctx.measureText(displayIssues).width > maxIssueW && displayIssues.length > 10) {
        displayIssues = displayIssues.slice(0, -4) + '…';
      }
      ctx.fillText(displayIssues, pad + 580, y + 12);

      y += recRowH;
    }
  }

  // --- Footer ---
  const footerY = canvasH - footerH;
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, footerY, canvasW, footerH);
  ctx.strokeStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.moveTo(0, footerY);
  ctx.lineTo(canvasW, footerY);
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = `10px ${FONT}`;
  ctx.fillText(
    'AI Analysis — This is a digital assessment tool and is not a medical diagnosis. Always consult a qualified surgeon.',
    pad,
    footerY + 22,
  );
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('Generated by Faceify Labs — faceifylabs.com', pad, footerY + 40);

  // --- Export ---
  return new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob ?? new Blob());
    }, 'image/png');
  });
}

/**
 * Helper to trigger browser download of the report.
 */
export async function downloadAnalysisReport(options: AnalysisReportOptions): Promise<void> {
  const blob = await generateAnalysisReport(options);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `faceify-analysis-${Date.now()}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
