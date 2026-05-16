import { useStore } from '../store/useStore';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useTelemetryEngine = () => {
  const state = useStore();

  // Auth Check on Mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('op_token');
      if (token) {
        state.setAuth(true);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (state.gloveStatus === 'EMERGENCY_LOCK' || !state.isAuthenticated) return;

    const interval = setInterval(() => {
      // Telemetry Fluctuations
      const tempDrift = (Math.random() - 0.5) * 0.2;
      const hydroDrift = (Math.random() - 0.5) * 0.1;
      
      // Connectivity Fluctuations
      const latencyDrift = (Math.random() - 0.5) * 5;
      const packetLossDrift = (Math.random() - 0.5) * 0.005;

      state.updateTelemetry({
        temperature: Number((state.temperature + tempDrift).toFixed(1)),
        hydrogenLevel: Number((state.hydrogenLevel + hydroDrift).toFixed(1)),
        latency: Math.max(10, Math.min(200, Math.round(state.latency + latencyDrift))),
        packetLoss: Math.max(0, Math.min(0.1, Number((state.packetLoss + packetLossDrift).toFixed(3)))),
      });

      // Random Instability Event
      if (state.wifiEnabled && state.wifiStatus === 'connected' && Math.random() > 0.98) {
        state.updateTelemetry({ wifiStatus: 'unstable' });
        state.addLog('[NET] SIGNAL_INSTABILITY_DETECTED');
        setTimeout(() => state.updateTelemetry({ wifiStatus: 'connected' }), 3000);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [state.gloveStatus, state.isAuthenticated]);
};
