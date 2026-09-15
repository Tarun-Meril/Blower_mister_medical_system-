export type DeliveryMode = 'Continuous' | 'Intermittent' | 'Pulsed';

export type MistIntensity = 'Low' | 'Medium' | 'High' | 'Ultra-Fine';

export interface SystemProfile {
  id: number;
  name: string;
  code: string;
  tagline: string;
  status: 'Ready' | 'Configured' | 'Default' | 'Custom';
  lastConfigured?: string;
  gas: {
    targetFlow: number; // L/min (Simulated engineering parameter)
    targetPressure: number; // psi (Max 60 psi)
    mode: DeliveryMode;
    pulseFrequencyHz?: number;
    notes: string;
  };
  saline: {
    targetFlow: number; // mL/min (Simulated engineering parameter)
    timingSec: number;
    mode: DeliveryMode;
    notes: string;
  };
  mist: {
    intensity: MistIntensity;
    estimatedFlowRateLpm: number; // ~3-5 L/min initial
    atomizationRatio: number; // Gas to Liquid ratio factor
    mode: DeliveryMode;
  };
}

export interface HotspotInfo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  position: [number, number, number];
  cameraTarget: [number, number, number];
  cameraPosition: [number, number, number];
  specKey: string;
  imageX?: number;
  imageY?: number;
}

export interface SystemComponentNode {
  id: string;
  name: string;
  channel: 'co2' | 'saline' | 'controller' | 'output';
  role: string;
  description: string;
  status: 'nominal' | 'active' | 'standby' | 'alert';
  sensorFeedback?: string;
  iconName: string;
}

export interface FaultCondition {
  id: string;
  name: string;
  category: 'Gas' | 'Fluid' | 'Pump' | 'Sensor' | 'Delivery';
  description: string;
  severity: 'Warning' | 'Critical Alert' | 'Failsafe Trip';
  detectionMethod: string;
  automatedResponse: string;
  recommendedAction: string;
}

export interface TelemetryState {
  co2PressurePsi: number;
  co2FlowLpm: number;
  salineFlowMpm: number;
  salinePressurePsi: number;
  mistOutputLpm: number;
  gasPumpRpm: number;
  fluidPumpRpm: number;
  pidGasAdjustmentPct: number;
  pidFluidAdjustmentPct: number;
  safetyStatus: 'NORMAL' | 'DEGRADED' | 'FAULTRIP' | 'TEST_ALERT';
  activeFaultId: string | null;
}
