import React from 'react';
import { Handpiece3D } from '../3d/Handpiece3D';
import { useSystemSimulation } from '../../context/SystemSimulationContext';
import { Radio, Layers, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const HandpieceSection: React.FC = () => {
  const { profiles, activeProfileId, pressHandpieceButton } = useSystemSimulation();

  return (
    <section id="handpiece-technology" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-[10px] font-mono font-medium uppercase tracking-[0.25em] bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 mb-4">
          Surgical Interface
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-[#F8FAFC] tracking-tight uppercase">
          Five-Button Programmable Handpiece
        </h2>
        <p className="mt-3 text-sm sm:text-base font-serif italic text-[#38BDF8]">
          Single-touch surgical profile activation at the sterile field.
        </p>
        <p className="mt-2 text-xs sm:text-sm text-[#94A3B8] max-w-2xl mx-auto font-light leading-relaxed">
          A significant feature of the proposed system is the incorporation of five individual control buttons on the surgical handpiece.
          Each button corresponds to a unique predetermined delivery program, eliminating the need to manually adjust separate gas and fluid controls.
        </p>
      </div>

      {/* Grid: 3D Handpiece Interactive Viewport + Button Mapping Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: 3D Handpiece Viewer */}
        <div className="lg:col-span-7 h-[460px] sm:h-[500px]">
          <Handpiece3D />
        </div>

        {/* Right Side: 5-Button Mapping Matrix */}
        <div className="lg:col-span-5 bg-[#0E1726] rounded-sm border border-[#1E2F46] p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1E2F46]">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#94A3B8] flex items-center gap-1.5 font-medium">
                <Radio className="w-3.5 h-3.5 text-[#38BDF8]" /> Handpiece Button Mapping Matrix
              </span>
              <span className="text-[10px] font-mono text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-0.5 rounded-sm border border-[#38BDF8]/30 uppercase tracking-wider">
                5 Pushbuttons
              </span>
            </div>

            <div className="space-y-2.5">
              {profiles.map((p) => {
                const isCurrent = p.id === activeProfileId;
                return (
                  <div
                    key={p.id}
                    onClick={() => pressHandpieceButton(p.id)}
                    className={`cursor-pointer p-3 rounded-sm border transition-all duration-150 flex items-center justify-between ${
                      isCurrent
                        ? 'bg-[#1A2B42] border-[#38BDF8] ring-1 ring-[#38BDF8] shadow-md shadow-[#38BDF8]/15'
                        : 'bg-[#142032] border-[#1E2F46] hover:bg-[#1A2B42] hover:border-[#38BDF8]/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-sm font-mono font-medium text-xs flex items-center justify-center border ${
                          isCurrent ? 'bg-[#38BDF8] text-[#0A111A] border-[#38BDF8]' : 'bg-[#0E1726] text-[#94A3B8] border-[#1E2F46]'
                        }`}
                      >
                        0{p.id}
                      </div>
                      <div>
                        <h4 className="text-xs font-serif font-medium text-[#F8FAFC]">{p.name}</h4>
                        <p className="text-[11px] text-[#94A3B8] font-light">{p.tagline}</p>
                      </div>
                    </div>

                    <div className="text-right font-mono text-[10px] space-y-0.5">
                      <div className="text-[#38BDF8] font-medium">{p.gas.targetFlow} L/min CO₂</div>
                      <div className="text-[#7DD3FC] font-medium">{p.saline.targetFlow} mL/min Saline</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1E2F46] text-xs text-[#94A3B8] font-light">
            <span className="text-[#38BDF8] font-medium font-mono">Workflow Advantage:</span> The surgeon does not need to pause or touch the main cart console during the procedure; single button clicks instantly switch the gas/fluid profile.
          </div>
        </div>
      </div>
    </section>
  );
};
