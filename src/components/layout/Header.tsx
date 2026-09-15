import React, { useState, useEffect } from 'react';
import { useSystemSimulation } from '../../context/SystemSimulationContext';
import { Activity, Play, Pause, Menu, X, Shield, Droplets, Sparkles, ChevronRight, Moon, Sun } from 'lucide-react';
import logoImg from '../../assets/images/logo.png';

export const Header: React.FC = () => {
  const { isSimulating, toggleSimulation, telemetry, activeProfile, theme, toggleTheme } = useSystemSimulation();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#3d-system-viewport' },
    { name: 'Architecture', href: '#system-architecture' },
    { name: 'Controller', href: '#controller-architecture' },
    { name: 'Profiles', href: '#custom-profile-operation' },
    { name: 'Handpiece', href: '#handpiece-technology' },
    { name: 'Closed-Loop', href: '#closed-loop-control' },
    { name: 'Safety', href: '#safety-architecture' },
    { name: 'Specs', href: '#technical-specifications' },
    { name: 'Docs', href: '#resources-documentation' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#0A111A]/95 backdrop-blur-md border-b border-[#1E2F46] py-2.5 shadow-2xl'
          : 'bg-[#0A111A]/60 backdrop-blur-sm border-b border-transparent py-3.5'
      }`}
    >
      <div className="w-full max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Prototype Badge */}
        <a href="#" className="flex items-center gap-3 group">
          <img
            src={logoImg}
            alt="Medical System Logo"
            className="h-8 sm:h-9 w-auto object-contain max-w-[140px] sm:max-w-[180px] group-hover:opacity-90 transition-opacity"
          />
          <div className="hidden sm:block border-l border-[#1E2F46] pl-3">
            <div className="text-xs sm:text-sm font-serif tracking-[0.18em] font-medium text-[#F8FAFC] uppercase leading-none group-hover:text-[#38BDF8] transition-colors">
              PROGRAMMABLE BLOWER/MISTER
            </div>
            <div className="text-[8.5px] font-mono text-[#38BDF8] font-medium tracking-[0.25em] uppercase mt-1">
              SURGICAL ENGINEERING PLATFORM
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] tracking-[0.18em] uppercase font-light text-[#94A3B8] hover:text-[#38BDF8] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-sm bg-[#142032] border border-[#1E2F46] text-[#94A3B8] hover:text-[#38BDF8] hover:border-[#38BDF8]/40 transition-all"
            title={`Toggle theme`}
            aria-label="Toggle visual theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-[#38BDF8]" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-[#38BDF8]" />
            )}
          </button>

          {/* Live Simulation Mode Quick Toggle */}
          <button
            onClick={toggleSimulation}
            className={`px-3 py-1.5 rounded-sm text-[10px] font-mono uppercase tracking-wider flex items-center gap-2 border transition-all ${
              isSimulating
                ? 'bg-[#38BDF8]/10 border-[#38BDF8]/40 text-[#38BDF8]'
                : 'bg-[#142032] border-[#1E2F46] text-[#94A3B8] hover:bg-[#1A2B42]'
            }`}
            title="Toggle Continuous Simulation Engine"
          >
            {isSimulating ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                <span>Sim: Active</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 text-[#94A3B8]" />
                <span>Sim: Paused</span>
              </>
            )}
          </button>

          <a
            href="#contact-collaboration"
            className="px-4 py-2 rounded-sm bg-transparent border border-[#1E2F46] hover:border-[#38BDF8] text-[#F1F5F9] hover:text-[#38BDF8] text-[10px] uppercase tracking-[0.2em] font-medium transition-colors"
          >
            Request Allocation
          </a>
        </div>

        {/* Mobile Hamburger & Theme Toggle Button */}
        <div className="xl:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-sm bg-[#142032] border border-[#1E2F46] text-[#94A3B8] hover:text-[#38BDF8]"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#38BDF8]" /> : <Moon className="w-4 h-4 text-[#38BDF8]" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-sm bg-[#142032] border border-[#1E2F46] text-[#94A3B8] hover:text-[#F1F5F9]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A111A]/98 border-b border-[#1E2F46] px-6 py-6 space-y-4 animate-in slide-in-from-top-2 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2F46]">
            <span className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-[0.3em]">System Navigation</span>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="px-2 py-1 text-[10px] font-mono rounded-sm bg-[#142032] border border-[#1E2F46] text-[#38BDF8] flex items-center gap-1"
              >
                {theme === 'dark' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
              </button>
              <button
                onClick={toggleSimulation}
                className="px-2.5 py-1 text-[10px] font-mono rounded-sm bg-[#142032] border border-[#1E2F46] text-[#94A3B8] flex items-center gap-1.5"
              >
                {isSimulating ? 'Sim: Active' : 'Sim: Paused'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-sm bg-[#0E1726] border border-[#1E2F46] text-xs tracking-wider uppercase text-[#CBD5E1] hover:text-[#38BDF8] hover:border-[#38BDF8]/40 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#64748B]" />
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#contact-collaboration"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-sm bg-[#38BDF8] text-[#0A111A] tracking-[0.2em] uppercase font-bold text-[11px] shadow-lg hover:bg-[#7DD3FC] transition-colors"
            >
              Request Information / Collaboration
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
