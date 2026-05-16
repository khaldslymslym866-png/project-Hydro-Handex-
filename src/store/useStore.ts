import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProfile {
  name: string;
  role: string;
  id: string;
}

interface NetworkDevice {
  id: string;
  name: string;
  strength: number;
}

interface ConnectivityState {
  wifiEnabled: boolean;
  wifiStatus: 'disconnected' | 'scanning' | 'connecting' | 'connected' | 'unstable';
  connectedNetwork: string | null;
  latency: number;
  packetLoss: number;
  availableNetworks: NetworkDevice[];
  
  bluetoothEnabled: boolean;
  bluetoothStatus: 'disabled' | 'searching' | 'pairing' | 'paired' | 'active';
  pairedDevice: string | null;
  nearbyDevices: NetworkDevice[];
}

interface TelemetryState extends ConnectivityState {
  // Auth
  isAuthenticated: boolean;
  user: UserProfile;
  
  // Stats
  batteryLevel: number;
  hydrogenLevel: number;
  fuelLevel: number;
  temperature: number;
  laserIntensity: number;
  thermalOutput: number;
  gloveStatus: 'READY' | 'ACTIVE' | 'STANDBY' | 'EMERGENCY_LOCK';
  telemetryLogs: string[];
  joystickPosition: { x: number; y: number };
  isSystemInitiated: boolean;
  
  // Actions
  login: (id: string, key: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<UserProfile>) => void;
  setAuth: (val: boolean) => void;
  
  updateTelemetry: (data: Partial<TelemetryState>) => void;
  addLog: (log: string) => void;
  setInitiated: (val: boolean) => void;
  setEmergencyStop: () => void;
  resetSystem: () => void;
  
  // Connectivity Actions
  toggleWifi: (val: boolean) => void;
  toggleBluetooth: (val: boolean) => void;
  connectToWifi: (ssid: string) => void;
  pairDevice: (name: string) => void;
}

export const useStore = create<TelemetryState>((set) => ({
  isAuthenticated: false,
  user: {
    name: 'Omar Hassan Hussien Mehawed',
    role: 'TEAM LEADER / LEAD ENGINEER',
    id: '2420823'
  },
  
  // Connectivity
  wifiEnabled: true,
  wifiStatus: 'connected',
  connectedNetwork: 'HYDRONET_5G',
  latency: 24,
  packetLoss: 0.02,
  availableNetworks: [
    { id: '1', name: 'HYDRONET_5G', strength: 0.9 },
    { id: '2', name: 'CORELINK_ALPHA', strength: 0.7 },
    { id: '3', name: 'INDUSTRIAL_NODE_X', strength: 0.4 }
  ],
  
  bluetoothEnabled: false,
  bluetoothStatus: 'disabled',
  pairedDevice: null,
  nearbyDevices: [
    { id: 'b1', name: 'HydroHand_X', strength: 0.8 },
    { id: 'b2', name: 'ServoCore_MK4', strength: 0.5 }
  ],

  batteryLevel: 92,
  hydrogenLevel: 84,
  fuelLevel: 89,
  temperature: 32.4,
  laserIntensity: 78,
  thermalOutput: 42,
  gloveStatus: 'READY',
  telemetryLogs: ['[SYS] BOOTUP_SEQUENCE_COMPLETE'],
  activeModes: [],
  joystickPosition: { x: 0, y: 0 },
  isSystemInitiated: false,

  login: async (id, key) => {
    // Fake Auth Delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (id && key) {
      await AsyncStorage.setItem('op_token', 'SECURE_AUTH_420');
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: async () => {
    await AsyncStorage.removeItem('op_token');
    set({ isAuthenticated: false, isSystemInitiated: false, gloveStatus: 'READY' });
  },

  updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),
  setAuth: (val) => set({ isAuthenticated: val }),

  updateTelemetry: (data) => set((state) => ({ ...state, ...data })),
  addLog: (log) => set((state) => ({ 
    telemetryLogs: [log, ...state.telemetryLogs].slice(0, 50) 
  })),

  setInitiated: (val) => set({ isSystemInitiated: val }),

  setEmergencyStop: () => set({
    gloveStatus: 'EMERGENCY_LOCK',
    laserIntensity: 0,
    thermalOutput: 0,
    isSystemInitiated: false,
  }),

  resetSystem: () => set({ gloveStatus: 'READY', isSystemInitiated: false }),

  toggleWifi: (val) => set({ 
    wifiEnabled: val, 
    wifiStatus: val ? 'scanning' : 'disconnected',
    connectedNetwork: null 
  }),

  toggleBluetooth: (val) => set({ 
    bluetoothEnabled: val, 
    bluetoothStatus: val ? 'searching' : 'disabled',
    pairedDevice: null 
  }),

  connectToWifi: (ssid) => {
    set({ wifiStatus: 'connecting' });
    setTimeout(() => set({ wifiStatus: 'connected', connectedNetwork: ssid }), 2000);
  },

  pairDevice: (name) => {
    set({ bluetoothStatus: 'pairing' });
    setTimeout(() => set({ bluetoothStatus: 'paired', pairedDevice: name }), 2000);
  }
}));
