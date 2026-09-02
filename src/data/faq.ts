/**
 * Faceify Labs — Data Layer: FAQs
 * Source: https://faceifylabs.com/ (schema.org FAQPage)
 * All answers preserve source intent and wording.
 */

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'privacy' | 'technology' | 'pricing' | 'clinical';
}

export const faqs: FAQ[] = [
  {
    id: 'what-is-faceify',
    category: 'general',
    question: 'What is Faceify Labs?',
    answer:
      'Faceify Labs is a browser-based AI surgical simulation platform with 85+ procedure simulators built for plastic surgeons, aesthetic clinics, and patients. It processes patient photos entirely on-device using a 468-point anatomical facial mesh — no images are uploaded to any server during real-time simulation. It is an educational visual planning tool, not regulated as a medical device under the U.S. FDA, the Thai FDA, the Korean MFDS, ANVISA (Brazil), or the PMDA (Japan).',
  },
  {
    id: 'how-many-procedures',
    category: 'general',
    question: 'How many procedures does Faceify Labs simulate?',
    answer:
      'Faceify Labs supports 85+ procedures across 6 categories: surgical (rhinoplasty, blepharoplasty, facelift, brow lift, otoplasty, V-line, and more), non-surgical (chemical peels, laser, microneedling, HIFU, RF), injectable (Botox, dermal fillers, Profhilo, Sculptra, Radiesse, Kybella, masseter Botox), dental (veneers, smile design, teeth whitening, gummy smile), body contouring (breast augmentation, liposuction, BBL, tummy tuck, brachioplasty, thigh lift), and hair restoration (DHI hair transplant, PRP hair, laser hair removal).',
  },
  {
    id: 'is-it-free',
    category: 'pricing',
    question: 'Is Faceify Labs free to try?',
    answer:
      'Yes. Visit faceifylabs.com/demo to try every procedure simulator free with no signup required. Surgeon plans start at $149/month.',
  },
  {
    id: 'patient-data-safe',
    category: 'privacy',
    question: 'Is patient data safe with Faceify Labs?',
    answer:
      'Yes. All facial photo processing is performed entirely on-device in the browser. No patient photos are ever uploaded to or stored on any Faceify Labs server during real-time simulation. The platform is built with data-protection practices informed by GDPR, Thailand PDPA, South Korea PIPA, Singapore PDPA, and India DPDPA.',
  },
  {
    id: 'devices-supported',
    category: 'technology',
    question: 'What devices and browsers does Faceify Labs support?',
    answer:
      'Any modern browser: Chrome, Safari, Firefox, or Edge — on desktop, tablet, or mobile. iOS Safari 15+ and Android Chrome are fully supported. iPad is the most common device for in-clinic surgeon demos. No app download or hardware required.',
  },
  {
    id: 'how-accurate',
    category: 'clinical',
    question: 'How accurate are the AI simulations?',
    answer:
      'Simulations use a 468-point anatomical facial mesh with sub-millimeter landmark tracking precision (0.04mm RMSD, validated against peer-reviewed face-tracking benchmarks). Each procedure has clinical safety constraints — anatomical clamps prevent unrealistic deformations. Simulations are educational, directional previews, not surgical-outcome guarantees.',
  },
  {
    id: 'share-simulation',
    category: 'general',
    question: 'Can I share a simulation with my patient or surgeon?',
    answer:
      'Yes. Surgeons can email patients a one-click link that opens the simulation plan in a browser — patients see the surgeon\'s parameter selections without uploading anything new. Patients can email surgeons a share link the same way. Photos stay on each person\'s device throughout — only the parameter state is transmitted.',
  },
  {
    id: 'photo-leaves-device',
    category: 'privacy',
    question: 'Does my photo ever leave my device?',
    answer:
      'The real-time simulator runs entirely in your browser. Your photo leaves your device only in two optional scenarios: when you request the optional AI photoreal preview, or when you save a simulation to your account. We never use your photo to train any model.',
  },
  {
    id: 'vs-competitors',
    category: 'general',
    question: 'How does Faceify Labs compare to Crisalix or Vectra?',
    answer:
      'Faceify Labs runs entirely in the browser with no hardware required. Crisalix uses a 3D mobile scanner. Vectra (Canfield) requires $25,000+ in dedicated 3D camera hardware. Faceify ships 85+ parametric procedures with clinical safety constraints, 100% on-device processing, and a 468-point anatomical mesh — at $149/month.',
  },
  {
    id: 'what-is-photoreal',
    category: 'technology',
    question: 'What is the AI photoreal preview?',
    answer:
      'The AI photoreal preview is an optional feature that generates a photorealistic rendering of the simulation. Unlike the real-time simulator (which runs entirely on-device), the photoreal preview requires sending your photo off-device to our processing infrastructure. You are informed before initiating this optional step.',
  },
];

export function getFaqsByCategory(category: FAQ['category']): FAQ[] {
  return faqs.filter((f) => f.category === category);
}
