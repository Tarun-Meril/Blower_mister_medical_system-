import React from 'react';
import { Gauge, Sparkles, Cylinder, Droplets, Cpu, ShieldCheck, Check, AlertCircle } from 'lucide-react';

export const SpecificationsSection: React.FC = () => {
  const verifiedSpecs = [
    {
      category: 'Pneumatic System (CO₂)',
      icon: Cylinder,
      items: [
        { label: 'Maximum Inlet Gas Pressure', value: '60 psi (414 kPa)', verified: true, note: 'Explicit document boundary' },
        { label: 'Gas Source Architecture', value: 'Internal CO₂ cylinder (Integrated self-contained)', verified: true, note: 'Zero external OR pipeline requirement' },
        { label: 'Pressure Monitoring', value: 'Direct Cylinder Gauge + Inline Sensor', verified: true, note: 'Dual analog/digital inspection' },
        { label: 'Filtration Stage', value: 'Pre-pump inline gas filter', verified: true, note: 'Hydrophobic bio-retentive filter' },
        { label: 'Gas Regulation Range', value: 'Under Engineering Definition', verified: false, note: 'Established in verification testing' },
      ],
    },
    {
      category: 'Hydraulic System (Saline)',
      icon: Droplets,
      items: [
        { label: 'Fluid Source Capacity', value: 'Primary Pouch + Optional Second Pouch', verified: true, note: 'Plurality configuration supported' },
        { label: 'Fluid Power Module', value: 'Dedicated internal fluid pump', verified: true, note: 'Independent volumetric displacement' },
        { label: 'Fluid Sensing Modality', value: 'Fluid Sensor (Flow / Pressure)', verified: true, note: 'Neutral telemetry abstraction' },
        { label: 'Fluid Delivery Routing', value: 'Separate sterile conduit to distal tip', verified: true, note: 'Prevents premature mixing' },
        { label: 'Fluid Metering Range', value: 'Under Engineering Definition', verified: false, note: 'Subject to risk management' },
      ],
    },
    {
      category: 'Atomization & Handpiece',
      icon: Sparkles,
      items: [
        { label: 'Initial Mist Flow Rate', value: 'Approximately 3–5 L/min', verified: true, note: 'Initial rate, variable per surgical need' },
        { label: 'Atomization Mechanism', value: 'CO₂ aerodynamic kinetic droplet shear', verified: true, note: 'Distal internal mixing chamber' },
        { label: 'Handpiece Control Interface', value: 'Five (5) dedicated Pushbuttons', verified: true, note: 'Direct profile selection' },
        { label: 'Pre-programmed Profiles', value: 'Five (5) distinct delivery programs', verified: true, note: 'Unique gas/fluid combination per button' },
        { label: 'Droplet Size Distribution', value: 'Under Engineering Definition', verified: false, note: 'Subject to laser diffraction validation' },
      ],
    },
    {
      category: 'Electronics & Safety Management',
      icon: Cpu,
      items: [
        { label: 'Control Architecture', value: 'Central electronic controller unit', verified: true, note: 'Independent gas & fluid pump drivers' },
        { label: 'Closed-Loop Regulation', value: 'Gas pressure & fluid feedback loops', verified: true, note: 'Dynamic load compensation' },
        { label: 'Safety Fault Supervision', value: '9 distinct abnormal condition detectors', verified: true, note: 'Automated cutoff & alarm annunciators' },
        { label: 'Physical Form Factor', value: 'Integrated wheeled mobile cart', verified: true, note: 'Cylinder + stand + console on casters' },
        { label: 'Regulatory Status', value: 'Engineering Prototype (Not for Clinical Use)', verified: true, note: 'Under development stage' },
      ],
    },
  ];

  return (
    <section id="technical-specifications" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-[10px] font-mono font-medium uppercase tracking-[0.25em] bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 mb-4">
          Engineering Parameters
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-[#F8FAFC] tracking-tight uppercase">
          Technical Specifications
        </h2>
        <p className="mt-3 text-sm sm:text-base font-serif italic text-[#38BDF8]">
          Grounded strictly in verified engineering documentation.
        </p>
        <p className="mt-2 text-xs sm:text-sm text-[#F8FAFC]/70 max-w-2xl mx-auto font-light leading-relaxed">
          Values explicitly stated in invention disclosures are reported directly; ongoing parameter development
          is designated as Under Engineering Definition.
        </p>
      </div>

      {/* Grid of Spec Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {verifiedSpecs.map((category) => {
          const IconComp = category.icon;
          return (
            <div key={category.category} className="bg-[#0E1726] rounded-sm border border-[#F8FAFC]/10 p-6 shadow-xl">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[#F8FAFC]/10">
                <div className="p-2 rounded-sm bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30">
                  <IconComp className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-mono font-medium text-[#F8FAFC] uppercase tracking-wider">{category.category}</h3>
              </div>

              <div className="space-y-2.5">
                {category.items.map((item) => (
                  <div
                    key={item.label}
                    className="p-3 bg-[#142032] rounded-sm border border-[#F8FAFC]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="text-xs font-medium text-[#F8FAFC]/90">{item.label}</div>
                      <div className="text-[11px] text-[#F8FAFC]/50 mt-0.5 font-light">{item.note}</div>
                    </div>
                    <div className="text-right sm:shrink-0">
                      <span
                        className={`text-[11px] font-mono font-medium px-2.5 py-1 rounded-sm uppercase tracking-wider ${
                          item.verified
                            ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30'
                            : 'bg-[#1E2F46] text-[#F8FAFC]/60 border border-[#F8FAFC]/15'
                        }`}
                      >
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Prototype Status Disclaimer Banner */}
      <div className="mt-8 p-4 rounded-sm bg-[#0E1726] border border-[#F8FAFC]/10 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
        <div className="text-xs text-[#F8FAFC]/60 leading-relaxed font-light">
          <strong className="text-[#F8FAFC] font-medium">Engineering Transparency Note:</strong> All specifications presented reflect the current engineering prototype architecture. Operating bounds will be formally verified through ISO 13485 design controls, engineering verification protocols, risk management (ISO 14971), and preclinical evaluation.
        </div>
      </div>
    </section>
  );
};
