import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SystemProfile, TelemetryState, HotspotInfo, FaultCondition } from '../types';
import { INITIAL_PROFILES, SYSTEM_HOTSPOTS, SAFETY_FAULTS } from '../data/initialData';

interface SimulationContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  profiles: SystemProfile[];
  activeProfileId: number;
  activeProfile: SystemProfile;
  isSimulating: boolean;
  telemetry: TelemetryState;
  selectedHotspot: HotspotInfo | null;
  activeFault: FaultCondition | null;
  builderStage: number;
  activeHandpieceButton: number;
  handpieceTriggerActive: boolean;
  simulatedDisturbance: boolean;
  setActiveProfileId: (id: number) => void;
  updateProfile: (id: number, updater: Partial<SystemProfile> | ((prev: SystemProfile) => SystemProfile)) => void;
  toggleSimulation: () => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  setSelectedHotspot: (hotspot: HotspotInfo | null) => void;
  triggerFault: (faultId: string) => void;
  clearFault: () => void;
  setBuilderStage: (stage: number) => void;
  pressHandpieceButton: (buttonNum: number) => void;
  setHandpieceTriggerActive: (active: boolean) => void;
  toggleDisturbance: () => void;
  resetAllProfiles: () => void;
}

const SystemSimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SystemSimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('blower_mister_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark';
  });

  const setTheme = useCallback((newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
    localStorage.setItem('blower_mister_theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  const [profiles, setProfiles] = useState<SystemProfile[]>(() => {
    const saved = localStorage.getItem('blower_mister_profiles_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_PROFILES;
      }
    }
    return INITIAL_PROFILES;
  });

  const [activeProfileId, setActiveProfileId] = useState<number>(3); // Default to Profile 03
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotInfo | null>(null);
  const [activeFault, setActiveFault] = useState<FaultCondition | null>(null);
  const [builderStage, setBuilderStage] = useState<number>(1);
  const [activeHandpieceButton, setActiveHandpieceButton] = useState<number>(3);
  const [handpieceTriggerActive, setHandpieceTriggerActive] = useState<boolean>(true);
  const [simulatedDisturbance, setSimulatedDisturbance] = useState<boolean>(false);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  // Telemetry loop
  const [telemetry, setTelemetry] = useState<TelemetryState>({
    co2PressurePsi: 28.5,
    co2FlowLpm: 4.2,
    salineFlowMpm: 24.0,
    salinePressurePsi: 14.2,
    mistOutputLpm: 4.3,
    gasPumpRpm: 2450,
    fluidPumpRpm: 1280,
    pidGasAdjustmentPct: 0.2,
    pidFluidAdjustmentPct: -0.1,
    safetyStatus: 'NORMAL',
    activeFaultId: null,
  });

  // Save profiles on change
  useEffect(() => {
    localStorage.setItem('blower_mister_profiles_v1', JSON.stringify(profiles));
  }, [profiles]);

  // Sync handpiece button with active profile
  useEffect(() => {
    setActiveHandpieceButton(activeProfileId);
  }, [activeProfileId]);

  // Simulation telemetry animation tick
  useEffect(() => {
    if (!isSimulating) {
      setTelemetry((prev) => ({
        ...prev,
        co2FlowLpm: 0,
        salineFlowMpm: 0,
        mistOutputLpm: 0,
        gasPumpRpm: 0,
        fluidPumpRpm: 0,
      }));
      return;
    }

    const interval = setInterval(() => {
      setTelemetry((prev) => {
        if (activeFault) {
          return {
            ...prev,
            co2FlowLpm: activeFault.category === 'Gas' ? 0.4 : prev.co2FlowLpm * 0.5,
            salineFlowMpm: activeFault.category === 'Fluid' ? 0 : prev.salineFlowMpm * 0.3,
            mistOutputLpm: 0.5,
            gasPumpRpm: activeFault.category === 'Gas' ? 0 : 600,
            fluidPumpRpm: activeFault.category === 'Fluid' ? 0 : 300,
            safetyStatus: activeFault.severity === 'Failsafe Trip' ? 'FAULTRIP' : 'TEST_ALERT',
            activeFaultId: activeFault.id,
          };
        }

        if (!handpieceTriggerActive) {
          return {
            ...prev,
            co2FlowLpm: 0.1,
            salineFlowMpm: 0,
            mistOutputLpm: 0,
            gasPumpRpm: 400,
            fluidPumpRpm: 0,
            safetyStatus: 'NORMAL',
            activeFaultId: null,
          };
        }

        // Target values based on activeProfile
        const targetGasFlow = activeProfile.gas.targetFlow;
        const targetGasPressure = activeProfile.gas.targetPressure;
        const targetFluidFlow = activeProfile.saline.targetFlow;
        const targetMistRate = activeProfile.mist.estimatedFlowRateLpm;

        // Disturbance injection (e.g. backpressure or slight flow change)
        const disturbanceOffsetGas = simulatedDisturbance ? (Math.sin(Date.now() / 800) * 0.6) : 0;
        const disturbanceOffsetFluid = simulatedDisturbance ? (Math.cos(Date.now() / 1100) * 3.5) : 0;

        // Subtle realistic noise
        const gasNoise = (Math.random() - 0.5) * 0.08;
        const fluidNoise = (Math.random() - 0.5) * 0.4;
        const pressureNoise = (Math.random() - 0.5) * 0.3;

        // Dynamic PID adjustment simulation
        const pidGas = Number(((gasNoise + disturbanceOffsetGas * 0.3) * 4).toFixed(1));
        const pidFluid = Number(((fluidNoise + disturbanceOffsetFluid * 0.2) * 2).toFixed(1));

        return {
          co2PressurePsi: Number((targetGasPressure + pressureNoise + (simulatedDisturbance ? 3.8 : 0)).toFixed(1)),
          co2FlowLpm: Math.max(0, Number((targetGasFlow + gasNoise + disturbanceOffsetGas).toFixed(2))),
          salineFlowMpm: Math.max(0, Number((targetFluidFlow + fluidNoise + disturbanceOffsetFluid).toFixed(1))),
          salinePressurePsi: Number((12 + (targetFluidFlow * 0.18) + pressureNoise).toFixed(1)),
          mistOutputLpm: Math.max(0, Number((targetMistRate + (gasNoise * 0.5)).toFixed(2))),
          gasPumpRpm: Math.round(targetGasFlow * 580 + (pidGas * 15)),
          fluidPumpRpm: Math.round(targetFluidFlow * 52 + (pidFluid * 8)),
          pidGasAdjustmentPct: pidGas,
          pidFluidAdjustmentPct: pidFluid,
          safetyStatus: 'NORMAL',
          activeFaultId: null,
        };
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isSimulating, activeProfile, activeFault, handpieceTriggerActive, simulatedDisturbance]);

  const updateProfile = useCallback((id: number, updater: Partial<SystemProfile> | ((prev: SystemProfile) => SystemProfile)) => {
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        if (typeof updater === 'function') {
          return updater(p);
        }
        return {
          ...p,
          ...updater,
          status: 'Custom',
          lastConfigured: 'Just now (Custom)',
        };
      })
    );
  }, []);

  const toggleSimulation = useCallback(() => {
    setIsSimulating((prev) => !prev);
  }, []);

  const startSimulation = useCallback(() => {
    setIsSimulating(true);
  }, []);

  const stopSimulation = useCallback(() => {
    setIsSimulating(false);
  }, []);

  const triggerFault = useCallback((faultId: string) => {
    const fault = SAFETY_FAULTS.find((f) => f.id === faultId);
    if (fault) {
      setActiveFault(fault);
    }
  }, []);

  const clearFault = useCallback(() => {
    setActiveFault(null);
  }, []);

  const pressHandpieceButton = useCallback((buttonNum: number) => {
    setActiveHandpieceButton(buttonNum);
    setActiveProfileId(buttonNum);
  }, []);

  const toggleDisturbance = useCallback(() => {
    setSimulatedDisturbance((prev) => !prev);
  }, []);

  const resetAllProfiles = useCallback(() => {
    setProfiles(INITIAL_PROFILES);
    localStorage.removeItem('blower_mister_profiles_v1');
    setActiveProfileId(3);
    setActiveFault(null);
  }, []);

  return (
    <SystemSimulationContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        profiles,
        activeProfileId,
        activeProfile,
        isSimulating,
        telemetry,
        selectedHotspot,
        activeFault,
        builderStage,
        activeHandpieceButton,
        handpieceTriggerActive,
        simulatedDisturbance,
        setActiveProfileId,
        updateProfile,
        toggleSimulation,
        startSimulation,
        stopSimulation,
        setSelectedHotspot,
        triggerFault,
        clearFault,
        setBuilderStage,
        pressHandpieceButton,
        setHandpieceTriggerActive,
        toggleDisturbance,
        resetAllProfiles,
      }}
    >
      {children}
    </SystemSimulationContext.Provider>
  );
};

export const useSystemSimulation = (): SimulationContextType => {
  const context = useContext(SystemSimulationContext);
  if (!context) {
    throw new Error('useSystemSimulation must be used within a SystemSimulationProvider');
  }
  return context;
};
