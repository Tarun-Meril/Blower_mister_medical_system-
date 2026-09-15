import React from 'react';
import { Layers, CheckCircle2, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const PrototypeStatusSection: React.FC = () => {
  const stages = [
    {
      step: '01',
      name: 'Concept & Architecture',
      status: 'Completed',
      desc: 'System architecture definition, dual-channel pneumatic/hydraulic separation, 5-button handpiece mapping, and safety matrix formulation.',
    },
    {
      step: '02',
      name: 'Engineering Prototype',
      status: 'Current Active Phase',
      desc: 'Mobile cart integration, self-contained CO₂ cylinder coupling, precision pump driver closed-loop firmware, and interactive simulation validation.',
    },
    {
      step: '03',
      name: 'Engineering Verification',
      status: 'Upcoming Phase',
      desc: 'Formal benchtop testing, pressure limits verification (≤60 psi), continuous flow stability, particulate filtration validation, and failsafe test suites.',
    },
    {
      step: '04',
      name: 'Design Validation & Usability',
      status: 'Scheduled',
      desc: 'Surgical human factors engineering (IEC 62366), simulated sterile field evaluations, ergonomics assessment of 5-button handpiece.',
    },
    {
      step: '05',
      name: 'Commercial Product Release',
      status: 'Pending Regulatory Review',
      desc: 'Medical device manufacturing transfer, technical documentation compilation, and regulatory clearance for surgical use.',
    },
  ];

  return (
    <section id="prototype-status" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-[10px] font-mono font-medium uppercase tracking-[0.25em] bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 mb-4">
          Development Stage-Gate
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-[#F8FAFC] tracking-tight uppercase">
          Engineering Prototype Status
        </h2>
        <p className="mt-3 text-sm sm:text-base font-serif italic text-[#38BDF8]">
          Transparent stage-gate progression for medical device R&D.
        </p>
        <p className="mt-2 text-xs sm:text-sm text-[#F8FAFC]/70 max-w-2xl mx-auto font-light leading-relaxed">
          The Programmable Blower/Mister platform is currently operating in the active Engineering Prototype phase.
        </p>
      </div>

      {/* Stage-Gate Visual Progress Ribbon */}
      <div className="bg-[#0E1726] rounded-sm border border-[#F8FAFC]/10 p-6 sm:p-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {stages.map((stage, idx) => {
            const isCompleted = stage.status === 'Completed';
            const isCurrent = stage.status === 'Current Active Phase';
            return (
              <div
                key={stage.step}
                className={`p-5 rounded-sm border flex flex-col justify-between transition-all relative ${
                  isCurrent
                    ? 'bg-[#1A2B42] border-[#38BDF8] shadow-xl shadow-[#38BDF8]/15 ring-1 ring-[#38BDF8]'
                    : isCompleted
                    ? 'bg-[#142032] border-[#F8FAFC]/15'
                    : 'bg-[#101010]/60 border-[#F8FAFC]/5 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-medium text-[#F8FAFC]/50">{stage.step}</span>
                    <span
                      className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-sm font-medium tracking-wider ${
                        isCurrent
                          ? 'bg-[#38BDF8] text-[#0A111A] font-semibold'
                          : isCompleted
                          ? 'bg-[#1A2B42] text-[#38BDF8] border border-[#38BDF8]/30'
                          : 'bg-[#1E2F46] text-[#F8FAFC]/40 border border-[#F8FAFC]/5'
                      }`}
                    >
                      {stage.status}
                    </span>
                  </div>

                  <h3 className={`text-sm font-serif font-medium ${isCurrent ? 'text-[#F8FAFC]' : 'text-[#F8FAFC]/90'}`}>
                    {stage.name}
                  </h3>
                  <p className="text-xs text-[#F8FAFC]/60 mt-2 leading-relaxed font-light">{stage.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F8FAFC]/10 flex items-center gap-1.5 text-[11px] font-mono">
                  {isCurrent ? (
                    <span className="text-[#38BDF8] font-medium uppercase tracking-wider">● Active Working Stage</span>
                  ) : isCompleted ? (
                    <span className="text-[#38BDF8] font-medium flex items-center gap-1 uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Stage Complete
                    </span>
                  ) : (
                    <span className="text-[#F8FAFC]/40 flex items-center gap-1 uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5" /> Phase Gated
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
