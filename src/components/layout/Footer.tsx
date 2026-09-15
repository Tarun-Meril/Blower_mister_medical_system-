import React from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import logoImg from '../../assets/images/logo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A111A] border-t border-[#1E2F46] pt-16 pb-24 text-[#94A3B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1E2F46]">
          {/* Column 1: Brand & Regulatory Status */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Medical System Logo"
                className="h-8 sm:h-9 w-auto object-contain max-w-[150px]"
              />
              <div className="border-l border-[#1E2F46] pl-3">
                <span className="text-xs sm:text-sm font-serif tracking-[0.18em] uppercase font-medium text-[#F8FAFC]">
                  PROGRAMMABLE BLOWER/MISTER
                </span>
                <div className="text-[8.5px] font-mono text-[#38BDF8] tracking-[0.2em] uppercase mt-0.5">
                  SURGICAL ENGINEERING PLATFORM
                </div>
              </div>
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm font-light">
              An advanced medical-device engineering platform integrating CO₂ gas delivery, saline fluid delivery,
              programmable operating profiles, closed-loop sensor feedback, and controlled mist generation.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#142032] border border-[#1E2F46] text-[10px] font-mono uppercase tracking-wider text-[#38BDF8]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Status: Active Engineering Prototype</span>
            </div>
          </div>

          {/* Column 2: System Architecture */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#38BDF8] font-semibold">Architecture</h4>
            <ul className="space-y-2 text-xs font-light">
              <li><a href="#3d-system-viewport" className="hover:text-[#38BDF8] transition-colors">3D System Assembly</a></li>
              <li><a href="#system-architecture" className="hover:text-[#38BDF8] transition-colors">Dual Delivery Channels</a></li>
              <li><a href="#controller-architecture" className="hover:text-[#38BDF8] transition-colors">Controller Hardware</a></li>
              <li><a href="#handpiece-technology" className="hover:text-[#38BDF8] transition-colors">Five-Button Handpiece</a></li>
              <li><a href="#mixing-atomization" className="hover:text-[#38BDF8] transition-colors">Distal Atomization Nozzle</a></li>
            </ul>
          </div>

          {/* Column 3: Verification & Governance */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#38BDF8] font-semibold">Engineering & Safety</h4>
            <ul className="space-y-2 text-xs font-light">
              <li><a href="#custom-profile-operation" className="hover:text-[#38BDF8] transition-colors">Custom Profile Operation</a></li>
              <li><a href="#closed-loop-control" className="hover:text-[#38BDF8] transition-colors">Closed-Loop PID Regulation</a></li>
              <li><a href="#safety-architecture" className="hover:text-[#38BDF8] transition-colors">9 Abnormal Fault Detectors</a></li>
              <li><a href="#technical-specifications" className="hover:text-[#38BDF8] transition-colors">Technical Specification Tables</a></li>
              <li><a href="#resources-documentation" className="hover:text-[#38BDF8] transition-colors">Technical Artifacts & Briefs</a></li>
            </ul>
          </div>
        </div>

        {/* Prototype Legal Disclaimer Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#38BDF8]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="tracking-wider uppercase text-[10px]">Engineering Prototype — Not for Clinical Use</span>
          </div>

          <div className="text-[#64748B] text-[10px] uppercase tracking-wider">
            © 2026 Programmable Blower/Mister Engineering Platform. Subject to V&V Standards.
          </div>
        </div>
      </div>
    </footer>
  );
};
