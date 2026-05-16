import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, PanResponder, Animated, Alert } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SegmentedProgressBar, TechCard, StatusDot, Header } from '../components/BaseComponents';
import { useStore } from '../store/useStore';

const Joystick = () => {
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const updateJoystick = useStore(state => state.updateTelemetry);
  const gloveStatus = useStore(state => state.gloveStatus);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => gloveStatus !== 'EMERGENCY_LOCK',
    onPanResponderMove: (e, gestureState) => {
      const radius = 40;
      const dist = Math.sqrt(gestureState.dx ** 2 + gestureState.dy ** 2);
      if (dist < radius) {
        pan.setValue({ x: gestureState.dx, y: gestureState.dy });
      } else {
        const ratio = radius / dist;
        pan.setValue({ x: gestureState.dx * ratio, y: gestureState.dy * ratio });
      }
      updateJoystick({ joystickPosition: { x: gestureState.dx, y: gestureState.dy } });
    },
    onPanResponderRelease: () => {
      Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      updateJoystick({ joystickPosition: { x: 0, y: 0 } });
    },
  });

  return (
    <View style={styles.joystickBase}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.joystickHandle, { transform: pan.getTranslateTransform() }]}
      >
        <View style={styles.joystickCenterDot} />
      </Animated.View>
    </View>
  );
};

