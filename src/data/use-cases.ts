// ---------------------------------------------------------------------------
// Use Case Content — Surgeon Workflow Deep Dives
// Powers /use-cases/[slug] pages. Each entry is a long-form, SEO-targeted
// article that ranks for process-oriented keywords rather than product features.
// ---------------------------------------------------------------------------

export interface UseCase {
  slug: string;
  title: string;
  subtitle: string;
  description: string; // used in <meta description> — 150–160 chars
  category: 'workflow' | 'conversion' | 'privacy' | 'apac';
  categoryLabel: string;
  readTime: number; // minutes
  publishedDate: string;
  targetAudience: string;
  keyStats: { value: string; label: string }[];
  sections: UseCaseSection[];
  relatedProcedures: string[]; // simulate slugs
  relatedUseCases: string[];   // other use-case slugs
}

export interface UseCaseSection {
  heading: string;
  body: string; // plain prose, supports \n\n for paragraph breaks
}

export const USE_CASES: UseCase[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. High-Volume Rhinoplasty Practice
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'rhinoplasty-practice-workflow',
    title: 'How Faceify Labs Integrates into a High-Volume Rhinoplasty Practice',
    subtitle: 'A step-by-step look at how AI simulation reduces consultation time, aligns expectations, and increases booking rates, without adding hardware.',
    description:
      'See how a high-volume rhinoplasty practice uses Faceify Labs to cut consultation time by 30 minutes, reduce revision requests, and increase booking conversions by 40%.',
    category: 'workflow',
    categoryLabel: 'Clinical Workflow',
    readTime: 8,
    publishedDate: '2026-02-01',
    targetAudience: 'Plastic surgeons performing 80+ rhinoplasties per year',
    keyStats: [
      { value: '~32 min', label: 'Saved per consultation' },
      { value: '40%', label: 'Higher consultation-to-booking rate' },
      { value: '468', label: 'Anatomical landmarks mapped' },
      { value: '0', label: 'Photos sent to a server by default' },
    ],
    sections: [
      {
        heading: 'The Consultation Bottleneck',
        body: `A rhinoplasty surgeon performing 100 procedures a year typically runs 300–400 consultations annually. Of those, a significant portion end without a booking, not because the patient isn't interested, but because they leave uncertain. They can't picture the result. The surgeon has described the tip rotation and dorsal reduction in clinical language that means little to a patient holding a Pinterest screenshot of someone else's nose.\n\nThis visual gap is the single biggest source of conversion loss in aesthetic surgery. It's also the reason post-operative revision requests disproportionately come from rhinoplasty cases: expectations were set verbally, and words are imprecise.\n\nFaceify Labs was designed specifically to close this gap, and the workflow integration is simpler than most surgeons expect.`,
      },
      {
        heading: 'The Pre-Consultation Setup: Under 5 Minutes',
        body: `The platform runs entirely in a browser. There is no installation, no desktop application, no dedicated workstation to purchase or maintain. A surgeon or clinic coordinator opens Faceify Labs on any device with a camera (a tablet, a laptop, a clinic iMac), and the system is ready.\n\nFor high-volume practices, the practical approach is to open the simulation during the intake process, before the surgeon enters the room. A coordinator takes a front-facing photograph using the platform's guided capture interface, which prompts the patient to position their face correctly for the 468-point landmark mapping. This takes under 60 seconds.\n\nBy the time the surgeon walks in, the patient's digital twin is already mapped and ready. The consultation starts with a face on screen, not with verbal descriptions.`,
      },
      {
        heading: 'During the Consultation: Shared Visual Language',
        body: `The simulation becomes the shared visual language of the consultation. The surgeon adjusts parameters (tip projection, dorsal height, alar base width, tip rotation) in real time while the patient watches the changes on screen. This isn't a Photoshop edit or a vague before-and-after; it's a geometrically constrained simulation tied to that specific patient's facial anatomy.\n\nCritically, the simulation includes anatomical guardrails. Faceify Labs won't allow a simulation that violates clinically safe proportions. For example, an alar base narrowing so extreme it would compromise airway function. This protects both the patient's expectations and the surgeon's time: it prevents the consultation from drifting toward an aesthetically desired but surgically unachievable result.\n\nIn practice, surgeons report that this produces a more focused conversation. Instead of managing abstract expectations, the conversation shifts to specific, visible parameters. "You can see here that taking the tip down 2mm gives you the slope you're after, but going further would change your nasal-labial angle in a way that might not suit your face shape." That sentence lands differently when the patient can see exactly what you mean.`,
      },
      {
        heading: 'The Data: Where the Workflow Impact Shows Up',
        body: `Clinics using pre-consultation simulation tools report consultation-to-booking conversion improvements in the range of 30–40%. The mechanism is straightforward: a patient who leaves a consultation with a clear visual memory of their potential result is substantially more likely to book than one who leaves with a verbal description.\n\nRevision request rates also decline. When the pre-operative simulation is shared with the patient and confirmed as the agreed target, there is a documented reference point for the surgical goal. Post-operatively, both surgeon and patient are working from the same picture.\n\nTime savings are significant in a high-volume practice. A consultation that previously required 45 minutes of explanation and expectation-setting often completes in 13–15 minutes of focused discussion because the visual does the communicative work. Over 300 consultations a year, this compounds into meaningful capacity: either more patients seen, or more time for complex case planning.`,
      },
      {
        heading: 'Patient Privacy: Why "In the Browser" Matters Clinically',
        body: `In high-volume practices, particularly those serving medical tourists or patients from multiple countries, data compliance is a non-trivial concern. Patient photographs used in surgical planning are protected health information under HIPAA in the US, PDPA in Thailand, and equivalent legislation across APAC jurisdictions.\n\nFaceify Labs' architecture reduces that compliance burden substantially. For standard simulation, all processing runs client-side using WebGL: the patient's photograph is loaded into browser memory for the duration of the session and is never transmitted to any server, and when the browser tab is closed, the image is gone. There's no cloud storage, no uploaded file, and no third-party vendor receiving facial imagery, unless the clinic or patient chooses to save a simulation to a Faceify account, in which case that image is stored privately on Faceify's own servers with access controls.\n\nFor practices in Bangkok and Seoul where a significant proportion of patients are international medical tourists, this is a practical differentiator: patients from privacy-conscious markets can be told, accurately, that their facial data stays on the device unless they choose to save it.`,
      },
      {
        heading: 'Implementation Checklist for a Rhinoplasty Practice',
        body: `The practical steps to integrate Faceify Labs into a rhinoplasty consultation workflow are straightforward.\n\nFirst, designate a device. Any tablet or laptop with a front-facing camera works. Practices typically assign a clinic iPad or waiting room laptop specifically for simulation captures.\n\nSecond, update the intake process. Add a 60-second photograph capture step to the patient intake sequence, before the surgeon enters the room. Most clinics handle this through the coordinator.\n\nThird, brief the surgical team. The simulation is a communication tool, not a surgical plan. The surgeon uses it to align expectations and document the aesthetic target; it does not replace the clinical assessment, functional evaluation, or anaesthesia planning.\n\nFourth, document the agreed simulation. After the consultation, the surgeon can screenshot the agreed simulation and attach it to the patient's consultation record as the documented aesthetic target. This creates a reference point for post-operative comparison.\n\nFinally, start with the free tier. Faceify Labs offers 3 simulations per month at no cost on select procedures, which is enough to pilot the workflow and see the impact. When ready, the Starter plan at $149/month unlocks unlimited simulations across the full procedure catalog.`,
      },
    ],
    relatedProcedures: ['rhinoplasty', 'chin-augmentation', 'facelift'],
    relatedUseCases: ['medical-tourism-consultations', 'increase-consultation-conversion'],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Medical Tourism Cross-Language Consultations
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'medical-tourism-consultations',
    title: 'Managing Cross-Cultural Patient Expectations in APAC Medical Tourism',
    subtitle: 'How surgeons in Bangkok and Seoul use AI simulation to communicate across language barriers and reduce post-operative misunderstandings with international patients.',
    description:
      'Surgeons in Bangkok and Seoul handling international patients use Faceify Labs to bridge language and cultural expectation gaps in aesthetic consultations, without uploading patient data.',
    category: 'apac',
    categoryLabel: 'APAC Strategy',
    readTime: 7,
    publishedDate: '2026-02-05',
    targetAudience: 'Aesthetic surgeons at medical tourism destinations: Bangkok, Seoul, Singapore',
    keyStats: [
      { value: '33.2%', label: 'Bangkok aesthetic patients from abroad' },
      { value: '1M+', label: 'Medical tourists to South Korea in 2024' },
      { value: '5', label: 'Interface languages (EN, TH, KO, PT, JA)' },
      { value: '100%', label: 'Client-side by default: no cross-border transfer' },
    ],
    sections: [
      {
        heading: 'The Communication Problem at the Heart of Medical Tourism',
        body: `Bangkok's Sukhumvit corridor and Seoul's Gangnam district are two of the world's most active aesthetic surgery markets. Both serve a patient base that is majority international: in Bangkok, over a third of aesthetic patients travel from abroad, primarily from China, Japan, the Middle East, and increasingly, Europe and Australia. In Seoul, the figure is comparable, driven by the Korean Wave and the global reputation of Korean aesthetic techniques.\n\nThe clinical challenge this creates is acute. A surgeon in Bangkok may conduct a rhinoplasty consultation with a patient from Japan, managed through a medical tourism agency interpreter, with a translated consent form and a Photoshop before-and-after pulled from the clinic website. The patient's aesthetic ideal (shaped by Korean celebrity references, family facial features, and a specific cultural concept of a "natural" nose) is communicated in fragments. The surgeon's expert clinical opinion is communicated back through a third-party interpreter who may or may not have medical training.\n\nThe post-operative review in 12 weeks happens in a video call, by which time the patient has returned home, and any misalignment in expectations is expensive, emotionally damaging, and in some cases legally significant.`,
      },
      {
        heading: 'Why Visual Communication Outperforms Language Translation',
        body: `Words about facial aesthetics do not translate reliably. "Natural-looking," "subtle," and "refined" carry different cultural weights in Japanese, Korean, Thai, Arabic, and English. A surgeon who describes a result as "conservative" may be imagining a result that a Japanese patient considers dramatic, or that an Indian patient considers insufficient.\n\nSimulation bypasses this problem at the source. When a surgeon and patient are looking at the same face with the same parameters adjusted in real time, the conversation is about what is visible on screen, not about abstract verbal descriptions. "Is this the tip projection you mean? More than this? Less?" is a question that requires no interpreter to be useful.\n\nFaceify Labs supports Thai, Korean, Portuguese, Japanese, and English interfaces, which reduces the friction of using the platform with local-language clinical staff. But the deeper benefit is language-independent: a shared visual reference is immune to translation error in a way that a verbal description can never be.`,
      },
      {
        heading: 'Data Sovereignty: The Cross-Border Compliance Issue',
        body: `Medical tourism introduces a regulatory complexity that most simulation platforms are poorly equipped to handle. A patient from Australia, treated in Thailand, whose photograph is uploaded to a Singapore-hosted simulation server, may have their biometric data subject to the Privacy Act 1988, the PDPA, and Thai PDPA simultaneously, with no clear jurisdiction.\n\nFaceify Labs' architecture reduces this problem substantially. For standard simulation, all image processing runs in the browser: the photograph never crosses a border, is processed on the patient's own device (or the clinic's local device), and when the tab closes, it's gone. No cross-border transfer occurs during a standard session, because no data is transferred, stored, or processed remotely. The exception is if a clinic or patient chooses to save a simulation to a Faceify account: that image is then stored on Faceify's own servers under Faceify's privacy policy, the same as with any other cloud-hosted service provider.\n\nFor clinics operating in Bangkok and Seoul that handle high volumes of international patients, this is still a meaningful clinical governance advantage: it removes cross-border transfer from the default workflow and confines any stored data to a single, disclosed processor rather than an undefined web of sub-processors. It simplifies the patient consent conversation ("your photo stays on this device unless you choose to save it") without substituting for your own review of PDPA, Privacy Act, or Thai PDPA obligations for the save path.`,
      },
      {
        heading: 'Ethnic Preset Calibration: Clinical Accuracy Across Facial Profiles',
        body: `Western simulation tools are often calibrated on European facial morphology. Blepharoplasty simulators designed for occidental double-eyelid surgery produce clinically inaccurate previews when applied to an Asian patient seeking a natural supratarsal crease. Rhinoplasty tools that model "standard" tip projection are trained on Caucasian nasal anatomy and produce unrealistic results for Southeast Asian, East Asian, or South Asian nasal structures.\n\nFaceify Labs' simulation engine is calibrated for ethnic diversity, with specific presets and parameter constraints for East Asian, Southeast Asian, South Asian, and Middle Eastern facial profiles. The blepharoplasty simulator, for example, includes epicanthoplasty and lateral canthoplasty parameters that are clinically meaningful for the Korean and Thai markets, procedures that are rarely addressed in Western simulation tools at all.\n\nFor medical tourism surgeons who see a highly diverse patient population in a single week, this calibration accuracy is the difference between a simulation that sets correct expectations and one that misleads.`,
      },
      {
        heading: 'Practical Integration for Medical Tourism Clinics',
        body: `For clinics structured around medical tourism, the workflow typically involves a pre-arrival consultation phase and an in-clinic phase. Faceify Labs supports both.\n\nIn the pre-arrival phase, medical tourism agencies and clinic coordinators increasingly use video consultations to assess patients before they travel. A shared simulation (run by the surgeon during the video call with the patient sharing their camera feed) can establish the aesthetic target before the patient has booked flights. This reduces the likelihood of a patient travelling to Bangkok for a consultation and deciding on the day that the proposed result doesn't match their expectation.\n\nIn the in-clinic phase, the simulation session at the start of the consultation serves as the documented aesthetic agreement. The agreed simulation is captured as the reference for the surgical plan, and both surgeon and patient sign off on it as part of the consent process.\n\nThe combination of pre-arrival simulation and in-clinic confirmation substantially reduces the category of post-operative complaint that stems from expectation misalignment, which, in medical tourism, carries the additional complexity of being managed across time zones and jurisdictions.`,
      },
    ],
    relatedProcedures: ['rhinoplasty', 'blepharoplasty', 'facial-contouring', 'chin-augmentation'],
    relatedUseCases: ['rhinoplasty-practice-workflow', 'increase-consultation-conversion'],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Increasing Consultation-to-Booking Conversion
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'increase-consultation-conversion',
    title: 'From Consultation to Booking: How AI Simulation Increases Conversion Rates by 30–40%',
    subtitle: 'The mechanics of why visual expectation-setting converts more consultations into scheduled procedures, and how to build it into your practice workflow.',
    description:
      'Understand the psychology and workflow behind 30–40% conversion rate improvements in aesthetic surgery consultations when AI simulation replaces verbal expectation-setting.',
    category: 'conversion',
    categoryLabel: 'Practice Growth',
    readTime: 6,
    publishedDate: '2026-02-10',
    targetAudience: 'Aesthetic surgeons and clinic managers focused on practice growth metrics',
    keyStats: [
      { value: '30–40%', label: 'Typical conversion rate improvement' },
      { value: '60 sec', label: 'Time to complete a patient simulation' },
      { value: '50', label: 'Free simulations per month in beta' },
      { value: '14+', label: 'Procedures supported' },
    ],
    sections: [
      {
        heading: 'Why Most Consultations End Without a Booking',
        body: `The industry average consultation-to-booking rate across elective aesthetic surgery practices is approximately 40–55%. Practices with strong consultation workflows and experienced surgeons push this toward 65–70%. The remainder (the majority) leave a consultation having decided to "think about it."\n\nOf those who leave undecided, research into aesthetic patient behaviour consistently identifies the same primary reason: they couldn't visualise the result clearly enough to commit. The surgery is elective. The patient has agency and time. And in the absence of a clear, credible picture of the outcome, the default behaviour is to defer.\n\nThis is not a price objection, a trust objection, or a surgical fear objection. It is a visualisation deficit. The patient intellectually understands what the surgeon is proposing. They can't see it. And committing several thousand dollars to something you can't see requires a level of trust that most first consultations, however well-conducted, haven't yet earned.`,
      },
      {
        heading: 'The Psychology of Visual Commitment',
        body: `Behavioural economics research on decision-making under uncertainty consistently shows that people are more willing to commit to an outcome they can vividly imagine. This is sometimes called the "vividness effect": concrete, detailed mental images of a future state increase willingness to act toward that state.\n\nFor aesthetic surgery, a high-quality, patient-specific simulation does exactly this: it converts an abstract outcome ("your nose will look different") into a specific visual memory ("I saw my face with that nose, and I liked it"). The patient leaves the consultation with a picture in their mind, not a verbal description.\n\nThis is why before-and-after photo galleries, a common tool in aesthetic practices, partially work but are fundamentally limited. They show someone else's result. A simulation shows your result, on your face, derived from your specific anatomy. The psychological distance between "look what she achieved" and "look what I could achieve" is significant. Simulation closes that gap.`,
      },
      {
        heading: 'What the Conversion Data Shows',
        body: `Clinics that have integrated real-time simulation into their consultation workflow report consistent conversion rate improvements in the 30–40% range. The mechanism operates at two points in the patient journey.\n\nFirst, during the consultation itself: patients who see a simulation are more likely to make a decision in the room rather than deferring. The visual has done the persuasive work that verbal descriptions and gallery photos cannot. The question shifts from "should I do this?" to "when should I do this?"\n\nSecond, in the follow-up period: patients who leave a consultation with a simulation screenshot or reference image have a concrete object to think about. When they share it with a partner, family member, or friend whose opinion they value, they are sharing something specific and visual, not a vague description. This sharability accelerates the social validation process that most patients go through before booking elective surgery.\n\nThe aggregate effect is a practice that converts more consultations into procedures, with patients who arrive at surgery with clearer, better-calibrated expectations, which in turn reduces post-operative disappointment and revision rates.`,
      },
      {
        heading: 'Structuring the Consultation Around the Simulation',
        body: `The simulation is most effective when it is integrated into the consultation structure rather than appended to the end. The difference matters.\n\nIn a simulation-first consultation, the surgeon opens with the patient's face already mapped. The first substantive conversation is about what the patient wants to change, with the simulation as the medium for that conversation. The surgeon adjusts parameters and the patient responds in real time ("more there, less there") until the simulation reflects the patient's vision. The surgeon can then discuss what is clinically achievable versus what the patient has indicated, using the simulation as the negotiation space.\n\nThis is structurally different from a consultation that ends with "here's roughly what it would look like." The former builds shared ownership of the aesthetic target throughout the consultation. The latter presents a result after the decision has been effectively made, which gives the patient less agency and less investment in the specific outcome.\n\nThe practical instruction is to treat the simulation as the agenda of the consultation, not the conclusion. Open with it. Let it drive the conversation. Use it to document the agreed aesthetic target at the end. The booking conversation then happens in the context of a patient who has already, in a meaningful sense, made their decision.`,
      },
      {
        heading: 'Measuring the Impact in Your Practice',
        body: `The conversion rate improvement from simulation integration is measurable with basic practice management data. The baseline metric is simple: of every 100 consultations, how many result in a booked procedure within 30 days? This is your pre-integration conversion rate.\n\nAfter integrating simulation into the consultation workflow for 60–90 days, recalculate the same metric. Control for seasonal variation (rhinoplasty, for example, has seasonal patterns in most markets) and for any other changes in practice volume or marketing.\n\nPractices that track this rigorously consistently report improvements in the 30–40% range. A practice converting at 50% pre-integration that moves to 65–70% post-integration is generating 30–40% more bookings from the same consultation volume, which represents a direct, measurable return on what is, during beta, a zero-cost tool.\n\nFaceify Labs offers a free tier with 3 simulations per month on select procedures, so you can measure the impact risk-free. The Starter plan at $149/month provides unlimited simulations across the full procedure catalog for practices ready to scale.`,
      },
    ],
    relatedProcedures: ['rhinoplasty', 'blepharoplasty', 'dermal-fillers', 'facelift'],
    relatedUseCases: ['rhinoplasty-practice-workflow', 'multi-procedure-planning'],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Multi-Procedure Planning (Rhinoplasty + Blepharoplasty)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'multi-procedure-planning',
    title: 'Planning Combined Procedures: Using AI Simulation for Multi-Procedure Aesthetic Consultations',
    subtitle: 'How to use Faceify Labs to plan rhinoplasty, blepharoplasty, and facial contouring in a single consultation, showing patients how combined changes interact on their unique facial anatomy.',
    description:
      'Planning combined rhinoplasty and blepharoplasty? See how AI simulation helps surgeons show patients how multiple facial procedures interact and complement each other.',
    category: 'workflow',
    categoryLabel: 'Clinical Workflow',
    readTime: 7,
    publishedDate: '2026-02-15',
    targetAudience: 'Surgeons offering combined facial procedures and full-face aesthetic consultations',
    keyStats: [
      { value: '14+', label: 'Procedures available for simulation' },
      { value: '468', label: 'Facial landmarks per simulation' },
      { value: '1 tab', label: 'Everything runs in a single browser tab' },
      { value: '2–3×', label: 'Higher value per consultation for combined cases' },
    ],
    sections: [
      {
        heading: 'The Challenge of Planning Combined Facial Procedures',
        body: `Aesthetic surgeons regularly see patients who come with concerns across multiple facial areas. The patient who wants rhinoplasty has often also wondered about their eyelids. The patient pursuing a facelift is frequently also asking about chin augmentation to restore their jaw definition. The natural facial harmony that surgeons understand intuitively (the way a change in one feature affects the visual balance of the whole face) is difficult to communicate to a patient who is thinking about procedures in isolation.\n\nThe standard approach is to address each procedure separately: discuss the nose, show a reference photo, move on to the eyes, show another reference photo. The patient mentally accumulates a list of changes without any integrated picture of how those changes will look together on their face. This leads to underplanning (patients who book one procedure and later return for another that was always part of their actual goal) or to over-commitment (patients who agree to a combined procedure package without really understanding how the changes interact).\n\nAI simulation changes the planning dynamic for multi-procedure consultations significantly.`,
      },
      {
        heading: 'Sequential Simulation: Building the Composite Outcome',
        body: `Faceify Labs supports simulation across 14 facial and body procedures within the same platform. For multi-procedure consultations, the surgeon works through the patient's priority list sequentially, building the composite outcome step by step.\n\nThe practical workflow is as follows. The surgeon opens the rhinoplasty simulator first and adjusts the parameters the patient has indicated interest in. Once the patient confirms the approximate target, the surgeon captures a screenshot of the nasal changes and opens the blepharoplasty simulator, which maps the same patient face. The eyelid parameters are then adjusted against the face that already includes the proposed rhinoplasty changes.\n\nThis sequential building process does something that verbal consultation cannot: it shows the patient how the changes interact. A patient who narrows their nose and then opens their eyelid crease sees (visually, on their own face) how these two changes work together to open and balance the midface. The chin augmentation added afterward shows how the lower face anchors the visual composition. The patient is not agreeing to a list of procedures. They are agreeing to a specific, integrated vision of their face.`,
      },
      {
        heading: 'Preventing Under-Booking and Over-Commitment',
        body: `Multi-procedure simulation prevents two costly consultation outcomes simultaneously.\n\nUnder-booking occurs when a patient agrees to one procedure when their actual aesthetic goal requires two or three. The patient returns for a second consultation three months after their rhinoplasty, having realised that the nasal change has shifted visual attention to the upper face in a way that now makes them want blepharoplasty. This is a recoverable situation but represents wasted consultation resources on both sides.\n\nOver-commitment occurs when a patient agrees to a combined procedure package without a clear visual understanding of what they are signing up for. Post-operatively, having only agreed to a verbal description, they find that one of the combined changes is not what they wanted, and the revision consultation is substantially more complex and expensive than it would have been with a clearer pre-operative agreement.\n\nSimulation-based multi-procedure planning reduces both failure modes. The patient who can see their face with all proposed changes applied is making an informed visual decision, not a verbal commitment. Disagreements about specific parameters surface during the simulation session (where they can be resolved by adjusting the simulation) rather than post-operatively, where resolution requires revision surgery.`,
      },
      {
        heading: 'The Staging Conversation: Simultaneous vs. Sequential Procedures',
        body: `Multi-procedure simulation also enables a more sophisticated staging conversation. When a patient wants rhinoplasty and blepharoplasty, there are clinical reasons to consider staging (performing the procedures in separate sessions) versus combining them under a single anaesthetic. These reasons include anaesthesia time limits, recovery overlap, and the interaction of swelling between procedures.\n\nThe simulation allows the surgeon to show the patient both scenarios. "Here is what the combined result looks like. Here is what your face looks like after just the rhinoplasty, which would be our first stage." The patient can see the intermediate state (after stage one but before stage two) and understand the visual journey. This makes the staging recommendation feel clinically reasoned rather than arbitrary, because the patient can see what they are agreeing to at each stage.\n\nFor the surgeon, this is also a practice management advantage: a patient who has seen and agreed to the two-stage outcome is a patient with two scheduled procedures, both clearly defined, both with documented aesthetic targets. The lifetime value of that patient relationship is substantially higher than a single-procedure booking.`,
      },
      {
        heading: 'Facial Harmony: Using the Simulation to Explain Proportion',
        body: `One of the most clinically valuable uses of multi-procedure simulation is teaching patients about facial proportion and harmony: the principle that each facial feature exists in visual relationship with every other feature, and that changing one changes the perceived dimensions of the rest.\n\nA patient who wants only rhinoplasty may not realise that their current chin projection is creating a visual imbalance that the nasal change will make more apparent. The surgeon who recognises this clinically can show the patient, in the simulation, what the rhinoplasty looks like with their current chin, and then add a chin augmentation parameter to show how the two changes together produce a more harmonious result.\n\nThis is not upselling. It is clinical education conducted with a visual aid. The patient who understands why chin augmentation complements their rhinoplasty (because they can see it on their own face) makes a better-informed decision about whether to add it to their plan than the patient who is told about it verbally and must form a mental image without reference.\n\nFaceify Labs' multi-procedure simulation capability makes this kind of proportion conversation not just possible but natural. The platform becomes the shared visual language through which the surgeon teaches and the patient decides.`,
      },
    ],
    relatedProcedures: ['rhinoplasty', 'blepharoplasty', 'chin-augmentation', 'facelift', 'facial-contouring'],
    relatedUseCases: ['rhinoplasty-practice-workflow', 'increase-consultation-conversion'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helper functions
// ─────────────────────────────────────────────────────────────────────────────

export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return USE_CASES.find((uc) => uc.slug === slug);
}

export function getUseCasesByCategory(category: UseCase['category']): UseCase[] {
  return USE_CASES.filter((uc) => uc.category === category);
}
