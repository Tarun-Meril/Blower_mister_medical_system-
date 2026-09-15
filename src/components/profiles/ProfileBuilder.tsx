import React, { useState } from 'react';
import { useSystemSimulation } from '../../context/SystemSimulationContext';
import { DeliveryMode, MistIntensity, SystemProfile } from '../../types';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Play,
  RotateCcw,
  Sliders,
  Sparkles,
  Droplets,
  Cylinder,
  ShieldAlert,
  Gauge,
  Activity,
  CheckCircle2,
  RefreshCw,
  Eye,
} from 'lucide-react';

export const ProfileBuilder: React.FC = () => {
  const {
    profiles,
    activeProfileId,
    setActiveProfileId,
    updateProfile,
    isSimulating,
    startSimulation,
    telemetry,
    builderStage,
    setBuilderStage,
  } = useSystemSimulation();

  const currentProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];
  const [activationSimulating, setActivationSimulating] = useState<boolean>(false);
  const [saveToast, setSaveToast] = useState<boolean>(false);

  // Helper updates
  const handleGasChange = (key: keyof SystemProfile['gas'], val: any) => {
    updateProfile(currentProfile.id, {
      gas: { ...currentProfile.gas, [key]: val },
    });
  };

  const handleSalineChange = (key: keyof SystemProfile['saline'], val: any) => {
    updateProfile(currentProfile.id, {
      saline: { ...currentProfile.saline, [key]: val },
    });
  };

  const handleMistChange = (key: keyof SystemProfile['mist'], val: any) => {
    updateProfile(currentProfile.id, {
      mist: { ...currentProfile.mist, [key]: val },
    });
  };

  const handleActivateSimulationSequence = () => {
    setActivationSimulating(true);
    startSimulation();
    setTimeout(() => {
      setActivationSimulating(false);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3500);
    }, 1800);
  };

  const stages = [
    { num: 1, label: '01 SELECT', title: 'Select Profile' },
    { num: 2, label: '02 CO₂', title: 'Configure CO₂ Delivery' },
    { num: 3, label: '03 SALINE', title: 'Configure Saline Delivery' },
    { num: 4, label: '04 MIST', title: 'Define Mist Behavior' },
    { num: 5, label: '05 REVIEW', title: 'Review & Activate' },
  ];

  return (
    <section id="custom-profile-operation" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-[10px] font-mono font-medium uppercase tracking-[0.25em] bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 mb-4">
          Five-Stage Custom Profile Operation
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-[#F8FAFC] tracking-tight uppercase">
          Custom Profile Operation
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-[#F8FAFC]/70 max-w-2xl mx-auto font-light leading-relaxed">
          An interactive engineering configuration workflow demonstrating how each of the five physical
          handpiece buttons establishes independent gas and fluid operating parameters.
        </p>
        <div className="mt-2 text-[10px] font-mono text-[#F8FAFC]/40 uppercase tracking-wider">
          Proposed workflow for engineering verification & simulation demonstration
        </div>
      </div>

      {/* 5-Stage Stepper Navigation Bar */}
      <div className="bg-[#0E1726] rounded-sm border border-[#F8FAFC]/10 p-3 sm:p-4 mb-8 shadow-xl">
        <div className="grid grid-cols-5 gap-2">
          {stages.map((stage) => {
            const isActive = builderStage === stage.num;
            const isPassed = builderStage > stage.num;
            return (
              <button
                key={stage.num}
                onClick={() => setBuilderStage(stage.num)}
                className={`py-3 px-2 rounded-sm text-left transition-all duration-200 border flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#1A2B42] border-[#38BDF8] shadow-md shadow-[#38BDF8]/15 ring-1 ring-[#38BDF8]'
                    : isPassed
                    ? 'bg-[#142032] border-[#F8FAFC]/15 text-[#F8FAFC]/80 hover:bg-[#1E2F46]'
                    : 'bg-[#142032]/50 border-[#F8FAFC]/5 text-[#F8FAFC]/30 hover:bg-[#142032]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-medium uppercase tracking-wider ${isActive ? 'text-[#38BDF8]' : isPassed ? 'text-[#F8FAFC]' : 'text-[#F8FAFC]/30'}`}>
                    {stage.label}
                  </span>
                  {isPassed && <Check className="w-3 h-3 text-[#38BDF8]" />}
                </div>
                <div className={`text-xs font-serif mt-1 truncate ${isActive ? 'text-[#F8FAFC] font-medium' : 'text-[#F8FAFC]/50 font-light'}`}>
                  {stage.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Stage Canvas Card */}
      <div className="bg-[#0E1726] rounded-sm border border-[#F8FAFC]/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Stage 01: SELECT PROFILE */}
        {builderStage === 1 && (
          <div className="animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F8FAFC]/10">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#38BDF8] font-semibold tracking-[0.2em]">Stage 01 / 05</span>
                <h3 className="text-xl sm:text-2xl font-serif font-light text-[#F8FAFC] mt-1">Select Delivery Profile</h3>
                <p className="text-xs text-[#F8FAFC]/60 mt-1 font-light">
                  Choose which physical handpiece button program you wish to inspect or reconfigure.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#F8FAFC]/50 uppercase tracking-wider">Active Handpiece Mapping:</span>
                <span className="px-3 py-1 bg-[#38BDF8] text-[#0A111A] font-mono font-bold text-xs rounded-sm shadow">
                  Button 0{activeProfileId}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 my-8">
              {profiles.map((p) => {
                const isSelected = p.id === activeProfileId;
                return (
                  <div
                    key={p.id}
                    onClick={() => setActiveProfileId(p.id)}
                    className={`cursor-pointer p-4 rounded-sm border transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#1A2B42] border-[#38BDF8] ring-1 ring-[#38BDF8] shadow-xl shadow-[#38BDF8]/15'
                        : 'bg-[#142032] border-[#F8FAFC]/10 hover:border-[#38BDF8]/30 hover:bg-[#1E2F46]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-sm bg-[#1E2F46] text-[#38BDF8] border border-[#38BDF8]/20">
                          {p.code}
                        </span>
                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-sm border ${
                            p.status === 'Default'
                              ? 'bg-[#1E2F46] text-[#F8FAFC]/50 border-[#F8FAFC]/10'
                              : p.status === 'Custom'
                              ? 'bg-[#38BDF8]/15 text-[#38BDF8] border-[#38BDF8]/30'
                              : 'bg-[#1E2F46] text-[#F8FAFC]/80 border-[#F8FAFC]/20'
                          }`}
                        >
                          {p.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-serif font-medium text-[#F8FAFC]">{p.name}</h4>
                      <p className="text-xs text-[#F8FAFC]/60 mt-1 leading-snug font-light">{p.tagline}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#F8FAFC]/10 text-[10px] font-mono text-[#F8FAFC]/50 space-y-1">
                      <div className="flex justify-between">
                        <span>CO₂ Gas:</span>
                        <span className="text-[#38BDF8] font-medium">{p.gas.targetFlow} L/min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saline:</span>
                        <span className="text-[#F8FAFC]/80 font-medium">{p.saline.targetFlow} mL/min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mist:</span>
                        <span className="text-[#38BDF8] font-medium">{p.mist.intensity}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-[#F8FAFC]/10">
              <button
                onClick={() => setBuilderStage(2)}
                className="px-6 py-2.5 rounded-sm bg-[#38BDF8] hover:bg-[#7dd3fc] text-[#0A111A] font-semibold text-xs uppercase tracking-[0.15em] flex items-center gap-2 transition-colors shadow-lg shadow-[#38BDF8]/20"
              >
                Proceed to CO₂ Configuration <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Stage 02: CO2 CONFIGURATION */}
        {builderStage === 2 && (
          <div className="animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F8FAFC]/10">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#38BDF8] font-semibold tracking-[0.2em]">Stage 02 / 05</span>
                <h3 className="text-xl sm:text-2xl font-serif font-light text-[#F8FAFC] mt-1">Configure CO₂ Gas Delivery</h3>
                <p className="text-xs text-[#F8FAFC]/60 mt-1 font-light">
                  Adjust regulated gas flow, line pressure limit, and excitation mode for {currentProfile.name}.
                </p>
              </div>
              <span className="px-3 py-1 bg-[#142032] text-[#38BDF8] font-mono text-[10px] uppercase tracking-wider rounded-sm border border-[#F8FAFC]/10">
                Simulation Value / Example Configuration
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
              {/* Controls Column */}
              <div className="lg:col-span-6 space-y-5">
                {/* CO2 Flow Slider */}
                <div className="bg-[#142032] p-4 rounded-sm border border-[#F8FAFC]/10">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#F8FAFC]/80 font-medium flex items-center gap-2">
                      <Cylinder className="w-3.5 h-3.5 text-[#38BDF8]" /> Target CO₂ Flow Rate (Gas Velocity)
                    </label>
                    <span className="text-sm font-mono font-medium text-[#38BDF8]">
                      {currentProfile.gas.targetFlow.toFixed(1)} L/min
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="6.0"
                    step="0.1"
                    value={currentProfile.gas.targetFlow}
                    onChange={(e) => handleGasChange('targetFlow', parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-[#1E2F46] rounded-sm appearance-none cursor-pointer accent-[#38BDF8]"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-[#F8FAFC]/40 mt-1 uppercase tracking-wider">
                    <span>1.5 L/min (Delicate)</span>
                    <span>3.5 L/min (Nominal)</span>
                    <span>6.0 L/min (High Flow)</span>
                  </div>
                </div>

                {/* CO2 Pressure Limit Slider */}
                <div className="bg-[#142032] p-4 rounded-sm border border-[#F8FAFC]/10">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#F8FAFC]/80 font-medium flex items-center gap-2">
                      <Gauge className="w-3.5 h-3.5 text-[#38BDF8]" /> Target Gas Regulated Pressure
                    </label>
                    <span className="text-sm font-mono font-medium text-[#38BDF8]">
                      {currentProfile.gas.targetPressure.toFixed(1)} psi
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10.0"
                    max="50.0"
                    step="0.5"
                    value={currentProfile.gas.targetPressure}
                    onChange={(e) => handleGasChange('targetPressure', parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-[#1E2F46] rounded-sm appearance-none cursor-pointer accent-[#38BDF8]"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-[#F8FAFC]/40 mt-1 uppercase tracking-wider">
                    <span>10.0 psi (Low)</span>
                    <span>Max Limit: ≤ 60.0 psi (414 kPa)</span>
                  </div>
                </div>

                {/* Delivery Mode Selector */}
                <div className="bg-[#142032] p-4 rounded-sm border border-[#F8FAFC]/10">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#F8FAFC]/80 font-medium block mb-2">
                    Gas Delivery Regimen Mode
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Continuous', 'Intermittent', 'Pulsed'] as DeliveryMode[]).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => handleGasChange('mode', mode)}
                        className={`py-2 px-3 rounded-sm text-xs font-serif transition-all border ${
                          currentProfile.gas.mode === mode
                            ? 'bg-[#38BDF8] text-[#0A111A] border-[#38BDF8] font-semibold'
                            : 'bg-[#1A2B42] text-[#F8FAFC]/60 border-[#F8FAFC]/10 hover:bg-[#202020]'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Real-time Closed-Loop Flow Diagram */}
              <div className="lg:col-span-6 bg-[#142032] p-5 rounded-sm border border-[#38BDF8]/20 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#38BDF8] font-semibold mb-3 flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5" /> Gas Closed-Loop Signal Flow
                  </div>

                  <div className="space-y-2.5 font-mono text-xs">
                    <div className="p-2.5 rounded-sm bg-[#0E1726] border border-[#F8FAFC]/10 flex items-center justify-between">
                      <span className="text-[#F8FAFC]/50 text-[11px]">1. Target Setpoint:</span>
                      <span className="text-[#38BDF8] font-medium">{currentProfile.gas.targetFlow} L/min @ {currentProfile.gas.targetPressure} psi</span>
                    </div>
                    <div className="p-2.5 rounded-sm bg-[#0E1726] border border-[#F8FAFC]/10 flex items-center justify-between">
                      <span className="text-[#F8FAFC]/50 text-[11px]">2. Firmware Processor:</span>
                      <span className="text-[#F8FAFC] text-[11px]">PID Speed Computation</span>
                    </div>
                    <div className="p-2.5 rounded-sm bg-[#0E1726] border border-[#F8FAFC]/10 flex items-center justify-between">
                      <span className="text-[#F8FAFC]/50 text-[11px]">3. Gas Pump Output:</span>
                      <span className="text-[#38BDF8] font-medium">{telemetry.gasPumpRpm} RPM</span>
                    </div>
                    <div className="p-2.5 rounded-sm bg-[#0E1726] border border-[#F8FAFC]/10 flex items-center justify-between">
                      <span className="text-[#F8FAFC]/50 text-[11px]">4. Sensor Telemetry:</span>
                      <span className="text-[#F8FAFC] font-medium">{telemetry.co2PressurePsi} psi (Regulated)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-[#0E1726] rounded-sm border border-[#F8FAFC]/10 text-xs text-[#F8FAFC]/60 font-light">
                  <span className="text-[#38BDF8] font-medium">Engineering Note:</span> The controller utilizes continuous sensor feedback to compensate for line resistance and maintain stable gas delivery.
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-[#F8FAFC]/10">
              <button
                onClick={() => setBuilderStage(1)}
                className="px-5 py-2 rounded-sm bg-[#142032] hover:bg-[#1E2F46] border border-[#F8FAFC]/10 text-[#F8FAFC]/80 text-xs font-mono uppercase tracking-wider flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Profiles
              </button>
              <button
                onClick={() => setBuilderStage(3)}
                className="px-6 py-2.5 rounded-sm bg-[#38BDF8] hover:bg-[#7dd3fc] text-[#0A111A] font-semibold text-xs uppercase tracking-[0.15em] flex items-center gap-2 transition-colors shadow-lg shadow-[#38BDF8]/20"
              >
                Proceed to Saline Configuration <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Stage 03: SALINE CONFIGURATION */}
        {builderStage === 3 && (
          <div className="animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F8FAFC]/10">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#F8FAFC]/80 font-semibold tracking-[0.2em]">Stage 03 / 05</span>
                <h3 className="text-xl sm:text-2xl font-serif font-light text-[#F8FAFC] mt-1">Configure Saline Fluid Delivery</h3>
                <p className="text-xs text-[#F8FAFC]/60 mt-1 font-light">
                  Adjust fluid pump metering flow rate, activation timing, and delivery mode for {currentProfile.name}.
                </p>
              </div>
              <span className="px-3 py-1 bg-[#142032] text-[#F8FAFC]/80 font-mono text-[10px] uppercase tracking-wider rounded-sm border border-[#F8FAFC]/10">
                Hydraulic Control Module
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
              {/* Controls */}
              <div className="lg:col-span-6 space-y-5">
                {/* Fluid Flow Slider */}
                <div className="bg-[#142032] p-4 rounded-sm border border-[#F8FAFC]/10">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#F8FAFC]/80 font-medium flex items-center gap-2">
                      <Droplets className="w-3.5 h-3.5 text-[#38BDF8]" /> Target Saline Volumetric Flow
                    </label>
                    <span className="text-sm font-mono font-medium text-[#38BDF8]">
                      {currentProfile.saline.targetFlow.toFixed(1)} mL/min
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5.0"
                    max="45.0"
                    step="1.0"
                    value={currentProfile.saline.targetFlow}
                    onChange={(e) => handleSalineChange('targetFlow', parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-[#1E2F46] rounded-sm appearance-none cursor-pointer accent-[#38BDF8]"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-[#F8FAFC]/40 mt-1 uppercase tracking-wider">
                    <span>5.0 mL/min (Micro-hydration)</span>
                    <span>24.0 mL/min (Standard)</span>
                    <span>45.0 mL/min (Rinse)</span>
                  </div>
                </div>

                {/* Activation Timing / Burst Duration */}
                <div className="bg-[#142032] p-4 rounded-sm border border-[#F8FAFC]/10">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#F8FAFC]/80 font-medium flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 text-[#38BDF8]" /> Activation Timing Window
                    </label>
                    <span className="text-sm font-mono font-medium text-[#38BDF8]">
                      {currentProfile.saline.timingSec === 0 ? 'Continuous' : `${currentProfile.saline.timingSec}s Intermittent`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    step="5"
                    value={currentProfile.saline.timingSec}
                    onChange={(e) => handleSalineChange('timingSec', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-[#1E2F46] rounded-sm appearance-none cursor-pointer accent-[#38BDF8]"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-[#F8FAFC]/40 mt-1 uppercase tracking-wider">
                    <span>0s (Continuous Flow)</span>
                    <span>30s Burst</span>
                    <span>60s Window</span>
                  </div>
                </div>

                {/* Saline Delivery Mode */}
                <div className="bg-[#142032] p-4 rounded-sm border border-[#F8FAFC]/10">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#F8FAFC]/80 font-medium block mb-2">
                    Fluid Mode Selection
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Continuous', 'Intermittent', 'Pulsed'] as DeliveryMode[]).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => handleSalineChange('mode', mode)}
                        className={`py-2 px-3 rounded-sm text-xs font-serif transition-all border ${
                          currentProfile.saline.mode === mode
                            ? 'bg-[#38BDF8] text-[#0A111A] border-[#38BDF8] font-semibold'
                            : 'bg-[#1A2B42] text-[#F8FAFC]/60 border-[#F8FAFC]/10 hover:bg-[#202020]'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Saline Feedback Architecture */}
              <div className="lg:col-span-6 bg-[#142032] p-5 rounded-sm border border-[#F8FAFC]/10 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F8FAFC]/80 font-semibold mb-3 flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-[#38BDF8]" /> Saline Hydraulic Feedback Loop
                  </div>

                  <div className="space-y-2.5 font-mono text-xs">
                    <div className="p-2.5 rounded-sm bg-[#0E1726] border border-[#F8FAFC]/10 flex items-center justify-between">
                      <span className="text-[#F8FAFC]/50 text-[11px]">1. Saline Pouch Reservoir:</span>
                      <span className="text-[#F8FAFC] font-medium">Sterile Supply Engaged</span>
                    </div>
                    <div className="p-2.5 rounded-sm bg-[#0E1726] border border-[#F8FAFC]/10 flex items-center justify-between">
                      <span className="text-[#F8FAFC]/50 text-[11px]">2. Fluid Pump Drive:</span>
                      <span className="text-[#38BDF8] font-medium">{telemetry.fluidPumpRpm} RPM Metering</span>
                    </div>
                    <div className="p-2.5 rounded-sm bg-[#0E1726] border border-[#F8FAFC]/10 flex items-center justify-between">
                      <span className="text-[#F8FAFC]/50 text-[11px]">3. Fluid Sensor Feedback:</span>
                      <span className="text-[#F8FAFC] font-medium">{telemetry.salineFlowMpm} mL/min (Regulated)</span>
                    </div>
                    <div className="p-2.5 rounded-sm bg-[#0E1726] border border-[#F8FAFC]/10 flex items-center justify-between">
                      <span className="text-[#F8FAFC]/50 text-[11px]">4. Fluid Line Delivery:</span>
                      <span className="text-[#38BDF8] font-medium">{telemetry.salinePressurePsi} psi Delivery</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-[#0E1726] rounded-sm border border-[#F8FAFC]/10 text-xs text-[#F8FAFC]/60 font-light">
                  <span className="text-[#38BDF8] font-medium">Neutral Abstraction:</span> System maintains neutral telemetry abstraction supporting both fluid flow and fluid pressure sensing architectures.
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-[#F8FAFC]/10">
              <button
                onClick={() => setBuilderStage(2)}
                className="px-5 py-2 rounded-sm bg-[#142032] hover:bg-[#1E2F46] border border-[#F8FAFC]/10 text-[#F8FAFC]/80 text-xs font-mono uppercase tracking-wider flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to CO₂
              </button>
              <button
                onClick={() => setBuilderStage(4)}
                className="px-6 py-2.5 rounded-sm bg-[#38BDF8] hover:bg-[#7dd3fc] text-[#0A111A] font-semibold text-xs uppercase tracking-[0.15em] flex items-center gap-2 transition-colors shadow-lg shadow-[#38BDF8]/20"
              >
                Proceed to Mist Behavior <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Stage 04: MIST BEHAVIOR */}
        {builderStage === 4 && (
          <div className="animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F8FAFC]/10">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#38BDF8] font-semibold tracking-[0.2em]">Stage 04 / 05</span>
                <h3 className="text-xl sm:text-2xl font-serif font-light text-[#F8FAFC] mt-1">Define Mist Behavior & Atomization</h3>
                <p className="text-xs text-[#F8FAFC]/60 mt-1 font-light">
                  Tune atomization intensity and view the simulated distal nozzle droplet generation.
                </p>
              </div>
              <span className="px-3 py-1 bg-[#142032] text-[#38BDF8] font-mono text-[10px] uppercase tracking-wider rounded-sm border border-[#38BDF8]/30">
                Simulated Output — Engineering Demonstration
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
              {/* Controls */}
              <div className="lg:col-span-5 space-y-5">
                <div className="bg-[#142032] p-4 rounded-sm border border-[#F8FAFC]/10">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#F8FAFC]/80 font-medium block mb-3">
                    Mist Intensity Level
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Low', 'Medium', 'High', 'Ultra-Fine'] as MistIntensity[]).map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => handleMistChange('intensity', lvl)}
                        className={`py-2.5 px-3 rounded-sm text-xs font-serif transition-all border ${
                          currentProfile.mist.intensity === lvl
                            ? 'bg-[#38BDF8] text-[#0A111A] border-[#38BDF8] font-semibold shadow-md'
                            : 'bg-[#1A2B42] text-[#F8FAFC]/60 border-[#F8FAFC]/10 hover:bg-[#202020]'
                        }`}
                      >
                        {lvl} Intensity
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-[#142032] p-4 rounded-sm border border-[#F8FAFC]/10">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#F8FAFC]/80 font-medium flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" /> Initial Mist Flow Rate Range
                    </label>
                    <span className="text-sm font-mono font-medium text-[#38BDF8]">
                      {currentProfile.mist.estimatedFlowRateLpm.toFixed(1)} L/min
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3.0"
                    max="5.0"
                    step="0.1"
                    value={currentProfile.mist.estimatedFlowRateLpm}
                    onChange={(e) => handleMistChange('estimatedFlowRateLpm', parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-[#1E2F46] rounded-sm appearance-none cursor-pointer accent-[#38BDF8]"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-[#F8FAFC]/40 mt-1 uppercase tracking-wider">
                    <span>3.0 L/min (Baseline)</span>
                    <span>5.0 L/min (Max Initial)</span>
                  </div>
                </div>

                <div className="bg-[#142032] p-4 rounded-sm border border-[#F8FAFC]/10">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#F8FAFC]/80 font-medium block mb-2">
                    Combined Atomization Regime
                  </label>
                  <div className="text-xs text-[#F8FAFC]/60 leading-relaxed font-light">
                    CO₂ gas stream is directed to the mixing area to shear and break the saline stream into uniform micro-droplets for surgical site clearing.
                  </div>
                </div>
              </div>

              {/* Visual Mist Spray Simulator Preview */}
              <div className="lg:col-span-7 bg-[#142032] p-6 rounded-sm border border-[#38BDF8]/20 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#38BDF8] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Live Distal Atomization Jet Simulation
                  </span>
                  <span className="text-[10px] font-mono text-[#F8FAFC]/50 uppercase tracking-wider">
                    Intensity: {currentProfile.mist.intensity}
                  </span>
                </div>

                {/* Animated Graphic Canvas */}
                <div className="my-6 h-44 bg-[#0A111A] rounded-sm border border-[#F8FAFC]/10 relative flex items-center justify-start overflow-hidden px-8">
                  {/* Distal Nozzle Graphic */}
                  <div className="w-16 h-12 bg-[#1E2F46] rounded-l-sm border-r-2 border-[#38BDF8] relative z-10 flex items-center justify-center">
                    <span className="text-[9px] font-mono text-[#F8FAFC] uppercase font-medium">Nozzle</span>
                  </div>

                  {/* High Velocity Atomized Spray Cone */}
                  <div className="flex-1 h-32 relative flex items-center overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#38BDF8]/30 via-[#F8FAFC]/15 to-transparent rounded-r-full blur-sm transition-all duration-300"
                      style={{
                        width: `${Math.min(100, currentProfile.mist.estimatedFlowRateLpm * 20)}%`,
                        opacity: isSimulating ? 0.9 : 0.2,
                      }}
                    />
                    <div className="relative z-10 pl-6 space-y-1">
                      <div className="text-xs font-mono font-medium text-[#38BDF8]">
                        {isSimulating ? `Active Stream: ~${currentProfile.mist.estimatedFlowRateLpm} L/min` : 'Standby Output'}
                      </div>
                      <div className="text-[10px] text-[#F8FAFC]/60 font-light font-mono">
                        Gas: {currentProfile.gas.targetFlow} L/min • Saline: {currentProfile.saline.targetFlow} mL/min
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-[#F8FAFC]/40 font-mono uppercase tracking-wider">
                  * Visual representation only. Does not claim measured droplet size or validated clinical clearance.
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-[#F8FAFC]/10">
              <button
                onClick={() => setBuilderStage(3)}
                className="px-5 py-2 rounded-sm bg-[#142032] hover:bg-[#1E2F46] border border-[#F8FAFC]/10 text-[#F8FAFC]/80 text-xs font-mono uppercase tracking-wider flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Saline
              </button>
              <button
                onClick={() => setBuilderStage(5)}
                className="px-6 py-2.5 rounded-sm bg-[#38BDF8] hover:bg-[#7dd3fc] text-[#0A111A] font-semibold text-xs uppercase tracking-[0.15em] flex items-center gap-2 transition-colors shadow-lg shadow-[#38BDF8]/20"
              >
                Review & Activate Profile <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Stage 05: REVIEW & ACTIVATE */}
        {builderStage === 5 && (
          <div className="animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F8FAFC]/10">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#38BDF8] font-semibold tracking-[0.2em]">Stage 05 / 05</span>
                <h3 className="text-xl sm:text-2xl font-serif font-light text-[#F8FAFC] mt-1">Review & Activate Profile</h3>
                <p className="text-xs text-[#F8FAFC]/60 mt-1 font-light">
                  Confirm the programmed relationship and execute the simulated system sequence.
                </p>
              </div>
              <span className="px-3 py-1 bg-[#38BDF8]/10 text-[#38BDF8] font-mono text-[10px] uppercase tracking-wider rounded-sm border border-[#38BDF8]/30">
                Ready for Activation
              </span>
            </div>

            {/* Profile Specification Review Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
              {/* Profile Card */}
              <div className="bg-[#142032] p-5 rounded-sm border border-[#F8FAFC]/10">
                <span className="text-[9px] font-mono text-[#F8FAFC]/40 uppercase tracking-wider">Profile Identification</span>
                <h4 className="text-base font-serif font-medium text-[#F8FAFC] mt-1">{currentProfile.name}</h4>
                <div className="mt-3 inline-block px-2 py-0.5 rounded-sm bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8] font-mono text-xs">
                  Handpiece Button 0{currentProfile.id}
                </div>
                <p className="text-xs text-[#F8FAFC]/60 mt-3 font-light leading-relaxed">{currentProfile.tagline}</p>
              </div>

              {/* CO2 Specs */}
              <div className="bg-[#142032] p-5 rounded-sm border border-[#38BDF8]/20">
                <span className="text-[9px] font-mono text-[#38BDF8] uppercase tracking-wider font-semibold">CO₂ Gas Channel</span>
                <div className="mt-2 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-[#F8FAFC]/50 text-[11px]">Flow Rate:</span>
                    <span className="text-[#F8FAFC] font-medium">{currentProfile.gas.targetFlow} L/min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F8FAFC]/50 text-[11px]">Pressure:</span>
                    <span className="text-[#F8FAFC] font-medium">{currentProfile.gas.targetPressure} psi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F8FAFC]/50 text-[11px]">Mode:</span>
                    <span className="text-[#38BDF8] font-medium">{currentProfile.gas.mode}</span>
                  </div>
                </div>
              </div>

              {/* Saline Specs */}
              <div className="bg-[#142032] p-5 rounded-sm border border-[#F8FAFC]/10">
                <span className="text-[9px] font-mono text-[#F8FAFC]/80 uppercase tracking-wider font-semibold">Saline Fluid Channel</span>
                <div className="mt-2 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-[#F8FAFC]/50 text-[11px]">Flow Rate:</span>
                    <span className="text-[#F8FAFC] font-medium">{currentProfile.saline.targetFlow} mL/min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F8FAFC]/50 text-[11px]">Timing:</span>
                    <span className="text-[#F8FAFC] font-medium">{currentProfile.saline.timingSec === 0 ? 'Continuous' : `${currentProfile.saline.timingSec}s`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F8FAFC]/50 text-[11px]">Mode:</span>
                    <span className="text-[#38BDF8] font-medium">{currentProfile.saline.mode}</span>
                  </div>
                </div>
              </div>

              {/* Mist Specs */}
              <div className="bg-[#142032] p-5 rounded-sm border border-[#38BDF8]/20">
                <span className="text-[9px] font-mono text-[#38BDF8] uppercase tracking-wider font-semibold">Mist Output</span>
                <div className="mt-2 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-[#F8FAFC]/50 text-[11px]">Intensity:</span>
                    <span className="text-[#F8FAFC] font-medium">{currentProfile.mist.intensity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F8FAFC]/50 text-[11px]">Est. Flow:</span>
                    <span className="text-[#38BDF8] font-medium">{currentProfile.mist.estimatedFlowRateLpm} L/min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F8FAFC]/50 text-[11px]">Nozzle:</span>
                    <span className="text-[#F8FAFC] font-medium">Atomized Mist</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sequence Animation Box during Activation */}
            {activationSimulating && (
              <div className="my-6 p-6 rounded-sm bg-[#142032] border border-[#38BDF8] shadow-2xl flex flex-col items-center justify-center text-center animate-pulse">
                <RefreshCw className="w-6 h-6 text-[#38BDF8] animate-spin mb-3" />
                <h4 className="text-sm font-serif font-medium text-[#F8FAFC]">Transmitting Program to Controller Firmware...</h4>
                <div className="mt-2 font-mono text-[10px] text-[#38BDF8] uppercase tracking-wider flex items-center gap-2">
                  <span>PROFILE 0{currentProfile.id}</span> → <span>CONTROLLER</span> → <span>GAS + FLUID PUMPS</span> → <span>SENSOR FEEDBACK</span> → <span>MIST ATOMIZATION</span>
                </div>
              </div>
            )}

            {/* Success Toast */}
            {saveToast && (
              <div className="my-6 p-4 rounded-sm bg-[#142032] border border-[#38BDF8]/50 flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#38BDF8]" />
                  <div>
                    <h5 className="text-xs font-serif font-medium text-[#F8FAFC]">Profile Configured & Simulation Active</h5>
                    <p className="text-[11px] text-[#F8FAFC]/60 font-light">
                      Handpiece Button 0{currentProfile.id} now established in controller memory.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider font-semibold">
                  PROFILE ACTIVE — SIMULATION
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-[#F8FAFC]/10">
              <button
                onClick={() => setBuilderStage(4)}
                className="px-5 py-2 rounded-sm bg-[#142032] hover:bg-[#1E2F46] border border-[#F8FAFC]/10 text-[#F8FAFC]/80 text-xs font-mono uppercase tracking-wider flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Configuration
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setSaveToast(true);
                    setTimeout(() => setSaveToast(false), 3000);
                  }}
                  className="px-5 py-2.5 rounded-sm bg-[#142032] hover:bg-[#1E2F46] border border-[#F8FAFC]/10 text-[#F8FAFC] text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  Save Profile Configuration
                </button>
                <button
                  onClick={handleActivateSimulationSequence}
                  disabled={activationSimulating}
                  className="px-6 py-2.5 rounded-sm bg-[#38BDF8] hover:bg-[#7dd3fc] text-[#0A111A] font-semibold text-xs uppercase tracking-[0.15em] flex items-center gap-2 transition-colors shadow-lg shadow-[#38BDF8]/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{activationSimulating ? 'Activating Sequence...' : 'Activate Simulation'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
