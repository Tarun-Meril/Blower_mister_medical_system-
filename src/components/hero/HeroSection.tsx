import React from 'react';
import { SystemModel3D } from '../3d/SystemModel3D';
import { useSystemSimulation } from '../../context/SystemSimulationContext';
import { ArrowRight, Activity, Sparkles, ShieldCheck, Gauge, Droplets, Cylinder, Play, Pause } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const {
    isSimulating,
    toggleSimulation,
    telemetry,
    activeProfile,
    pressHandpieceButton,
  } = useSystemSimulation();

  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#0284C7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Hero Typography & Key CTAs */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left">
          {/* Engineering Prototype Subtle Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-medium uppercase tracking-[0.25em] rounded-sm bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
              Engineering Prototype
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[#94A3B8] rounded-sm bg-[#142032] border border-[#1E2F46]">
              Medical Device Platform
            </span>
          </div>

          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#38BDF8] font-semibold mb-3">
            Programmable Blower / Mister System
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#F8FAFC] tracking-tight leading-[1.15] text-balance">
            Programmable precision for controlled surgical gas & fluid delivery.
          </h1>

          <p className="mt-6 text-sm sm:text-base text-[#94A3B8] font-light leading-relaxed max-w-xl">
            An engineering platform integrating CO₂ delivery, saline delivery, programmable operating profiles, sensor feedback, and controlled mist generation.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#custom-profile-operation"
              className="px-6 py-3.5 rounded-sm bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#0A111A] font-bold text-xs uppercase tracking-[0.2em] font-mono flex items-center gap-2 transition-all shadow-lg shadow-[#38BDF8]/20 hover:scale-[1.02]"
            >
              <span>Explore the System</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="#system-architecture"
              className="px-6 py-3.5 rounded-sm bg-[#142032] hover:bg-[#1A2B42] text-[#F1F5F9] font-medium text-xs uppercase tracking-[0.2em] border border-[#1E2F46] transition-all hover:border-[#38BDF8] hover:text-[#38BDF8]"
            >
              View Technology
            </a>
          </div>

          {/* Quick Active Handpiece Profile Switcher Ribbon */}
          <div className="mt-10 p-4 rounded-sm bg-[#0E1726] border border-[#1E2F46] shadow-2xl">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-[0.2em] flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#38BDF8]" /> Five Handpiece Operating Profiles
              </span>
              <span className="text-[9px] font-mono text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-0.5 rounded-sm border border-[#38BDF8]/30 uppercase tracking-widest">
                Active: 0{activeProfile.id}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5].map((num) => {
                const isSelected = activeProfile.id === num;
                return (
                  <button
                    key={num}
                    onClick={() => pressHandpieceButton(num)}
                    className={`py-2 px-1 rounded-sm text-xs font-mono font-semibold transition-all border ${
                      isSelected
                        ? 'bg-[#38BDF8] text-[#0A111A] border-[#38BDF8] shadow-md shadow-[#38BDF8]/20 font-bold'
                        : 'bg-[#142032] text-[#94A3B8] border-[#1E2F46] hover:bg-[#1A2B42] hover:text-[#F1F5F9] hover:border-[#38BDF8]/30'
                    }`}
                  >
                    0{num}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#1E2F46] flex items-center justify-between text-[10px] font-mono text-[#64748B]">
              <span className="truncate max-w-[220px] uppercase tracking-wider text-[#94A3B8]">{activeProfile.tagline}</span>
              <span className="text-[#38BDF8] font-semibold">~{telemetry.mistOutputLpm} L/min Mist</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D System Model Viewport */}
        <div className="lg:col-span-7 h-[500px] sm:h-[580px] lg:h-[620px] w-full">
          <SystemModel3D />
        </div>
      </div>
    </section>
  );
};
