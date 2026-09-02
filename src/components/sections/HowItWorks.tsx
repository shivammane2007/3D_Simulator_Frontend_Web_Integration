import { Camera, Cpu, SlidersHorizontal, MessageSquare } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: <Camera className="w-5 h-5" />,
    title: 'Capture',
    description:
      'Take a standard front-facing photo with any smartphone or iPad in the consultation room.',
  },
  {
    number: '02',
    icon: <Cpu className="w-5 h-5" />,
    title: 'Simulate',
    description:
      '468 anatomical landmarks are mapped in real time on-device with zero server round-trips.',
  },
  {
    number: '03',
    icon: <SlidersHorizontal className="w-5 h-5" />,
    title: 'Align',
    description:
      'Adjust surgical and soft-tissue parameters side-by-side to align patient expectations.',
  },
  {
    number: '04',
    icon: <MessageSquare className="w-5 h-5" />,
    title: 'Discuss',
    description:
      'Proceed with the consultation grounded in a clear visual plan agreed upon in the room.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5 relative overflow-hidden">
      <div className="container-master relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-eyebrow-master text-eyebrow-dot">
            THE 60-SECOND PROTOCOL
          </span>
          <h2 className="text-h2-section text-[#141413]">
            From photo to preview in 60 seconds.
          </h2>
          <p className="text-sm text-[#555555]">
            Four steps. One consultation. 100% browser-native inference.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-[#FCFBFA] rounded-[32px] p-7 border border-black/5 shadow-level-1 flex flex-col justify-between space-y-6 hover:shadow-level-2 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-white text-[#141413] shadow-level-1 flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="text-xs font-bold tracking-widest text-[#696969]">
                  {step.number}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium tracking-tight text-[#141413] font-display">
                  {step.title}
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