export default function ControlScreen() {
  const state = useStore();
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  const toggleNode = (id: number) => {
    if (state.gloveStatus === 'EMERGENCY_LOCK') return;
    setActiveNodes(prev => 
      prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]
    );
  };

  const handleEmergencyStop = () => {
    state.setEmergencyStop();
    Alert.alert('EMERGENCY_LOCK', 'SYSTEM_SHUTDOWN_INITIATED. ALL_ACTUATORS_LOCKED.', [{ text: 'ACKNOWLEDGE' }]);
  };

  const nodes = [
    { name: 'THUMB', style: { left: 20, top: 100 } },
    { name: 'INDEX', style: { left: 80, top: 20 } },
    { name: 'MIDDLE', style: { left: 160, top: 10 } },
    { name: 'RING', style: { left: 240, top: 20 } },
    { name: 'PINKY', style: { left: 300, top: 100 } },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <TechCard>
          <View style={styles.statRow}>
            <View>
              <Text style={styles.cardTitle}>ACTIVE SCHEMATIC</Text>
              <Text style={styles.statSub}>HydroHand X // Series 04</Text>
            </View>
            <StatusDot color={state.gloveStatus === 'EMERGENCY_LOCK' ? COLORS.danger : COLORS.primary} label="SYSTEM LINK ACTIVE" />
          </View>

          <View style={styles.handSchematicContainer}>
            <View style={styles.dashedCircle} />
            {nodes.map((node, i) => {
              const isActive = activeNodes.includes(i);
              return (
                <TouchableOpacity 
                  key={i} 
                  onPress={() => toggleNode(i)}
                  style={[
                    styles.nodeCircle, 
                    node.style, 
                    isActive && { borderColor: COLORS.primary, shadowColor: COLORS.primary, shadowRadius: 10, elevation: 5 }
                  ]}
                >
                  <MaterialCommunityIcons 
                    name={isActive ? "check" : "plus"} 
                    size={16} 
                    color={isActive ? COLORS.primary : COLORS.textSecondary} 
                  />
                  <Text style={[styles.nodeLabel, isActive && { color: COLORS.primary }]}>{node.name}</Text>
                </TouchableOpacity>
              );
            })}
            <View style={[styles.palmNode, state.gloveStatus === 'EMERGENCY_LOCK' && { backgroundColor: COLORS.danger }]}>
              <MaterialCommunityIcons name="fire" size={30} color="white" />
              <Text style={styles.palmText}>{state.gloveStatus === 'EMERGENCY_LOCK' ? 'LOCKED' : 'PALM: ON'}</Text>
            </View>
          </View>
        </TechCard>

        <View style={styles.modeRow}>
          <TouchableOpacity 
            style={[styles.modeCard, state.activeModes.includes('LASER') && { borderColor: COLORS.primary }]}
            onPress={() => state.updateTelemetry({ activeModes: ['LASER'] })}
          >
            <MaterialCommunityIcons name="laser-pointer" size={24} color={COLORS.primary} />
            <Text style={styles.modeTitle}>LASER MODE</Text>
            <Text style={styles.modeSub}>Cutting</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.modeCard, state.activeModes.includes('THERMAL') && { borderColor: COLORS.secondary }]}
            onPress={() => state.updateTelemetry({ activeModes: ['THERMAL'] })}
          >
            <MaterialCommunityIcons name="fire" size={24} color={COLORS.secondary} />
            <Text style={styles.modeTitle}>THERMAL MODE</Text>
            <Text style={styles.modeSub}>Fusion</Text>
          </TouchableOpacity>
        </View>

        <TechCard title="Output Intensity">
          <View style={styles.intensityRow}>
            <Text style={styles.statLabel}>LASER INTENSITY</Text>
            <Text style={styles.statValue}>{state.laserIntensity}%</Text>
          </View>
          <SegmentedProgressBar filled={Math.round(state.laserIntensity / 10)} />
          
          <View style={[styles.intensityRow, { marginTop: 15 }]}>
            <Text style={styles.statLabel}>THERMAL OUTPUT</Text>
            <Text style={[styles.statValue, { color: COLORS.secondary }]}>{state.thermalOutput}%</Text>
          </View>
          <SegmentedProgressBar filled={Math.round(state.thermalOutput / 10)} color={COLORS.secondary} />
        </TechCard>

        <TechCard label="PRECISION JOYSTICK">
          <View style={styles.joystickArea}>
            <Joystick />
            <View style={styles.joystickStats}>
              <Text style={styles.statLabel}>VECTOR_X: {state.joystickPosition.x.toFixed(1)}</Text>
              <Text style={styles.statLabel}>VECTOR_Y: {state.joystickPosition.y.toFixed(1)}</Text>
              <Text style={styles.statusValueLarge}>2.4 kHz</Text>
              <SegmentedProgressBar filled={6} />
            </View>
          </View>
        </TechCard>

        <TouchableOpacity 
          style={styles.emergencyButton}
          onPress={handleEmergencyStop}
        >
          <MaterialCommunityIcons name="lock" size={20} color="white" />
          <Text style={styles.emergencyText}>EMERGENCY STOP / LOCK</Text>
        </TouchableOpacity>

        {state.gloveStatus === 'EMERGENCY_LOCK' && (
          <TouchableOpacity 
            style={[styles.emergencyButton, { backgroundColor: COLORS.success, marginTop: 10 }]}
            onPress={() => state.resetSystem()}
          >
            <MaterialCommunityIcons name="refresh" size={20} color="white" />
            <Text style={styles.emergencyText}>RESET SYSTEM CORE</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingTop: 10 },
  cardTitle: { color: COLORS.textPrimary, fontSize: 20, fontWeight: 'bold', ...FONTS.tech },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  statLabel: { color: COLORS.textSecondary, fontSize: 10, ...FONTS.tech },
  statValue: { color: COLORS.primary, fontSize: 14, fontWeight: 'bold', ...FONTS.tech },
  statSub: { color: COLORS.textSecondary, fontSize: 10, marginTop: 4, ...FONTS.tech },
  handSchematicContainer: { height: 250, justifyContent: 'center', alignItems: 'center' },
  dashedCircle: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 1,
    borderColor: 'rgba(0,255,255,0.1)',
    borderStyle: 'dashed',
  },
  nodeCircle: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeLabel: { position: 'absolute', bottom: -15, fontSize: 8, color: COLORS.textSecondary, ...FONTS.tech },
  palmNode: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  palmText: { color: 'white', fontSize: 10, fontWeight: 'bold', marginTop: 5, ...FONTS.tech },
  modeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  modeCard: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 15,
    alignItems: 'center',
  },
  modeTitle: { color: COLORS.textPrimary, fontSize: 12, fontWeight: 'bold', marginTop: 10, ...FONTS.tech },
  modeSub: { color: COLORS.textSecondary, fontSize: 10, marginTop: 2 },
  intensityRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  joystickArea: { flexDirection: 'row', alignItems: 'center' },
  joystickBase: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joystickHandle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joystickCenterDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary },
  joystickStats: { flex: 1, marginLeft: 20 },
  statusValueLarge: { color: COLORS.primary, fontSize: 20, fontWeight: 'bold', ...FONTS.tech },
  emergencyButton: {
    backgroundColor: COLORS.danger,
    height: 55,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  emergencyText: { color: 'white', fontWeight: 'bold', fontSize: 14, marginLeft: 10, ...FONTS.tech },
});
