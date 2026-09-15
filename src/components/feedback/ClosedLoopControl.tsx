import React from 'react';
import { useSystemSimulation } from '../../context/SystemSimulationContext';
import { Activity, Gauge, Zap, ArrowRight, RefreshCw, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ClosedLoopControl: React.FC = () => {
  const {
    isSimulating,
    telemetry,
    activeProfile,
    simulatedDisturbance,
    toggleDisturbance,
  } = useSystemSimulation();

  return (
    <section id="closed-loop-control" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-[10px] font-mono font-medium uppercase tracking-[0.25em] bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 mb-4">
          Closed-Loop Dynamics
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-[#F8FAFC] tracking-tight uppercase">
          Sense. Control. Adjust.
        </h2>
        <p className="mt-3 text-sm sm:text-base font-serif italic text-[#38BDF8]">
          Continuous feedback regulation for both gas and fluid delivery routes.
        </p>
        <p className="mt-2 text-xs sm:text-sm text-[#94A3B8] max-w-2xl mx-auto font-light leading-relaxed">
          The system operates using closed-loop feedback, allowing it to dynamically compensate for variations
          in downstream line conditions and maintain the surgeon's desired operating profile.
        </p>
      </div>

      {/* Main Feedback Loops Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. Gas Control Closed-Loop Card */}
        <div className="bg-[#0E1726] rounded-sm border border-[#38BDF8]/20 p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-[#1E2F46]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
              <h3 className="text-xs font-mono font-semibold text-[#F8FAFC] uppercase tracking-wider">Gas Closed-Loop Feedback</h3>
            </div>
            <span className="text-[10px] font-mono text-[#38BDF8] bg-[#38BDF8]/10 px-2.5 py-0.5 rounded-sm border border-[#38BDF8]/30 uppercase tracking-wider">
              Pneumatic Loop
            </span>
          </div>

          {/* Flow Steps Architecture */}
          <div className="my-6 space-y-2.5 font-mono text-xs">
            <div className="p-3 bg-[#142032] rounded-sm border border-[#1E2F46] flex items-center justify-between">
              <span className="text-[#94A3B8] text-[11px]">Target Profile Setpoint:</span>
              <span className="text-[#38BDF8] font-medium">{activeProfile.gas.targetPressure} psi / {activeProfile.gas.targetFlow} L/min</span>
            </div>
            <div className="flex justify-center my-0.5 text-[#38BDF8]">↓</div>
            <div className="p-3 bg-[#142032] rounded-sm border border-[#1E2F46] flex items-center justify-between">
              <span className="text-[#94A3B8] text-[11px]">Electronic Controller Drive:</span>
              <span className="text-[#F8FAFC] font-medium">PID Loop (Sampling @ 100Hz)</span>
            </div>
            <div className="flex justify-center my-0.5 text-[#38BDF8]">↓</div>
            <div className="p-3 bg-[#142032] rounded-sm border border-[#1E2F46] flex items-center justify-between">
              <span className="text-[#94A3B8] text-[11px]">Gas Pump Excitation:</span>
              <span className="text-[#38BDF8] font-medium">{telemetry.gasPumpRpm} RPM</span>
            </div>
            <div className="flex justify-center my-0.5 text-[#38BDF8]">↓</div>
            <div className="p-3 bg-[#142032] rounded-sm border border-[#1E2F46] flex items-center justify-between">
              <span className="text-[#94A3B8] text-[11px]">Pressure Sensor Telemetry:</span>
              <span className="text-[#F8FAFC] font-medium">{telemetry.co2PressurePsi} psi</span>
            </div>
            <div className="flex justify-center my-0.5 text-[#38BDF8]">
              <span className="text-[10px] text-[#38BDF8] uppercase font-mono bg-[#142032] px-2 py-0.5 rounded-sm border border-[#38BDF8]/30 tracking-wider">
                ↺ Compensating Adjustment: Δ {telemetry.pidGasAdjustmentPct}%
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1E2F46] flex items-center justify-between text-xs">
            <span className="text-[#64748B] font-mono text-[11px]">Loop Status:</span>
            <span className="text-[#38BDF8] font-medium flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" /> Locked & Compensating
            </span>
          </div>
        </div>

        {/* 2. Fluid Control Closed-Loop Card */}
        <div className="bg-[#0E1726] rounded-sm border border-[#1E2F46] p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-[#1E2F46]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#7DD3FC] animate-pulse" />
              <h3 className="text-xs font-mono font-semibold text-[#F8FAFC] uppercase tracking-wider">Fluid Closed-Loop Feedback</h3>
            </div>
            <span className="text-[10px] font-mono text-[#7DD3FC] bg-[#142032] px-2.5 py-0.5 rounded-sm border border-[#7DD3FC]/20 uppercase tracking-wider">
              Hydraulic Loop
            </span>
          </div>

          {/* Flow Steps Architecture */}
          <div className="my-6 space-y-2.5 font-mono text-xs">
            <div className="p-3 bg-[#142032] rounded-sm border border-[#1E2F46] flex items-center justify-between">
              <span className="text-[#94A3B8] text-[11px]">Target Profile Setpoint:</span>
              <span className="text-[#7DD3FC] font-medium">{activeProfile.saline.targetFlow} mL/min</span>
            </div>
            <div className="flex justify-center my-0.5 text-[#64748B]">↓</div>
            <div className="p-3 bg-[#142032] rounded-sm border border-[#1E2F46] flex items-center justify-between">
              <span className="text-[#94A3B8] text-[11px]">Electronic Controller Drive:</span>
              <span className="text-[#F8FAFC] font-medium">Volumetric Metering Algorithm</span>
            </div>
            <div className="flex justify-center my-0.5 text-[#64748B]">↓</div>
            <div className="p-3 bg-[#142032] rounded-sm border border-[#1E2F46] flex items-center justify-between">
              <span className="text-[#94A3B8] text-[11px]">Fluid Pump Excitation:</span>
              <span className="text-[#38BDF8] font-medium">{telemetry.fluidPumpRpm} RPM</span>
            </div>
            <div className="flex justify-center my-0.5 text-[#64748B]">↓</div>
            <div className="p-3 bg-[#142032] rounded-sm border border-[#1E2F46] flex items-center justify-between">
              <span className="text-[#94A3B8] text-[11px]">Fluid Sensor Feedback:</span>
              <span className="text-[#F8FAFC] font-medium">{telemetry.salineFlowMpm} mL/min (Regulated)</span>
            </div>
            <div className="flex justify-center my-0.5 text-[#64748B]">
              <span className="text-[10px] text-[#7DD3FC] uppercase font-mono bg-[#142032] px-2 py-0.5 rounded-sm border border-[#1E2F46] tracking-wider">
                ↺ Compensating Adjustment: Δ {telemetry.pidFluidAdjustmentPct}%
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1E2F46] flex items-center justify-between text-xs">
            <span className="text-[#64748B] font-mono text-[11px]">Loop Status:</span>
            <span className="text-[#38BDF8] font-medium flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" /> Locked & Compensating
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Disturbance Test Sandbox Bar */}
      <div className="mt-8 bg-[#0E1726] rounded-sm border border-[#1E2F46] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#38BDF8] font-semibold">Feedback Stress Test Simulator</span>
            <span className="text-[9px] bg-[#142032] text-[#94A3B8] px-2 py-0.5 rounded-sm font-mono uppercase tracking-wider border border-[#1E2F46]">Real-Time</span>
          </div>
          <h4 className="text-base font-serif font-medium text-[#F8FAFC] mt-1">Simulate Dynamic Line Disturbance</h4>
          <p className="text-xs text-[#94A3B8] mt-1 max-w-xl font-light leading-relaxed">
            Inject artificial pneumatic resistance or backpressure. Observe how the controller automatically
            adjusts pump drivers in real time to preserve the targeted gas velocity and fluid flow rate.
          </p>
        </div>

        <button
          onClick={toggleDisturbance}
          className={`px-5 py-2.5 rounded-sm font-mono text-xs font-medium uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 border ${
            simulatedDisturbance
              ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8] shadow-lg shadow-[#38BDF8]/20'
              : 'bg-[#142032] border-[#1E2F46] text-[#94A3B8] hover:bg-[#1A2B42] hover:text-[#F8FAFC] hover:border-[#38BDF8]/40'
          }`}
        >
          <Activity className={`w-3.5 h-3.5 ${simulatedDisturbance ? 'animate-pulse text-[#38BDF8]' : ''}`} />
          <span>{simulatedDisturbance ? 'Disturbance Active: Injected' : 'Inject Line Disturbance'}</span>
        </button>
      </div>
    </section>
  );
};
