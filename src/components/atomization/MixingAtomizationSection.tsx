import React from 'react';
import { useSystemSimulation } from '../../context/SystemSimulationContext';
import { Sparkles, Droplets, Cylinder, ArrowRight, Activity, Info } from 'lucide-react';

export const MixingAtomizationSection: React.FC = () => {
  const { isSimulating, telemetry, activeProfile } = useSystemSimulation();

  return (
    <section id="mixing-atomization" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-[10px] font-mono font-medium uppercase tracking-[0.25em] bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 mb-4">
          Fluid Atomization Dynamics
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-[#F8FAFC] tracking-tight uppercase">
          From Two Streams To One Controlled Output
        </h2>
        <p className="mt-3 text-sm sm:text-base font-serif italic text-[#38BDF8]">
          Independent gas and fluid channels converge at the distal handpiece nozzle.
        </p>
        <p className="mt-2 text-xs sm:text-sm text-[#F8FAFC]/70 max-w-2xl mx-auto font-light leading-relaxed">
          The CO₂ gas stream and saline stream are directed to the mixing/atomization area at the distal end of the handpiece.
          The nozzle is designed in such a way that CO₂ gas assists in breaking down the saline stream into smaller droplets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Animated High-Precision Convergence Schematic */}
        <div className="lg:col-span-7 bg-[#0E1726] rounded-sm border border-[#F8FAFC]/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#F8FAFC]/10">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F8FAFC]/60 font-medium">
              Distal Mixing & Atomization Region (Cross-Section)
            </span>
            <span className="text-[10px] font-mono text-[#38BDF8] bg-[#38BDF8]/10 px-2.5 py-0.5 rounded-sm border border-[#38BDF8]/30 uppercase tracking-wider">
              Initial Range: ~3–5 L/min
            </span>
          </div>

          {/* Interactive Convergence Graphic */}
          <div className="relative py-8 flex flex-col items-center justify-center">
            {/* Stream 1: CO2 Gas Stream */}
            <div className="w-full flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5 bg-[#1A2B42] px-3 py-1.5 rounded-sm border border-[#38BDF8]/30">
                <Cylinder className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span className="text-xs font-mono font-medium text-[#38BDF8]">
                  CO₂ Gas Stream ({telemetry.co2FlowLpm.toFixed(1)} L/min)
                </span>
              </div>
              <div className="flex-1 mx-4 h-0.5 bg-gradient-to-r from-[#38BDF8] to-[#F8FAFC] rounded-full relative overflow-hidden">
                {isSimulating && (
                  <div className="absolute inset-0 bg-[#38BDF8]/60 animate-pulse" />
                )}
              </div>
              <span className="text-[11px] font-mono text-[#F8FAFC]/40 uppercase tracking-wider">High Velocity Gas Ingress</span>
            </div>

            {/* Stream 2: Saline Liquid Stream */}
            <div className="w-full flex items-center justify-between mb-8">
              <div className="flex items-center gap-2.5 bg-[#1A2B42] px-3 py-1.5 rounded-sm border border-[#F8FAFC]/20">
                <Droplets className="w-3.5 h-3.5 text-[#F8FAFC]" />
                <span className="text-xs font-mono font-medium text-[#F8FAFC]/90">
                  Saline Stream ({telemetry.salineFlowMpm.toFixed(1)} mL/min)
                </span>
              </div>
              <div className="flex-1 mx-4 h-0.5 bg-gradient-to-r from-[#F8FAFC]/60 to-[#38BDF8] rounded-full relative overflow-hidden">
                {isSimulating && (
                  <div className="absolute inset-0 bg-white/40 animate-pulse" />
                )}
              </div>
              <span className="text-[11px] font-mono text-[#F8FAFC]/40 uppercase tracking-wider">Sterile Liquid Ingress</span>
            </div>

            {/* Convergence Chamber + Distal Atomization Jet */}
            <div className="w-full bg-[#142032] rounded-sm border border-[#38BDF8]/40 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-sm bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-medium text-[#F8FAFC]">Kinetic Shear Atomization</h4>
                  <p className="text-xs text-[#F8FAFC]/60 mt-0.5 font-light">
                    CO₂ expansion delivers aerodynamic shear, fragmenting saline into uniform fine mist.
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-[9px] font-mono text-[#F8FAFC]/50 uppercase tracking-wider">Mist Delivery Telemetry</div>
                <div className="text-base font-mono font-medium text-[#38BDF8]">
                  {telemetry.mistOutputLpm.toFixed(2)} L/min
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F8FAFC]/10 text-[11px] text-[#F8FAFC]/40 font-mono italic">
            * Initial mist flow rate baseline is approximately 3–5 L/min, configurable according to procedural requirement.
          </div>
        </div>

        {/* Right Side: Engineering Principles & Key Characteristics */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0E1726] rounded-sm border border-[#F8FAFC]/10 p-6 shadow-xl">
            <h3 className="text-sm font-serif font-medium text-[#F8FAFC] mb-2 uppercase tracking-wide">Atomization Engineering Mechanism</h3>
            <p className="text-xs text-[#F8FAFC]/70 leading-relaxed font-light">
              Unlike single-channel sprayers, the Programmable Blower/Mister isolates fluid and gas until the final nozzle interface.
              This guarantees zero dead-volume leakage and instant response upon surgeon pushbutton command.
            </p>

            <div className="mt-4 space-y-2.5">
              <div className="p-3 bg-[#142032] rounded-sm border border-[#F8FAFC]/10 text-xs text-[#F8FAFC]/80 flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] mt-1.5 shrink-0" />
                <span><strong className="text-[#F8FAFC] font-medium">Nozzle Design:</strong> Distal geometry harnesses CO₂ pneumatic kinetic energy for droplet subdivision.</span>
              </div>
              <div className="p-3 bg-[#142032] rounded-sm border border-[#F8FAFC]/10 text-xs text-[#F8FAFC]/80 flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F8FAFC]/60 mt-1.5 shrink-0" />
                <span><strong className="text-[#F8FAFC] font-medium">Tissue Hydration:</strong> Controlled misting prevents surgical site desiccation while clearing pooled fluid.</span>
              </div>
              <div className="p-3 bg-[#142032] rounded-sm border border-[#F8FAFC]/10 text-xs text-[#F8FAFC]/80 flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] mt-1.5 shrink-0" />
                <span><strong className="text-[#F8FAFC] font-medium">Programmable Mist Rate:</strong> Adjusted automatically based on active button profile selection.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
