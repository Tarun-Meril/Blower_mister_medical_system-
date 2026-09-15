import React from 'react';
import { useSystemSimulation } from '../../context/SystemSimulationContext';
import { SAFETY_FAULTS } from '../../data/initialData';
import { ShieldAlert, AlertTriangle, CheckCircle2, RotateCcw, Activity, BellRing, ShieldCheck, Power } from 'lucide-react';

export const SafetySection: React.FC = () => {
  const { activeFault, triggerFault, clearFault, telemetry } = useSystemSimulation();

  return (
    <section id="safety-architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-[10px] font-mono font-medium uppercase tracking-[0.25em] bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 mb-4">
          Safety & Fault Detection Architecture
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-[#F8FAFC] tracking-tight uppercase">
          Designed Around Continuous Monitoring
        </h2>
        <p className="mt-3 text-sm sm:text-base font-serif italic text-[#38BDF8]">
          Supervised closed-loop fault detection and automated failsafe responses.
        </p>
        <p className="mt-2 text-xs sm:text-sm text-[#F8FAFC]/70 max-w-2xl mx-auto font-light leading-relaxed">
          The controller is designed to continuously monitor gas pressure and fluid flow. When an abnormal condition is detected,
          the controller may automatically reduce or stop the corresponding pump and provide visual and audible alerts.
        </p>
      </div>

      {/* Real-Time Active Fault Annunciator Banner */}
      {activeFault ? (
        <div className="mb-10 p-5 rounded-sm bg-[#1F1212] border border-rose-500/50 shadow-2xl animate-pulse">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="p-2.5 rounded-sm bg-rose-900/60 text-rose-300 shrink-0 border border-rose-500/30">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-300">
                    [SIMULATED FAULT ACTIVE] {activeFault.severity}
                  </span>
                  <span className="text-[10px] font-mono text-rose-200 bg-rose-950/80 px-2 py-0.5 rounded-sm border border-rose-800/40">
                    Category: {activeFault.category}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-medium text-white mt-0.5">{activeFault.name}</h3>
                <p className="text-xs text-rose-200/90 mt-1 max-w-2xl font-light">
                  <strong className="font-medium text-white">Automated Failsafe:</strong> {activeFault.automatedResponse}
                </p>
              </div>
            </div>

            <button
              onClick={clearFault}
              className="px-5 py-2.5 rounded-sm bg-[#38BDF8] text-[#0A111A] hover:bg-[#D4B57E] font-medium text-xs font-mono uppercase tracking-wider flex items-center gap-2 shrink-0 transition-colors shadow-lg"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Alarm & Clear Failsafe
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-10 p-4 rounded-sm bg-[#0E1726] border border-[#F8FAFC]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
            <span className="text-xs font-mono text-[#F8FAFC]/70">
              Safety Interlock Supervisor: <strong className="text-[#38BDF8] font-semibold">NORMAL — ALL 9 FAULT CHANNELS CLEAR</strong>
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#F8FAFC]/40 hidden sm:inline uppercase tracking-wider">
            Interactive sandbox: Click any fault below to simulate failsafe trip
          </span>
        </div>
      )}

      {/* Conceptual State Machine Logic Diagram */}
      <div className="bg-[#0E1726] rounded-sm border border-[#F8FAFC]/10 p-6 mb-10 shadow-xl">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F8FAFC]/60 mb-4 flex items-center gap-2 font-medium">
          <Activity className="w-3.5 h-3.5 text-[#38BDF8]" /> Proposed Failsafe State Machine Behavior
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 bg-[#142032] rounded-sm border border-[#F8FAFC]/10 text-center">
            <span className="text-[#38BDF8] font-medium block mb-1">01. NORMAL</span>
            <span className="text-[#F8FAFC]/50 text-[10px] font-light">Continuous sampling & active profile execution</span>
          </div>
          <div className="p-3 bg-[#142032] rounded-sm border border-[#F8FAFC]/10 text-center">
            <span className="text-[#D4B57E] font-medium block mb-1">02. DETECT</span>
            <span className="text-[#F8FAFC]/50 text-[10px] font-light">Sensor limit boundary trip or CRC error</span>
          </div>
          <div className="p-3 bg-[#142032] rounded-sm border border-[#F8FAFC]/10 text-center">
            <span className="text-rose-400 font-medium block mb-1">03. REDUCE / STOP</span>
            <span className="text-[#F8FAFC]/50 text-[10px] font-light">Automated pump drive cutoff to affected route</span>
          </div>
          <div className="p-3 bg-[#142032] rounded-sm border border-[#F8FAFC]/10 text-center">
            <span className="text-[#F8FAFC] font-medium block mb-1">04. ALERT</span>
            <span className="text-[#F8FAFC]/50 text-[10px] font-light">Visual warning & audible annunciator on console</span>
          </div>
        </div>
      </div>

      {/* 9 Abnormal Conditions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SAFETY_FAULTS.map((fault) => {
          const isTriggered = activeFault?.id === fault.id;
          return (
            <div
              key={fault.id}
              className={`p-5 rounded-sm border transition-all duration-200 flex flex-col justify-between ${
                isTriggered
                  ? 'bg-[#1F1212] border-rose-500/60 shadow-xl ring-1 ring-rose-500/40'
                  : 'bg-[#0E1726] border-[#F8FAFC]/10 hover:border-[#38BDF8]/30 hover:bg-[#142032]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-sm bg-[#1E2F46] text-[#F8FAFC]/60 font-medium border border-[#F8FAFC]/10 tracking-wider">
                    {fault.category} Channel
                  </span>
                  <span
                    className={`text-[9px] font-mono uppercase font-medium px-2 py-0.5 rounded-sm tracking-wider ${
                      fault.severity === 'Failsafe Trip'
                        ? 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                        : fault.severity === 'Critical Alert'
                        ? 'bg-[#2A2012] text-[#D4B57E] border border-[#38BDF8]/30'
                        : 'bg-[#1E2F46] text-[#F8FAFC]/60 border border-[#F8FAFC]/10'
                    }`}
                  >
                    {fault.severity}
                  </span>
                </div>

                <h4 className="text-sm font-serif font-medium text-[#F8FAFC]">{fault.name}</h4>
                <p className="text-xs text-[#F8FAFC]/60 mt-2 leading-relaxed font-light">{fault.description}</p>

                <div className="mt-3 text-[11px] text-[#F8FAFC]/50 space-y-1 font-mono">
                  <div>
                    <strong className="text-[#F8FAFC]/80 font-normal">Detection:</strong> {fault.detectionMethod}
                  </div>
                  <div>
                    <strong className="text-[#F8FAFC]/80 font-normal">Response:</strong> {fault.automatedResponse}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F8FAFC]/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#F8FAFC]/40 uppercase tracking-wider">
                  {isTriggered ? 'Tripped (Active)' : 'Supervised'}
                </span>
                <button
                  onClick={() => (isTriggered ? clearFault() : triggerFault(fault.id))}
                  className={`px-3 py-1.5 rounded-sm text-[11px] font-mono font-medium transition-all uppercase tracking-wider ${
                    isTriggered
                      ? 'bg-rose-700 hover:bg-rose-600 text-white'
                      : 'bg-[#1E2F46] hover:bg-[#222] text-[#F8FAFC]/80 hover:text-white border border-[#F8FAFC]/10'
                  }`}
                >
                  {isTriggered ? 'Clear Fault' : 'Simulate Fault'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center text-xs text-[#F8FAFC]/40 italic font-serif">
        * Engineering architecture under development. Proposed safety responses are subject to verification and clinical risk management.
      </div>
    </section>
  );
};
