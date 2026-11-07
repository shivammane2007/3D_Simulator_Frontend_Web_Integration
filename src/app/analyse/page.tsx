import type { Metadata } from 'next';
import { FaceAnalyser } from '@/components/analyse/FaceAnalyser';
import { AnalyseHubLinks } from '@/components/analyse/AnalyseHubLinks';

export const metadata: Metadata = {
  title: 'AI Face Analyzer | Faceify Labs',
  description:
    'Discover your aesthetic profile with AI-powered facial proportion analysis. Get personalized treatment recommendations based on golden ratio ideals.',
};

export default function AnalysePage() {
  return (
    <div className="min-h-screen bg-[#FDF8F0] pt-24 pb-20 font-sans selection:bg-[#305A4F]/15">
      <FaceAnalyser />
      <AnalyseHubLinks />
    </div>
  );
}
