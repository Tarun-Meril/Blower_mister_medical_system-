import React, { useState, useRef } from 'react';
import { useSystemSimulation } from '../../context/SystemSimulationContext';
import { SYSTEM_HOTSPOTS } from '../../data/initialData';
import { HotspotInfo } from '../../types';
import consoleImage from '../../assets/images/surgical_console_system_1787304581710.jpg';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Layers,
  Sparkles,
  Info,
  Activity,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sliders,
  Cylinder,
  Gauge,
  Droplets,
  Radio,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  X,
} from 'lucide-react';

export const SystemModel3D: React.FC = () => {
  const {
    isSimulating,
    activeProfile,
    selectedHotspot,
    setSelectedHotspot,
    telemetry,
    pressHandpieceButton,
  } = useSystemSimulation();

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [showSubassemblyMenu, setShowSubassemblyMenu] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hoveredHotspot, setHoveredHotspot] = useState<HotspotInfo | null>(null);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleHotspotClick = (hotspot: HotspotInfo) => {
    if (selectedHotspot?.id === hotspot.id) {
      setSelectedHotspot(null);
    } else {
      setSelectedHotspot(hotspot);
      // Auto-pan slightly towards the hotspot when zoomed
      if (zoomLevel > 1 && hotspot.imageX !== undefined && hotspot.imageY !== undefined) {
        setPanOffset({
          x: (50 - hotspot.imageX) * (zoomLevel - 1) * 2.5,
          y: (50 - hotspot.imageY) * (zoomLevel - 1) * 2.5,
        });
      }
    }
  };

  const resetView = () => {
    setSelectedHotspot(null);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.35, 2.2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.35, 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanOffset({
        x: Math.max(Math.min(e.clientX - dragStart.x, 150 * (zoomLevel - 1)), -150 * (zoomLevel - 1)),
        y: Math.max(Math.min(e.clientY - dragStart.y, 150 * (zoomLevel - 1)), -150 * (zoomLevel - 1)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      id="3d-system-viewport"
      className={`relative w-full h-full min-h-[500px] lg:min-h-[600px] bg-[#0A111A] rounded-sm border border-[#1E2F46] overflow-hidden shadow-2xl flex items-center justify-center select-none ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-md border-[#38BDF8]/50 shadow-2xl' : ''
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Ambience / Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Main Image Stage with Transform Controls */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
          cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
        }}
      >
        <img
          src={consoleImage}
          alt="Programmable Blower and Mister Medical System Engineering Prototype"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain max-h-[520px] lg:max-h-[600px] pointer-events-none filter contrast-[1.03] brightness-[1.02]"
        />

        {/* Hotspot Markers Overlay */}
        {showHotspots &&
          SYSTEM_HOTSPOTS.map((hotspot, idx) => {
            const isSelected = selectedHotspot?.id === hotspot.id;
            const isHovered = hoveredHotspot?.id === hotspot.id;
            const posX = hotspot.imageX ?? 50;
            const posY = hotspot.imageY ?? 50;

            return (
              <div
                key={hotspot.id}
                className="absolute z-20 pointer-events-auto group"
                style={{
                  left: `${posX}%`,
                  top: `${posY}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Hotspot Target Button */}
                <button
                  onClick={() => handleHotspotClick(hotspot)}
                  onMouseEnter={() => setHoveredHotspot(hotspot)}
                  onMouseLeave={() => setHoveredHotspot(null)}
                  className={`relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'scale-125 ring-2 ring-[#38BDF8] bg-[#38BDF8] text-[#0A111A] shadow-lg shadow-[#38BDF8]/40'
                      : 'bg-[#0E1726]/90 text-[#38BDF8] border border-[#38BDF8]/70 hover:scale-125 hover:bg-[#38BDF8] hover:text-[#0A111A] shadow-md backdrop-blur-md'
                  }`}
                  title={`${hotspot.title} - Click to inspect`}
                >
                  {/* Concentric Ping Animation */}
                  <span
                    className={`absolute inset-0 rounded-full bg-[#38BDF8] opacity-40 animate-ping pointer-events-none ${
                      isSelected ? 'opacity-70 duration-1000' : 'duration-1500'
                    }`}
                  />
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold leading-none">0{idx + 1}</span>
                </button>

                {/* Floating Tooltip Pin Label (on Hover or Selection) */}
                {(isHovered || isSelected) && !selectedHotspot && (
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 bottom-7 z-30 pointer-events-none whitespace-nowrap px-2 py-0.5 rounded-sm text-[9px] font-mono uppercase tracking-wider backdrop-blur-md border transition-all duration-150 ${
                      isSelected
                        ? 'bg-[#38BDF8] text-[#0A111A] font-bold border-[#38BDF8] shadow-xl'
                        : 'bg-[#0E1726]/95 text-[#F8FAFC] border-[#38BDF8]/50 shadow-lg'
                    }`}
                  >
                    <span className="text-[#38BDF8] mr-1 font-bold">●</span>
                    {hotspot.title}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Top Left Overlay Badge */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] font-mono font-medium uppercase tracking-[0.2em] rounded-sm bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
          Prototype
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.15em] rounded-sm bg-[#142032]/90 text-[#94A3B8] border border-[#1E2F46] backdrop-blur-md">
          Interactive Assembly
        </span>
      </div>

      {/* Top Right Subassemblies Quick Navigation Panel (Compact & Collapsible to not hide machine) */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex flex-col items-end gap-1">
        {/* Toggle Button Header */}
        <button
          onClick={() => setShowSubassemblyMenu(!showSubassemblyMenu)}
          className="text-[9px] font-mono font-semibold text-[#38BDF8] uppercase tracking-[0.2em] px-2.5 py-1 bg-[#0E1726]/90 hover:bg-[#142032] rounded-sm border border-[#38BDF8]/40 backdrop-blur-md flex items-center gap-2 transition-all shadow-md"
          title={showSubassemblyMenu ? 'Minimize subassemblies list' : 'Expand subassemblies list'}
        >
          <span className="flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#38BDF8]" />
            <span>Subassemblies [6]</span>
          </span>
          {showSubassemblyMenu ? (
            <ChevronUp className="w-3 h-3 text-[#38BDF8]" />
          ) : (
            <ChevronDown className="w-3 h-3 text-[#38BDF8]" />
          )}
        </button>

        {/* Collapsible Subassemblies List (Small, compact, semi-transparent) */}
        {showSubassemblyMenu && (
          <div className="flex flex-col gap-1 w-44 sm:w-48 bg-[#0E1726]/95 p-1.5 rounded-sm border border-[#1E2F46] shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-1">
            {SYSTEM_HOTSPOTS.map((hotspot, idx) => {
              const isSelected = selectedHotspot?.id === hotspot.id;
              return (
                <button
                  key={hotspot.id}
                  onClick={() => handleHotspotClick(hotspot)}
                  onMouseEnter={() => setHoveredHotspot(hotspot)}
                  onMouseLeave={() => setHoveredHotspot(null)}
                  className={`text-left px-2 py-1 text-[10px] rounded-sm transition-all duration-150 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-[#38BDF8] text-[#0A111A] font-semibold shadow-sm border-[#38BDF8]'
                      : 'bg-[#142032]/90 text-[#CBD5E1] hover:bg-[#1A2B42] hover:text-[#F8FAFC] hover:border-[#38BDF8]/40 border-[#1E2F46]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className={`text-[8px] font-mono ${isSelected ? 'text-[#0A111A]' : 'text-[#38BDF8]'}`}>
                      0{idx + 1}.
                    </span>
                    <span className="truncate">{hotspot.title}</span>
                  </div>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#0A111A] ml-1 shrink-0" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected Hotspot Detail Inspection Card - Docked to the Right Side to Keep Machine Center 100% Unobscured */}
      {selectedHotspot && (
        <div className="absolute right-3 bottom-14 sm:bottom-4 sm:right-4 z-30 w-[calc(100%-24px)] max-w-xs sm:max-w-sm bg-[#0E1726]/98 border border-[#38BDF8]/60 rounded-sm p-3.5 sm:p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-right-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30 text-[8px] font-mono uppercase tracking-[0.2em] font-medium mb-1">
                {selectedHotspot.specKey}
              </div>
              <h4 className="text-sm sm:text-base font-serif font-medium text-[#F8FAFC] leading-snug">
                {selectedHotspot.title}
              </h4>
              <p className="text-[11px] text-[#38BDF8] font-serif italic">{selectedHotspot.subtitle}</p>
              <p className="text-[11px] text-[#94A3B8] mt-1.5 leading-relaxed font-light line-clamp-4">
                {selectedHotspot.description}
              </p>
            </div>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="text-[#94A3B8] hover:text-[#F8FAFC] p-1 rounded hover:bg-[#142032] transition-colors shrink-0"
              title="Close description"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#1E2F46] flex items-center justify-between text-[9px] font-mono text-[#64748B]">
            <span className="flex items-center gap-1 text-[#38BDF8]">
              <CheckCircle2 className="w-3 h-3" /> Inspected
            </span>
            <button
              onClick={resetView}
              className="text-[#38BDF8] hover:text-[#7DD3FC] font-medium flex items-center gap-1 uppercase tracking-wider text-[9px]"
            >
              <RotateCcw className="w-2.5 h-2.5" /> Reset View
            </button>
          </div>
        </div>
      )}

      {/* Bottom Floating Toolbar Controls */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex flex-wrap items-center gap-1.5 sm:gap-2">
        {/* Toggle Hotspots */}
        <button
          onClick={() => setShowHotspots(!showHotspots)}
          className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-sm text-[9px] sm:text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 border backdrop-blur-md transition-colors ${
            showHotspots
              ? 'bg-[#38BDF8]/20 border-[#38BDF8]/50 text-[#38BDF8]'
              : 'bg-[#142032]/90 border-[#1E2F46] text-[#94A3B8] hover:bg-[#1A2B42]'
          }`}
          title="Toggle Subassembly Hotspot Overlay Pins"
        >
          {showHotspots ? <Eye className="w-3 h-3 text-[#38BDF8]" /> : <EyeOff className="w-3 h-3" />}
          <span>{showHotspots ? 'Pins ON' : 'Pins OFF'}</span>
        </button>

        {/* Zoom Controls */}
        <div className="flex items-center bg-[#142032]/90 border border-[#1E2F46] rounded-sm backdrop-blur-md">
          <button
            onClick={handleZoomIn}
            className="p-1 sm:p-1.5 text-[#94A3B8] hover:text-[#38BDF8] transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
          <span className="text-[9px] sm:text-[10px] font-mono text-[#94A3B8] px-1 border-x border-[#1E2F46]">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 1}
            className="p-1 sm:p-1.5 text-[#94A3B8] hover:text-[#38BDF8] disabled:opacity-30 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

        {/* Reset View Button */}
        <button
          onClick={resetView}
          className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-sm text-[9px] sm:text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 bg-[#142032]/90 border border-[#1E2F46] text-[#94A3B8] hover:bg-[#1A2B42] hover:text-[#F8FAFC] backdrop-blur-md transition-colors"
          title="Reset View & Zoom"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-1 sm:p-1.5 rounded-sm text-[9px] sm:text-[10px] font-mono uppercase tracking-wider flex items-center justify-center bg-[#142032]/90 border border-[#1E2F46] text-[#94A3B8] hover:bg-[#1A2B42] hover:text-[#38BDF8] backdrop-blur-md transition-colors"
          title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen Modal'}
        >
          {isFullscreen ? <Minimize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
        </button>
      </div>

      {/* Interaction Hint Bottom Center/Right (only if no active inspection) */}
      {!selectedHotspot && (
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 text-[9px] sm:text-[10px] text-[#64748B] font-mono hidden md:block uppercase tracking-wider bg-[#0E1726]/80 px-2 py-0.5 rounded-sm border border-[#1E2F46] backdrop-blur">
          {zoomLevel > 1 ? 'Drag to Pan • Click Pins' : 'Click Pins to Inspect'}
        </div>
      )}
    </div>
  );
};
