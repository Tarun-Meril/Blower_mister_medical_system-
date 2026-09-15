import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useSystemSimulation } from '../../context/SystemSimulationContext';
import handpiecePhoto from '../../assets/images/surgical_handpiece_closeup_1787304727211.jpg';
import { Sparkles, Eye, Radio, Layers, Image as ImageIcon, Box, RotateCcw } from 'lucide-react';

export const Handpiece3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    activeProfileId,
    pressHandpieceButton,
    isSimulating,
    telemetry,
    handpieceTriggerActive,
    setHandpieceTriggerActive,
    theme,
  } = useSystemSimulation();

  const [viewMode, setViewMode] = useState<'photo' | '3d'>('photo');
  const [cutawayMode, setCutawayMode] = useState<boolean>(false);
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const buttonMeshesRef = useRef<THREE.Mesh[]>([]);
  const bodyMeshRef = useRef<THREE.Mesh | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize WebGL Scene ONLY when viewMode is '3d'
  useEffect(() => {
    if (viewMode !== '3d') {
      // Clean up if viewMode switched away from 3D
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (rendererRef.current) {
        rendererRef.current.forceContextLoss();
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0.8, 0.4, 1.4);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xfffdfa, 1.6);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    dirLight.position.set(3, 4, 3);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1.2);
    backLight.position.set(-3, -2, -2);
    scene.add(backLight);

    // Handpiece Group
    const hpGroup = new THREE.Group();
    hpGroup.rotation.set(0.2, -0.6, 0.1);

    // 1. Handle Body
    const handleGeo = new THREE.CylinderGeometry(0.05, 0.065, 0.65, 32);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: cutawayMode ? 0x0e1726 : 0xf1f5f9,
      roughness: 0.25,
      metalness: 0.1,
      transparent: cutawayMode,
      opacity: cutawayMode ? 0.35 : 1.0,
      wireframe: cutawayMode,
    });
    const handleMesh = new THREE.Mesh(handleGeo, bodyMat);
    handleMesh.rotation.z = Math.PI / 2;
    bodyMeshRef.current = handleMesh;
    hpGroup.add(handleMesh);

    // 2. Distal Taper & Atomization Nozzle Tip
    const nozzleMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.85, roughness: 0.2 });
    const taperGeo = new THREE.ConeGeometry(0.05, 0.25, 32);
    const taperMesh = new THREE.Mesh(taperGeo, nozzleMat);
    taperMesh.rotation.z = -Math.PI / 2;
    taperMesh.position.set(0.42, 0, 0);
    hpGroup.add(taperMesh);

    // 3. Five Color-Coded Miniature Pushbuttons
    const buttonColors = [0x38bdf8, 0x34d399, 0xfbbf24, 0xa855f7, 0xf43f5e];
    buttonMeshesRef.current = [];

    buttonColors.forEach((colorHex, idx) => {
      const btnGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.03, 16);
      const isSelected = activeProfileId === idx + 1;
      const btnMat = new THREE.MeshStandardMaterial({
        color: isSelected ? 0xc5a267 : colorHex,
        roughness: 0.3,
        emissive: isSelected ? 0xc5a267 : 0x000000,
        emissiveIntensity: isSelected ? 0.6 : 0,
      });
      const btnMesh = new THREE.Mesh(btnGeo, btnMat);
      btnMesh.position.set(-0.16 + idx * 0.08, 0.055, 0);
      hpGroup.add(btnMesh);
      buttonMeshesRef.current.push(btnMesh);
    });

    scene.add(hpGroup);

    // Render loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      hpGroup.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      window.removeEventListener('resize', handleResize);
      renderer.forceContextLoss();
      renderer.dispose();
      rendererRef.current = null;
      if (container) container.innerHTML = '';
    };
  }, [viewMode]);

  // Update button material & cutaway dynamically without re-creating WebGL renderer
  useEffect(() => {
    if (viewMode !== '3d') return;
    const buttonColors = [0x38bdf8, 0x34d399, 0xfbbf24, 0xa855f7, 0xf43f5e];
    buttonMeshesRef.current.forEach((mesh, idx) => {
      if (mesh && mesh.material instanceof THREE.MeshStandardMaterial) {
        const isSelected = activeProfileId === idx + 1;
        mesh.material.color.setHex(isSelected ? 0xc5a267 : buttonColors[idx]);
        mesh.material.emissive.setHex(isSelected ? 0xc5a267 : 0x000000);
        mesh.material.emissiveIntensity = isSelected ? 0.6 : 0;
      }
    });

    if (bodyMeshRef.current && bodyMeshRef.current.material instanceof THREE.MeshStandardMaterial) {
      bodyMeshRef.current.material.wireframe = cutawayMode;
      bodyMeshRef.current.material.opacity = cutawayMode ? 0.35 : 1.0;
      bodyMeshRef.current.material.transparent = cutawayMode;
      bodyMeshRef.current.material.color.setHex(cutawayMode ? 0x0e1726 : 0xf1f5f9);
    }
  }, [activeProfileId, cutawayMode, viewMode]);

  return (
    <div className="relative w-full h-full min-h-[480px] bg-[#0E1726] rounded-sm border border-[#1E2F46] overflow-hidden flex flex-col items-center justify-between p-4 shadow-2xl transition-colors">
      {/* Viewport Top Bar */}
      <div className="w-full flex items-center justify-between z-20 mb-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] rounded-sm bg-[#142032] text-[#38BDF8] border border-[#38BDF8]/30 backdrop-blur-md">
            Handpiece Subassembly
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded-sm bg-[#142032]/80 text-[#94A3B8] border border-[#1E2F46]">
            5-Mode Interface
          </span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setViewMode(viewMode === 'photo' ? '3d' : 'photo')}
            className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm font-medium flex items-center gap-1.5 border border-[#1E2F46] bg-[#142032] text-[#94A3B8] hover:text-[#38BDF8] hover:border-[#38BDF8]/40 backdrop-blur-md transition-all"
          >
            {viewMode === 'photo' ? (
              <>
                <Box className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>3D Wireframe</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Studio Photo</span>
              </>
            )}
          </button>

          {viewMode === '3d' && (
            <button
              onClick={() => setCutawayMode(!cutawayMode)}
              className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm font-medium flex items-center gap-1.5 border transition-all ${
                cutawayMode
                  ? 'bg-[#38BDF8]/15 border-[#38BDF8]/40 text-[#38BDF8]'
                  : 'bg-[#142032] border-[#1E2F46] text-[#94A3B8] hover:bg-[#1A2B42]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{cutawayMode ? 'X-Ray' : 'Solid'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Display: Photo Mode or 3D Canvas */}
      {viewMode === 'photo' ? (
        <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden my-auto py-2">
          <img
            src={handpiecePhoto}
            alt="Five-Button Ergonomic Surgical Handpiece Macro Studio Photograph"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain max-h-[320px] pointer-events-none filter contrast-[1.04] brightness-[1.02]"
          />

          {/* Interactive Button Indicator Overlay on Handpiece */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-12 pointer-events-none flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((btnNum) => {
              const isCurrent = activeProfileId === btnNum;
              return (
                <div
                  key={btnNum}
                  className={`w-3 h-3 rounded-full transition-all ${
                    isCurrent
                      ? 'bg-[#38BDF8] ring-4 ring-[#38BDF8]/30 scale-125 shadow-lg shadow-[#38BDF8]/50'
                      : 'bg-[#94A3B8]/20'
                  }`}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div ref={containerRef} className="w-full flex-1 min-h-[300px]" />
      )}

      {/* 5 Physical-Style Pushbutton Controller Bar */}
      <div className="w-full max-w-lg z-20 bg-[#0E1726]/95 border border-[#1E2F46] rounded-sm p-3.5 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#94A3B8] flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-[#38BDF8]" /> Five Operational Mode Buttons
          </span>
          <span className="text-[10px] font-mono font-medium text-[#38BDF8] uppercase tracking-wider">
            Current: Profile 0{activeProfileId}
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((btnNum) => {
            const isCurrent = activeProfileId === btnNum;
            return (
              <button
                key={btnNum}
                onClick={() => pressHandpieceButton(btnNum)}
                onMouseEnter={() => setHoveredBtn(btnNum)}
                onMouseLeave={() => setHoveredBtn(null)}
                className={`py-2 px-1 rounded-sm text-xs font-mono font-bold flex flex-col items-center justify-center transition-all duration-200 border relative ${
                  isCurrent
                    ? 'bg-[#38BDF8] text-[#0A111A] border-[#38BDF8] shadow-lg shadow-[#38BDF8]/20 scale-[1.03]'
                    : 'bg-[#142032] text-[#94A3B8] border-[#1E2F46] hover:bg-[#1A2B42] hover:text-[#F8FAFC] hover:border-[#38BDF8]/30'
                }`}
              >
                <span className="text-sm tracking-wider">0{btnNum}</span>
                <span className="text-[8px] font-mono uppercase tracking-wider opacity-80 mt-0.5">
                  {btnNum === 5 ? 'Custom' : `P0${btnNum}`}
                </span>
                {isCurrent && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#38BDF8] ring-2 ring-[#0A111A] animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* Trigger / Activation mechanism toggle */}
        <div className="mt-3 pt-2.5 border-t border-[#1E2F46] flex items-center justify-between">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8]">
            Activation Trigger Mechanism:{' '}
            <span className={handpieceTriggerActive ? 'text-[#38BDF8] font-semibold' : 'text-[#64748B] font-medium'}>
              {handpieceTriggerActive ? 'ENGAGED (Delivery Active)' : 'RELEASED (Idle Standby)'}
            </span>
          </div>
          <button
            onClick={() => setHandpieceTriggerActive(!handpieceTriggerActive)}
            className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm font-semibold transition-colors ${
              handpieceTriggerActive
                ? 'bg-[#38BDF8] text-[#0A111A] hover:bg-[#7DD3FC]'
                : 'bg-[#142032] border border-[#1E2F46] text-[#94A3B8] hover:bg-[#1A2B42] hover:text-[#F8FAFC]'
            }`}
          >
            {handpieceTriggerActive ? 'Release Trigger' : 'Depress Trigger'}
          </button>
        </div>
      </div>
    </div>
  );
};
