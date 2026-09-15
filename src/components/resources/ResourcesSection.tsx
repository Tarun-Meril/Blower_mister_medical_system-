import React, { useState } from 'react';
import { FileText, Download, Eye, ExternalLink, ShieldCheck, Cpu, Layers } from 'lucide-react';

interface ResourceDoc {
  id: string;
  category: 'Technical' | 'Engineering' | 'Documentation';
  title: string;
  code: string;
  version: string;
  description: string;
  highlights: string[];
}

export const ResourcesSection: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<ResourceDoc | null>(null);

  const docs: ResourceDoc[] = [
    {
      id: 'doc-01',
      category: 'Technical',
      title: 'Dual-Channel Pneumatic & Hydraulic Architecture',
      code: 'TECH-BLW-001',
      version: 'Rev 1.0 Draft',
      description: 'Comprehensive engineering document outlining the independent CO₂ gas delivery channel and saline fluid supply path prior to distal nozzle atomization.',
      highlights: [
        'CO₂ gas supply line pressure constraints (max 60 psi / 414 kPa)',
        'Saline pouch single & dual bag manifold configurations',
        'Distal internal mixing chamber mechanical design',
      ],
    },
    {
      id: 'doc-02',
      category: 'Technical',
      title: 'Five-Button Handpiece Operational Profile Mapping',
      code: 'TECH-BLW-002',
      version: 'Rev 1.1 Draft',
      description: 'Detailed specification of the five physical control pushbuttons and their corresponding predetermined gas and fluid delivery parameters.',
      highlights: [
        'Single-touch profile switching mechanics at sterile field',
        'Profile 1 through 5 gas flow & fluid metering combinations',
        'Custom user-defined profile parameter boundaries',
      ],
    },
    {
      id: 'doc-03',
      category: 'Engineering',
      title: 'Closed-Loop Controller Firmware & Sensor Telemetry',
      code: 'ENG-BLW-003',
      version: 'Rev 0.9 Prototype',
      description: 'Technical report on the real-time closed-loop feedback algorithms regulating gas pump RPM via pressure sensors and fluid pump metering via fluid sensors.',
      highlights: [
        '100Hz closed-loop PID pump driver compensation algorithms',
        'Neutral telemetry abstraction supporting flow & pressure sensing',
        'Dynamic resistance and backpressure recovery metrics',
      ],
    },
    {
      id: 'doc-04',
      category: 'Engineering',
      title: 'Safety Interlock & Fault Detection Matrix',
      code: 'ENG-BLW-004',
      version: 'Rev 1.0 Matrix',
      description: 'Comprehensive risk management documentation detailing detection mechanisms and automated failsafe responses across 9 abnormal condition vectors.',
      highlights: [
        'Excessive pressure & flow trip thresholds and emergency cutoff',
        'Saline pouch empty / air-in-line detection signature',
        'Distal nozzle blockage purge and failsafe hold sequences',
      ],
    },
    {
      id: 'doc-05',
      category: 'Documentation',
      title: 'System Assembly & Mobile Cart Physical Layout',
      code: 'DOC-BLW-005',
      version: 'Rev 1.2 Layout',
      description: 'Physical arrangement drawing specifications for the mobile cart housing the internal CO₂ cylinder, pressure gauge, saline stand, and controller.',
      highlights: [
        'Integrated wheeled base with medical casters',
        'Internal cylinder mounting and direct pressure gauge line',
        'Controller console mount and flexible dual lumen line harness',
      ],
    },
    {
      id: 'doc-06',
      category: 'Documentation',
      title: 'Engineering R&D Demonstration Summary Sheet',
      code: 'DOC-BLW-006',
      version: 'Rev 1.0 Brief',
      description: 'Executive engineering summary sheet intended for technical review, internal development milestones, and cross-functional team presentations.',
      highlights: [
        'Advantages over conventional surgical blower/misters',
        'Stage-gate prototype verification roadmap',
        'Contact pathways for technical collaboration',
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState<'All' | 'Technical' | 'Engineering' | 'Documentation'>('All');

  const filteredDocs = activeCategory === 'All' ? docs : docs.filter((d) => d.category === activeCategory);

  return (
    <section id="resources-documentation" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-[10px] font-mono font-medium uppercase tracking-[0.25em] bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 mb-4">
          Engineering Artifacts
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-[#F8FAFC] tracking-tight uppercase">
          Technical Resources & Documentation
        </h2>
        <p className="mt-3 text-sm sm:text-base font-serif italic text-[#38BDF8]">
          Curated specifications, architecture briefs, and development whitepapers.
        </p>
        <p className="mt-2 text-xs sm:text-sm text-[#F8FAFC]/70 max-w-2xl mx-auto font-light leading-relaxed">
          Explore technical briefs synthesized directly from the system engineering disclosures and architectural schematics.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        {(['All', 'Technical', 'Engineering', 'Documentation'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-sm text-xs font-mono font-medium uppercase tracking-wider transition-all border ${
              activeCategory === cat
                ? 'bg-[#38BDF8] text-[#0A111A] border-[#38BDF8] shadow-md shadow-[#38BDF8]/20 font-semibold'
                : 'bg-[#0E1726] text-[#F8FAFC]/60 border-[#F8FAFC]/10 hover:bg-[#1A2B42] hover:text-[#F8FAFC]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-[#0E1726] rounded-sm border border-[#F8FAFC]/10 p-6 shadow-xl flex flex-col justify-between hover:border-[#38BDF8]/40 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-[#38BDF8] uppercase font-medium bg-[#38BDF8]/10 px-2 py-0.5 rounded-sm border border-[#38BDF8]/30 tracking-wider">
                  {doc.code}
                </span>
                <span className="text-[10px] font-mono text-[#F8FAFC]/40">{doc.version}</span>
              </div>

              <h3 className="text-sm sm:text-base font-serif font-medium text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors">
                {doc.title}
              </h3>
              <p className="text-xs text-[#F8FAFC]/60 mt-2 leading-relaxed font-light">{doc.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F8FAFC]/10 flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#F8FAFC]/40 uppercase tracking-wider">{doc.category} Document</span>
              <button
                onClick={() => setSelectedDoc(doc)}
                className="px-3 py-1.5 rounded-sm bg-[#142032] hover:bg-[#1E2F46] text-[#38BDF8] hover:text-[#D4B57E] font-mono text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 border border-[#38BDF8]/20 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" /> View Brief
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Document Inspector Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="bg-[#0E1726] border border-[#38BDF8]/30 rounded-sm max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#F8FAFC]/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-medium text-[#38BDF8] uppercase bg-[#38BDF8]/10 px-2 py-0.5 rounded-sm border border-[#38BDF8]/30 tracking-wider">
                    {selectedDoc.code}
                  </span>
                  <span className="text-[10px] font-mono text-[#F8FAFC]/40">{selectedDoc.version}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-medium text-[#F8FAFC] mt-2">{selectedDoc.title}</h3>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-1.5 rounded-sm text-[#F8FAFC]/50 hover:text-[#F8FAFC] hover:bg-[#1A2B42] transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="py-6 space-y-4 text-xs sm:text-sm text-[#F8FAFC]/80 font-light">
              <p className="leading-relaxed">{selectedDoc.description}</p>

              <div>
                <h4 className="text-[10px] font-mono uppercase text-[#38BDF8] font-semibold tracking-wider mb-2">
                  Key Technical Provisions & Disclosures:
                </h4>
                <ul className="space-y-2">
                  {selectedDoc.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#F8FAFC]/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-[#142032] rounded-sm border border-[#F8FAFC]/10 text-[11px] font-mono text-[#F8FAFC]/50">
                Document Classification: Controlled Engineering Disclosure • Programmable Blower/Mister Medical Prototype
              </div>
            </div>

            <div className="pt-4 border-t border-[#F8FAFC]/10 flex justify-end gap-3">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-5 py-2 rounded-sm bg-[#1E2F46] hover:bg-[#222] text-[#F8FAFC] font-medium text-xs font-mono uppercase tracking-wider border border-[#F8FAFC]/10"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
