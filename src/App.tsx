import React from 'react';
import { SystemSimulationProvider, useSystemSimulation } from './context/SystemSimulationContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { CoreSystemFlow } from './components/system/CoreSystemFlow';
import { ControllerSection } from './components/controller/ControllerSection';
import { ProfileBuilder } from './components/profiles/ProfileBuilder';
import { HandpieceSection } from './components/handpiece/HandpieceSection';
import { ClosedLoopControl } from './components/feedback/ClosedLoopControl';
import { MixingAtomizationSection } from './components/atomization/MixingAtomizationSection';
import { SafetySection } from './components/safety/SafetySection';
import { SpecificationsSection } from './components/specifications/SpecificationsSection';
import { PrototypeStatusSection } from './components/prototype/PrototypeStatusSection';
import { ResourcesSection } from './components/resources/ResourcesSection';
import { ContactSection } from './components/contact/ContactSection';
import { LiveSimulationHUD } from './components/simulation/LiveSimulationHUD';

const MainLayout: React.FC = () => {
  const { theme } = useSystemSimulation();

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 font-sans antialiased ${
        theme === 'dark'
          ? 'bg-[#0A111A] text-[#F1F5F9] selection:bg-[#38BDF8] selection:text-[#0A111A]'
          : 'bg-[#0A111A] text-[#F1F5F9] selection:bg-[#38BDF8] selection:text-[#0A111A]'
      }`}
    >
      {/* Navigation Bar */}
      <Header />

      {/* Main Content Area: Expansive, Full-Width Fluid Flow */}
      <main className="w-full space-y-16 sm:space-y-24">
        {/* 1. Hero with 3D Cart & System Assembly */}
        <HeroSection />

        {/* 2. Core Architecture: Two Delivery Channels */}
        <CoreSystemFlow />

        {/* 3. Controller Hardware & Central Management */}
        <ControllerSection />

        {/* 4. Custom Profile Operation: 5-Stage Interactive Builder */}
        <ProfileBuilder />

        {/* 5. Five-Button Handpiece Technology */}
        <HandpieceSection />

        {/* 6. Closed-Loop Regulation (Sense. Control. Adjust.) */}
        <ClosedLoopControl />

        {/* 7. Mixing & Atomization Mechanics */}
        <MixingAtomizationSection />

        {/* 8. Safety & Fault Detection Architecture */}
        <SafetySection />

        {/* 9. Technical Specifications */}
        <SpecificationsSection />

        {/* 10. Development Stage-Gate Roadmap */}
        <PrototypeStatusSection />

        {/* 11. Resources & Technical Briefs */}
        <ResourcesSection />

        {/* 12. Engineering Collaboration & Contact */}
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Live Telemetry HUD */}
      <LiveSimulationHUD />
    </div>
  );
};

export default function App() {
  return (
    <SystemSimulationProvider>
      <MainLayout />
    </SystemSimulationProvider>
  );
}
