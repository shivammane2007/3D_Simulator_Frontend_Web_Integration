'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Shield, Eye, Globe2, ArrowRight } from 'lucide-react';
import { routes } from '@/config/routes';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

function Divider() {
  return (
    <div className="flex items-center justify-center py-10 sm:py-12">
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#CF4500]/30 to-transparent" />
    </div>
  );
}

export default function OurStoryPage() {
  const beliefs = [
    {
      icon: Eye,
      title: 'Show, don’t tell',
      body: 'A 10-second simulation closes more consultations than a 30-minute explanation. When patients can see a visualization on their own face, trust is immediate.',
    },
    {
      icon: Shield,
      title: 'Privacy is non-negotiable',
      body: 'Every simulation runs entirely in the browser. No patient image ever touches a server. Zero cloud processing, zero data risk, zero compliance headaches.',
    },
    {
      icon: Zap,
      title: 'Speed is a feature',
      body: 'Surgeons have 8 minutes per consultation. If a tool takes longer to set up than the conversation itself, it won’t be used. Our engine renders in under 200ms.',
    },
    {
      icon: Globe2,
      title: 'Built for every face',
      body: '468-point MediaPipe FaceMesh — tested across Asian, South Asian, Middle Eastern, African, and European facial phenotypes. We evaluate landmark accuracy across ethnicities, not just Western benchmark sets.',
    },
  ];

  return (
    <div className="bg-[#F3F0EE] min-h-screen pt-28 sm:pt-36 pb-24 font-sans selection:bg-[#CF4500]/15 selection:text-[#141413] relative overflow-hidden">
      {/* ── Background Trajectory Curve ── */}
      <svg
        className="absolute inset-0 w-full h-[700px] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          d="M-100 480 C 350 620, 850 140, 1600 260"
          stroke="#F37338"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          opacity="0.35"
        />
        <circle cx="1020" cy="220" r="3.5" fill="#CF4500" opacity="0.4" />
      </svg>

      {/* ── 1. Editorial Hero ── */}
      <section className="container-master relative z-10 text-center max-w-3xl mx-auto pt-6 pb-4 space-y-4">
        <span className="text-eyebrow-master text-eyebrow-dot justify-center">
          A LETTER FROM THE FOUNDER
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal font-display tracking-tight text-[#141413] leading-[1.1]">
          Surgeons deserve{' '}
          <span className="italic font-medium text-[#CF4500]">
            better tools.
          </span>
        </h1>

        <p className="pt-2 text-base sm:text-lg text-[#555555] font-normal max-w-2xl mx-auto leading-relaxed">
          The aesthetic medicine industry generates over $70B a year. Yet the consultation — the moment that builds trust between surgeon and patient — still relies on hand-waving, stock photos, and hope.
        </p>
      </section>

      <Divider />

      {/* ── 2. The Problem ── */}
      <section className="container-master relative z-10 max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-[32px] p-8 md:p-14 border border-black/5 shadow-level-1 space-y-6">
          <motion.h2
            {...fadeUp}
            className="text-2xl sm:text-3xl font-display font-normal text-[#141413]"
          >
            The problem is simple.
          </motion.h2>

          <motion.div
            {...fadeUp}
            className="space-y-5 text-[#555555] text-base sm:text-lg leading-relaxed"
          >
            <p>
              Patients walk into clinics with a vague idea of what they want. Surgeons have the skill to deliver extraordinary results. But there is no shared language between the two — no way to say “this is what we are going to achieve” and <em className="text-[#141413] font-semibold not-italic">show it</em> in real time.
            </p>
            <p>
              That gap kills conversions. It creates expectation mismatches. It leads to revision surgeries, negative reviews, and burnt-out practitioners who do brilliant work but can’t communicate it.
            </p>
            <p className="text-[#141413] font-semibold text-lg sm:text-xl font-display pt-2">
              We built Faceify Labs to close that gap — permanently.
            </p>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── 3. What We Believe ── */}
      <section className="container-master relative z-10 max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#141413]">
            What we believe
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {beliefs.map((belief, i) => (
            <motion.div
              key={belief.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-[28px] p-7 md:p-8 border border-black/5 shadow-level-1 hover:border-[#CF4500]/25 transition-all hover:shadow-level-2 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FDEEE7] flex items-center justify-center text-[#CF4500] mb-5 group-hover:bg-[#CF4500] group-hover:text-white transition-colors shadow-sm">
                <belief.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#141413] mb-2">
                {belief.title}
              </h3>
              <p className="text-sm text-[#555555] leading-relaxed">
                {belief.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── 4. What We Built ── */}
      <section className="container-master relative z-10 max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-[32px] p-8 md:p-14 border border-black/5 shadow-level-1 space-y-6">
          <motion.h2
            {...fadeUp}
            className="text-2xl sm:text-3xl font-display font-normal text-[#141413]"
          >
            What we built.
          </motion.h2>

          <motion.div
            {...fadeUp}
            className="space-y-5 text-[#555555] text-base sm:text-lg leading-relaxed"
          >
            <p>
              Faceify Labs is a real-time surgical simulation engine. Upload a patient photo, and our 468-point face mesh maps every anatomical landmark — nasal bridge angle, alar base width, malar projection, orbital aperture, jawline contour.
            </p>
            <p>
              Then adjust. Rhinoplasty tip rotation, dorsal hump reduction, Botox zone smoothing, filler volume projection, chemical peel texture refinement, blepharoplasty lid reshaping — all rendered in real time, all running on the device in front of you.
            </p>
            <p>
              No downloads. No GPU servers. No per-image billing. Just open a browser, upload a photo, and show the patient a visualization to explore.
            </p>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── 5. Why We're Different ── */}
      <section className="container-master relative z-10 max-w-3xl mx-auto px-4 space-y-6">
        <div className="bg-white rounded-[32px] p-8 md:p-14 border border-black/5 shadow-level-1 space-y-8">
          <motion.h2
            {...fadeUp}
            className="text-2xl sm:text-3xl font-display font-normal text-[#141413]"
          >
            Why we’re different.
          </motion.h2>

          <motion.div
            {...fadeUp}
            className="space-y-5 text-[#555555] text-base sm:text-lg leading-relaxed"
          >
            <p>
              Most simulation tools are built by graphics companies who treat the face like a game asset — stretch here, blur there, ship it. The result looks impressive in a demo and absurd in a consultation room.
            </p>
            <p>
              We built ours with anatomical constraints. Every deformation respects tissue mechanics — you can’t project a nasal tip beyond what cartilage allows, can’t inflate cheeks past the malar boundary, can’t smooth skin without accounting for Fitzpatrick type and Glogau classification.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="p-8 sm:p-10 rounded-[24px] bg-[#FDEEE7] border border-[#CF4500]/20 shadow-level-1"
          >
            <p className="text-[#141413] text-xl md:text-2xl font-display leading-relaxed">
              “Our competitors make patients dream.
              <br />
              <span className="italic font-medium text-[#CF4500]">
                We help surgeons deliver.”
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── 6. Why "Faceify" ── */}
      <section className="container-master relative z-10 max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-[32px] p-8 md:p-14 border border-black/5 shadow-level-1 space-y-6">
          <motion.h2
            {...fadeUp}
            className="text-2xl sm:text-3xl font-display font-normal text-[#141413]"
          >
            Why “Faceify.”
          </motion.h2>

          <motion.div
            {...fadeUp}
            className="space-y-5 text-[#555555] text-base sm:text-lg leading-relaxed"
          >
            <p>
              <span className="text-[#141413] font-bold">Face</span> — because this is a face-first platform. Every algorithm, every UI decision, every data model is optimized for facial anatomy.
            </p>
            <p>
              <span className="text-[#141413] font-bold">-ify</span> — because we turn complexity into action. Simplify. Clarify. Quantify. We take the most complex surface in the human body and make it legible to both the surgeon and the patient.
            </p>
            <p>
              <span className="text-[#141413] font-bold">Labs</span> — because we are not a finished product. We’re a research-grade platform that ships production features. Every deployment teaches us something. Every clinic partnership refines the model.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 7. Legal Entity & Leadership ── */}
      <section className="container-master relative z-10 max-w-3xl mx-auto px-4 pt-12 pb-6 text-center space-y-2">
        <p className="text-xs sm:text-sm text-[#696969] leading-relaxed">
          Faceify Labs is a product of Formir Technologies Private Limited, a company registered in India.
        </p>
        <p className="text-xs sm:text-sm text-[#696969] leading-relaxed">
          Faceify Labs is chaired by{' '}
          <Link
            href={routes.leadership.virendraGhaisas}
            className="underline text-[#141413] hover:text-[#CF4500] font-medium transition-colors"
          >
            Dr. Virendra Ghaisas
          </Link>
          , who brings a physician’s perspective to the platform’s clinical direction.
        </p>
      </section>

      <Divider />

      {/* ── 8. Call to Action (CTA) ── */}
      <section className="container-master relative z-10 max-w-2xl mx-auto px-4 pt-4">
        <div className="text-center bg-white rounded-[32px] border border-black/10 p-10 sm:p-14 shadow-level-2 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#141413]">
            Ready to see what your patients see?
          </h2>

          <p className="text-[#555555] text-base mb-8 max-w-xl mx-auto leading-relaxed">
            85+ procedures. No hardware. Just open a browser and start closing more consultations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              href={routes.consultation}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#141413] hover:bg-[#262627] text-white text-xs font-bold rounded-full transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              <span>Schedule a Demo</span>
              <ArrowRight className="w-4 h-4 text-[#CF4500]" />
            </Link>

            <Link
              href={routes.simulate}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-black/15 hover:border-[#CF4500]/40 text-[#141413] text-xs font-bold rounded-full hover:bg-[#FCFBFA] transition-all hover:scale-105 active:scale-95"
            >
              <span>Try the Simulator</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
