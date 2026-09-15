import React, { useState } from 'react';
import { useSystemSimulation } from '../../context/SystemSimulationContext';
import {
  Cylinder,
  Droplets,
  Filter,
  Activity,
  Gauge,
  Cpu,
  ArrowRight,
  Sparkles,
  Zap,
  Info,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

interface StageNode {
  id: string;
  name: string;
  sub?: string;
  channel: 'gas' | 'saline' | 'converged';
  icon: any;
  value?: string;
  desc: string;
  spec: string;
}

export const CoreSystemFlow: React.FC = () => {
  const { isSimulating, telemetry, activeProfile, activeFault } = useSystemSimulation();
  const [selectedNode, setSelectedNode] = useState<StageNode | null>(null);

  const gasNodes: StageNode[] = [
    {
      id: 'gas-cyl',
      name: 'Internal CO₂ Cylinder',
      sub: 'Integrated Gas Source',
      channel: 'gas',
      icon: Cylinder,
      value: 'Regulated Source',
      desc: 'Self-contained internal CO₂ cylinder requiring no external operating room wall gas connection. Features mechanical pressure gauge monitoring line charge.',
      spec: 'Max inlet pressure ≤ 60 psi (414 kPa)',
    },
    {
      id: 'gas-tube-1',
      name: 'Gas Supply Tube',
      sub: 'Inlet Pneumatic Route',
      channel: 'gas',
      icon: ArrowRight,
      value: 'Supply Conduit',
      desc: 'Flexible pressurized conduit conducting raw CO₂ gas from the cylinder outlet directly into the controller gas inlet connector.',
      spec: 'Reinforced medical-grade tubing',
    },
    {
      id: 'gas-filter',
      name: 'Gas Filter',
      channel: 'gas',
      icon: Filter,
      value: 'Pre-Pump Filtration',
      desc: 'High-efficiency inline particulate and bio-retentive filter ensuring ultra-clean gas enters the internal pump and patient-facing stream.',
      spec: 'Hydrophobic membrane filtration',
    },
    {
      id: 'gas-pump',
      name: 'Gas Pump',
      channel: 'gas',
      icon: Zap,
      value: `${telemetry.gasPumpRpm} RPM`,
      desc: 'Electronically driven precision pump modulating gas velocity and flow rate according to the selected surgical handpiece delivery profile.',
      spec: 'Closed-loop PWM modulated driver',
    },
    {
      id: 'gas-sensor',
      name: 'Gas Pressure Sensor',
      channel: 'gas',
      icon: Gauge,
      value: `${telemetry.co2PressurePsi} psi`,
      desc: 'Inline pressure transducer providing real-time telemetry back to the electronic controller for closed-loop regulation and abnormal pressure detection.',
      spec: 'Continuous feedback loop sampling',
    },
    {
      id: 'gas-tube-2',
      name: 'Gas Delivery Tube',
      channel: 'gas',
      icon: ArrowRight,
      value: `${telemetry.co2FlowLpm.toFixed(1)} L/min`,
      desc: 'Dedicated gas delivery lumen routing regulated CO₂ gas from the controller to the surgical handpiece mixing chamber.',
      spec: 'Isolated gas delivery channel',
    },
  ];

  const salineNodes: StageNode[] = [
    {
      id: 'saline-pouch',
      name: 'Saline Pouch (1 or 2)',
      sub: 'Sterile Fluid Source',
      channel: 'saline',
      icon: Droplets,
      value: 'Primary + Alt Pouch',
      desc: 'One or more sterile saline bags positioned on the system housing or stand. Connected via separate fluid tubing to ensure continuous hydration supply.',
      spec: 'Plurality configuration supported',
    },
    {
      id: 'saline-tube-1',
      name: 'Fluid Supply Tube',
      sub: 'Inlet Hydraulic Route',
      channel: 'saline',
      icon: ArrowRight,
      value: 'Supply Conduit',
      desc: 'Sterile fluid line routing saline from the pouch spike connector to the controller fluid pump inlet port.',
      spec: 'Sterile disposable pathway',
    },
    {
      id: 'fluid-pump',
      name: 'Fluid Pump',
      channel: 'saline',
      icon: RefreshCw,
      value: `${telemetry.fluidPumpRpm} RPM`,
      desc: 'Dedicated fluid pump independently metering saline flow rate to match the selected profile requirements.',
      spec: 'Precision volumetric displacement',
    },
    {
      id: 'fluid-sensor',
      name: 'Fluid Sensor',
      sub: 'Neutral Terminology (Flow/Pressure)',
      channel: 'saline',
      icon: Activity,
      value: `${telemetry.salineFlowMpm.toFixed(1)} mL/min`,
      desc: 'Non-invasive inline sensing element measuring saline delivery conditions (neutral terminology for flow/pressure) for closed-loop pump control.',
      spec: 'Real-time telemetry feedback',
    },
    {
      id: 'saline-tube-2',
      name: 'Fluid Delivery Tube',
      channel: 'saline',
      icon: ArrowRight,
      value: `${telemetry.salinePressurePsi} psi`,
      desc: 'Dedicated fluid lumen routing saline from the controller to the handpiece mixing area without premature mixing.',
      spec: 'Isolated fluid delivery channel',
    },
  ];

  const convergedNodes: StageNode[] = [
    {
      id: 'mixing-area',
      name: 'Internal Mixing / Atomization',
      sub: 'Distal Handpiece Chamber',
      channel: 'converged',
      icon: Sparkles,
      value: 'High-Shear Breakup',
      desc: 'CO₂ gas stream and saline stream meet at the distal mixing region. High-velocity gas helps break down the saline stream into uniform micro-droplets.',
      spec: 'Kinetic droplet shear atomization',
    },
    {
      id: 'handpiece-node',
      name: 'Surgical Handpiece (5-Buttons)',
      sub: 'Ergonomic Control Node',
      channel: 'converged',
      icon: Cpu,
      value: `Button ${activeProfile.id} Active`,
      desc: 'Ergonomic surgical tool featuring five pushbuttons for instant single-touch selection between preset delivery programs.',
      spec: '5 custom programmable profiles',
    },
    {
      id: 'surgical-field',
      name: 'Surgical Field Delivery',
      sub: 'Controlled Output Stream',
      channel: 'converged',
      icon: Droplets,
      value: `${telemetry.mistOutputLpm.toFixed(1)} L/min Mist`,
      desc: 'Directs controlled gas stream and/or saline mist to the surgical site for optimal visibility, tissue hydration, and surgical field clearance.',
      spec: 'Initial mist rate ~3–5 L/min',
    },
  ];

  return (
    <section id="system-architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-[10px] font-mono font-medium uppercase tracking-[0.25em] bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 mb-4">
          Dual-Channel Architecture
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-[#F8FAFC] tracking-tight uppercase">
          Two Delivery Channels. One Unified Control System.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#94A3B8] leading-relaxed font-light">
          The system independently regulates CO₂ gas delivery and saline fluid delivery through separate,
          dedicated pneumatic and hydraulic circuits prior to controlled atomization at the surgical handpiece.
        </p>
      </div>

      {/* Interactive System Flow Chart */}
      <div className="bg-[#0E1726] rounded-sm border border-[#1E2F46] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col gap-10">
          {/* 1. CO2 Gas Channel */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse shadow-md shadow-[#38BDF8]/50" />
                <h3 className="text-xs sm:text-sm font-serif tracking-[0.15em] font-medium text-[#F8FAFC] uppercase">
                  CO₂ Gas Delivery Channel (Independent Pneumatic Route)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#38BDF8] px-2.5 py-0.5 rounded-sm bg-[#38BDF8]/10 border border-[#38BDF8]/25 uppercase tracking-wider">
                Pneumatic Path
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {gasNodes.map((node, index) => {
                const IconComponent = node.icon;
                const isSelected = selectedNode?.id === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`cursor-pointer group relative p-3.5 rounded-sm border transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#1A2B42] border-[#38BDF8] shadow-lg shadow-[#38BDF8]/15 ring-1 ring-[#38BDF8]'
                        : 'bg-[#142032] border-[#1E2F46] hover:border-[#38BDF8]/40 hover:bg-[#1A2B42]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#64748B]">0{index + 1}</span>
                        <div className={`p-1.5 rounded-sm ${isSelected ? 'bg-[#38BDF8] text-[#0A111A]' : 'bg-[#0E1726] text-[#38BDF8]'}`}>
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <h4 className="text-xs font-serif font-medium text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors leading-tight">
                        {node.name}
                      </h4>
                      <p className="text-[10px] text-[#94A3B8] mt-0.5 font-light">{node.sub}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#1E2F46] flex items-center justify-between">
                      <span className="text-[10px] font-mono font-medium text-[#38BDF8]">
                        {isSimulating ? node.value : 'Standby'}
                      </span>
                      <ArrowRight className="w-3 h-3 text-[#64748B] group-hover:text-[#38BDF8] transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Saline Channel */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#7DD3FC] animate-pulse shadow-md shadow-[#7DD3FC]/40" />
                <h3 className="text-xs sm:text-sm font-serif tracking-[0.15em] font-medium text-[#F8FAFC] uppercase">
                  Saline Fluid Delivery Channel (Independent Hydraulic Route)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#7DD3FC] px-2.5 py-0.5 rounded-sm bg-[#7DD3FC]/10 border border-[#7DD3FC]/25 uppercase tracking-wider">
                Hydraulic Path
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {salineNodes.map((node, index) => {
                const IconComponent = node.icon;
                const isSelected = selectedNode?.id === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`cursor-pointer group relative p-3.5 rounded-sm border transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#1A2B42] border-[#7DD3FC] shadow-lg shadow-[#7DD3FC]/10 ring-1 ring-[#7DD3FC]/60'
                        : 'bg-[#142032] border-[#1E2F46] hover:border-[#7DD3FC]/40 hover:bg-[#1A2B42]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#64748B]">0{index + 1}</span>
                        <div className={`p-1.5 rounded-sm ${isSelected ? 'bg-[#7DD3FC] text-[#0A111A]' : 'bg-[#0E1726] text-[#7DD3FC]'}`}>
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <h4 className="text-xs font-serif font-medium text-[#F8FAFC] group-hover:text-[#7DD3FC] transition-colors leading-tight">
                        {node.name}
                      </h4>
                      <p className="text-[10px] text-[#94A3B8] mt-0.5 font-light">{node.sub}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#1E2F46] flex items-center justify-between">
                      <span className="text-[10px] font-mono font-medium text-[#7DD3FC]">
                        {isSimulating ? node.value : 'Standby'}
                      </span>
                      <ArrowRight className="w-3 h-3 text-[#64748B] group-hover:text-[#7DD3FC] transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Convergence & Atomization at Handpiece */}
          <div className="pt-6 border-t border-[#1E2F46]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse shadow-md shadow-[#38BDF8]/50" />
                <h3 className="text-xs sm:text-sm font-serif tracking-[0.15em] font-medium text-[#F8FAFC] uppercase">
                  Distal Atomization & Surgical Handpiece Convergence
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#38BDF8] px-2.5 py-0.5 rounded-sm bg-[#38BDF8]/10 border border-[#38BDF8]/25 uppercase tracking-wider">
                Combined Stream
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {convergedNodes.map((node, index) => {
                const IconComponent = node.icon;
                const isSelected = selectedNode?.id === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`cursor-pointer group relative p-4 rounded-sm border transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#1A2B42] border-[#38BDF8] shadow-lg shadow-[#38BDF8]/15 ring-1 ring-[#38BDF8]'
                        : 'bg-[#142032] border-[#1E2F46] hover:border-[#38BDF8]/40 hover:bg-[#1A2B42]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#64748B]">Stage C-0{index + 1}</span>
                        <div className={`p-2 rounded-sm ${isSelected ? 'bg-[#38BDF8] text-[#0A111A]' : 'bg-[#0E1726] text-[#38BDF8]'}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>
                      <h4 className="text-sm font-serif font-medium text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors">
                        {node.name}
                      </h4>
                      <p className="text-xs text-[#94A3B8] mt-1 font-light">{node.sub}</p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-[#1E2F46] flex items-center justify-between">
                      <span className="text-xs font-mono font-medium text-[#38BDF8]">
                        {isSimulating ? node.value : 'Standby'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#38BDF8] transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Node Technical Inspection Drawer */}
          {selectedNode && (
            <div className="bg-[#142032] border border-[#38BDF8]/40 rounded-sm p-5 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#38BDF8]/15 text-[#38BDF8] font-semibold">
                      {selectedNode.spec}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">• Architectural Stage Details</span>
                  </div>
                  <h4 className="text-base font-serif font-medium text-[#F8FAFC] mt-1">{selectedNode.name}</h4>
                  <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed max-w-4xl font-light">{selectedNode.desc}</p>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-[#94A3B8] hover:text-[#F8FAFC] p-1 rounded-sm hover:bg-[#0E1726]"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
