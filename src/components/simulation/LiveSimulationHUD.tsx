import React, { useState } from 'react';
import { useSystemSimulation } from '../../context/SystemSimulationContext';
import { Activity, Play, Pause, ChevronUp, ChevronDown, Sparkles, ShieldCheck, Gauge, Droplets, Cylinder, AlertTriangle } from 'lucide-react';

export const LiveSimulationHUD: React.FC = () => {
  const {
    isSimulating,
    toggleSimulation,
    telemetry,
    activeProfile,
    activeFault,
    pressHandpieceButton,
  } = useSystemSimulation();

  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-md w-[calc(100vw-2rem)] sm:w-auto animate-in slide-in-from-bottom-3 duration-200">
      <div className="bg-[#0E1726]/98 border border-[#38BDF8]/40 rounded-sm p-3 sm:p-4 shadow-2xl backdrop-blur-xl ring-1 ring-[#1E2F46]">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              {isSimulating && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75" />
              )}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isSimulating ? 'bg-[#38BDF8]' : 'bg-[#64748B]'}`} />
            </span>

            <div>
              <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#64748B]">
                System Telemetry (Simulation)
              </div>
              <div className="text-xs font-serif font-medium text-[#F8FAFC] flex items-center gap-1.5">
                <span>{activeProfile.name}</span>
                <span className="text-[10px] text-[#38BDF8] font-mono">({activeProfile.code})</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSimulation}
              className={`p-1.5 rounded-sm border text-xs font-mono transition-colors ${
                isSimulating
                  ? 'bg-[#38BDF8]/20 border-[#38BDF8]/40 text-[#38BDF8]'
                  : 'bg-[#142032] border-[#1E2F46] text-[#94A3B8]'
              }`}
              title={isSimulating ? 'Pause Telemetry Loop' : 'Resume Telemetry Loop'}
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1.5 rounded-sm bg-[#142032] border border-[#1E2F46] text-[#94A3B8] hover:text-[#F8FAFC]"
              title="Expand Live Telemetry"
            >
              {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Minimized Quick Telemetry Row */}
        {!expanded && (
          <div className="mt-2.5 pt-2 border-t border-[#1E2F46] flex items-center justify-between text-[10px] font-mono text-[#94A3B8] gap-3">
            <span className="flex items-center gap-1 text-[#38BDF8]">
              <Cylinder className="w-3 h-3 text-[#38BDF8]" /> {telemetry.co2FlowLpm.toFixed(1)} L/m CO₂
            </span>
            <span className="flex items-center gap-1 text-[#7DD3FC]">
              <Droplets className="w-3 h-3 text-[#7DD3FC]" /> {telemetry.salineFlowMpm.toFixed(1)} mL/m Saline
            </span>
            <span className="flex items-center gap-1 text-[#F8FAFC] font-medium">
              <Sparkles className="w-3 h-3 text-[#38BDF8]" /> {telemetry.mistOutputLpm.toFixed(1)} L/m Mist
            </span>
          </div>
        )}

        {/* Expanded Telemetry Grid */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-[#1E2F46] space-y-2.5 animate-in fade-in duration-150">
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-[#142032] p-2 rounded-sm border border-[#1E2F46]">
                <span className="text-[9px] uppercase tracking-wider text-[#64748B] block">CO₂ Line Pressure:</span>
                <span className="font-medium text-[#38BDF8]">{telemetry.co2PressurePsi} psi</span>
              </div>
              <div className="bg-[#142032] p-2 rounded-sm border border-[#1E2F46]">
                <span className="text-[9px] uppercase tracking-wider text-[#64748B] block">Gas Pump RPM:</span>
                <span className="font-medium text-[#38BDF8]">{telemetry.gasPumpRpm} RPM</span>
              </div>
              <div className="bg-[#142032] p-2 rounded-sm border border-[#1E2F46]">
                <span className="text-[9px] uppercase tracking-wider text-[#64748B] block">Fluid Metering RPM:</span>
                <span className="font-medium text-[#7DD3FC]">{telemetry.fluidPumpRpm} RPM</span>
              </div>
              <div className="bg-[#142032] p-2 rounded-sm border border-[#1E2F46]">
                <span className="text-[9px] uppercase tracking-wider text-[#64748B] block">Safety Interlock:</span>
                <span className={`font-medium ${activeFault ? 'text-rose-400' : 'text-[#38BDF8]'}`}>
                  {telemetry.safetyStatus}
                </span>
              </div>
            </div>

            {/* Quick Profile Selectors inside HUD */}
            <div className="pt-2">
              <span className="text-[9px] font-mono text-[#64748B] uppercase tracking-wider block mb-1.5">
                Switch Profile Preset
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => pressHandpieceButton(num)}
                    className={`py-1.5 rounded-sm text-xs font-mono font-medium border transition-all ${
                      activeProfile.id === num
                        ? 'bg-[#38BDF8] text-[#0A111A] border-[#38BDF8] font-semibold'
                        : 'bg-[#142032] text-[#94A3B8] border-[#1E2F46] hover:text-white'
                    }`}
                  >
                    0{num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
