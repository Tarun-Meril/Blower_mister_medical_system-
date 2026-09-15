import React, { useState } from 'react';
import { useSystemSimulation } from '../../context/SystemSimulationContext';
import { CONTROLLER_MODULES } from '../../data/initialData';
import { Cpu, ShieldCheck, Activity, Zap, Radio, Power, Eye, CheckCircle2 } from 'lucide-react';

export const ControllerSection: React.FC = () => {
  const { isSimulating, telemetry, activeProfile } = useSystemSimulation();
  const [activeModuleId, setActiveModuleId] = useState<string>('electronic-controller');

  const selectedModule = CONTROLLER_MODULES.find((m) => m.id === activeModuleId) || CONTROLLER_MODULES[0];

  return (
    <section id="controller-architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-[10px] font-mono font-medium uppercase tracking-[0.25em] bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 mb-4">
          Central Management Hardware
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-[#F8FAFC] tracking-tight uppercase">
          The Electronic Controller
        </h2>
        <p className="mt-3 text-base sm:text-lg font-serif italic text-[#38BDF8]">
          Centralized gas and fluid regulation with embedded intelligence.
        </p>
        <p className="mt-2 text-xs sm:text-sm text-[#94A3B8] max-w-2xl mx-auto font-light leading-relaxed">
          The controller receives single-touch profile commands from the five-button surgical handpiece and
          executes real-time closed-loop pump control, sensor sampling, and continuous safety monitoring.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Controller Hardware Component Selector Grid */}
        <div className="lg:col-span-7 bg-[#0E1726] rounded-sm border border-[#1E2F46] p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1E2F46]">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#94A3B8] flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" /> Internal Modules & Circuitry (11 Subsystems)
            </span>
            <span className="text-[10px] font-mono text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-0.5 rounded-sm border border-[#38BDF8]/25 uppercase tracking-wider">
              Closed-Loop Status: {isSimulating ? 'Active' : 'Standby'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {CONTROLLER_MODULES.map((mod) => {
              const isSelected = mod.id === activeModuleId;
              let channelColor = 'text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/25';
              if (mod.channel === 'Saline Path') channelColor = 'text-[#7DD3FC] bg-[#142032] border-[#7DD3FC]/20';
              if (mod.channel === 'Central Management') channelColor = 'text-[#38BDF8] bg-[#142032] border-[#38BDF8]/20';

              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModuleId(mod.id)}
                  className={`text-left p-3 rounded-sm border transition-all duration-150 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#1A2B42] border-[#38BDF8] ring-1 ring-[#38BDF8] shadow-md shadow-[#38BDF8]/15'
                      : 'bg-[#142032] border-[#1E2F46] hover:bg-[#1A2B42] hover:border-[#38BDF8]/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-serif font-medium text-[#F8FAFC] leading-tight">{mod.name}</h4>
                    <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-sm border uppercase shrink-0 ${channelColor}`}>
                      {mod.channel}
                    </span>
                  </div>
                  <div className="mt-2 text-[10px] text-[#64748B] font-mono flex items-center justify-between">
                    <span>{mod.type}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Selected Module Deep Dive + Live Diagnostic Block */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#0E1726] rounded-sm border border-[#38BDF8]/30 p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-[#38BDF8] font-semibold uppercase tracking-[0.2em]">
                {selectedModule.type}
              </span>
              <span className="text-[9px] font-mono text-[#94A3B8] bg-[#142032] px-2 py-0.5 rounded-sm border border-[#1E2F46]">
                Subassembly Spec: {selectedModule.specs}
              </span>
            </div>

            <h3 className="text-lg font-serif font-medium text-[#F8FAFC]">{selectedModule.name}</h3>
            <p className="text-xs text-[#94A3B8] mt-2.5 leading-relaxed font-light">{selectedModule.description}</p>

            {/* Simulated Live Hardware Diagnostic State */}
            <div className="mt-6 pt-4 border-t border-[#1E2F46]">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#94A3B8] mb-3 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#38BDF8]" /> Real-Time Module Telemetry (Simulation)
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs bg-[#142032] p-2.5 rounded-sm border border-[#1E2F46]">
                  <span className="text-[#94A3B8] text-[11px]">Pneumatic Line Pressure:</span>
                  <span className="font-mono font-medium text-[#38BDF8] text-xs">{telemetry.co2PressurePsi} psi</span>
                </div>
                <div className="flex items-center justify-between text-xs bg-[#142032] p-2.5 rounded-sm border border-[#1E2F46]">
                  <span className="text-[#94A3B8] text-[11px]">Gas Pump Closed-Loop:</span>
                  <span className="font-mono font-medium text-[#38BDF8] text-xs">{telemetry.gasPumpRpm} RPM (PID Δ {telemetry.pidGasAdjustmentPct}%)</span>
                </div>
                <div className="flex items-center justify-between text-xs bg-[#142032] p-2.5 rounded-sm border border-[#1E2F46]">
                  <span className="text-[#94A3B8] text-[11px]">Fluid Metering Pump:</span>
                  <span className="font-mono font-medium text-[#7DD3FC] text-xs">{telemetry.fluidPumpRpm} RPM (PID Δ {telemetry.pidFluidAdjustmentPct}%)</span>
                </div>
                <div className="flex items-center justify-between text-xs bg-[#142032] p-2.5 rounded-sm border border-[#1E2F46]">
                  <span className="text-[#94A3B8] text-[11px]">Safety Interlock Supervisor:</span>
                  <span className="font-mono font-medium text-[#38BDF8] flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8]" /> 100Hz Watchdog Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Handpiece Profile Sync Card */}
          <div className="bg-[#0E1726] border border-[#1E2F46] rounded-sm p-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">Handpiece Selection Link</div>
              <div className="text-xs font-serif font-medium text-[#F8FAFC] mt-0.5">
                Decoded Program: {activeProfile.name} ({activeProfile.tagline})
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-[#38BDF8] bg-[#38BDF8]/10 px-2.5 py-1 rounded-sm border border-[#38BDF8]/30">
              0{activeProfile.id}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
