import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, PanResponder, Animated } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SegmentedProgressBar, TechCard, StatusDot, Header } from '../components/BaseComponents';

const Joystick = () => {
  const pan = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      const radius = 40;
      const dist = Math.sqrt(gestureState.dx ** 2 + gestureState.dy ** 2);
      if (dist < radius) {
        pan.setValue({ x: gestureState.dx, y: gestureState.dy });
      } else {
        const ratio = radius / dist;
        pan.setValue({ x: gestureState.dx * ratio, y: gestureState.dy * ratio });
      }
    },
    onPanResponderRelease: () => {
      Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
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
            <StatusDot color={COLORS.primary} label="SYSTEM LINK ACTIVE" />
          </View>

          <View style={styles.handSchematicContainer}>
            <View style={styles.dashedCircle} />
            {nodes.map((node, i) => (
              <TouchableOpacity key={i} style={[styles.nodeCircle, node.style, i === 2 && { borderColor: '#8A9BB0' }]}>
                <MaterialCommunityIcons name="plus" size={16} color={i === 2 ? '#8A9BB0' : COLORS.primary} />
                <Text style={[styles.nodeLabel, i === 2 && { color: '#8A9BB0' }]}>{node.name}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.palmNode}>
              <MaterialCommunityIcons name="fire" size={30} color="white" />
              <Text style={styles.palmText}>PALM: ON</Text>
            </View>
          </View>
        </TechCard>

        <View style={styles.modeRow}>
          <TouchableOpacity style={styles.modeCard}>
            <MaterialCommunityIcons name="laser-pointer" size={24} color={COLORS.primary} />
            <Text style={styles.modeTitle}>LASER MODE</Text>
            <Text style={styles.modeSub}>Cutting</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modeCard}>
            <MaterialCommunityIcons name="fire" size={24} color={COLORS.secondary} />
            <Text style={styles.modeTitle}>THERMAL MODE</Text>
            <Text style={styles.modeSub}>Melting / Fusion</Text>
          </TouchableOpacity>
        </View>

        <TechCard title="Output Intensity">
          <MaterialCommunityIcons name="lightning-bolt" size={18} color={COLORS.primary} style={styles.cardIconRight} />
          <View style={styles.intensityRow}>
            <Text style={styles.statLabel}>LASER INTENSITY</Text>
            <Text style={styles.statValue}>78%</Text>
          </View>
          <SegmentedProgressBar filled={8} />
          
          <View style={[styles.intensityRow, { marginTop: 15 }]}>
            <Text style={styles.statLabel}>THERMAL OUTPUT</Text>
            <Text style={[styles.statValue, { color: COLORS.secondary }]}>42%</Text>
          </View>
          <SegmentedProgressBar filled={4} color={COLORS.secondary} />
        </TechCard>

        <TechCard label="PRECISION JOYSTICK">
          <View style={styles.joystickArea}>
            <Joystick />
            <View style={styles.joystickStats}>
              <Text style={styles.statLabel}>PULSE FREQUENCY</Text>
              <Text style={styles.statusValueLarge}>2.4 kHz</Text>
              <SegmentedProgressBar filled={6} />
              <View style={styles.limitRow}>
                <Text style={styles.limitText}>0.5</Text>
                <Text style={styles.limitText}>5.0</Text>
              </View>
            </View>
          </View>
        </TechCard>

        <View style={styles.smallCardsRow}>
          <TechCard style={styles.smallCard}>
            <Text style={styles.statLabel}>CORE TEMP</Text>
            <Text style={styles.smallCardValue}>42.8 °C</Text>
          </TechCard>
          <TechCard style={styles.smallCard}>
            <Text style={styles.statLabel}>FUEL LEVEL</Text>
            <Text style={styles.smallCardValue}>89 %</Text>
            <View style={[styles.thinBar, { backgroundColor: COLORS.secondary, marginTop: 5 }]} />
          </TechCard>
        </View>

        <TechCard label="MODULE TELEMETRY">
          <View style={styles.telemetryRow}>
            <StatusDot color={COLORS.primary} label="LASER_OPTIC_01" />
            <Text style={styles.telemetryStatus}>STABLE</Text>
          </View>
          <View style={styles.telemetryRow}>
            <StatusDot color={COLORS.secondary} label="THERM_PLATE_MAIN" />
            <Text style={[styles.telemetryStatus, { color: COLORS.secondary }]}>HEATING</Text>
          </View>
          <View style={styles.telemetryRow}>
            <StatusDot color="#8A9BB0" label="ACTUATOR_VIBE" />
            <Text style={[styles.telemetryStatus, { color: '#8A9BB0' }]}>IDLE</Text>
          </View>
        </TechCard>

        <TouchableOpacity style={styles.emergencyButton}>
          <MaterialCommunityIcons name="lock" size={20} color="white" />
          <Text style={styles.emergencyText}>EMERGENCY STOP / LOCK</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    ...FONTS.tech,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    ...FONTS.tech,
  },
  statValue: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
    ...FONTS.tech,
  },
  statSub: {
    color: COLORS.textSecondary,
    fontSize: 10,
    marginTop: 4,
    ...FONTS.tech,
  },
  handSchematicContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    borderColor: COLORS.primary,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeLabel: {
    position: 'absolute',
    bottom: -15,
    fontSize: 8,
    color: COLORS.primary,
    ...FONTS.tech,
  },
  palmNode: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.secondary,
    shadowRadius: 15,
    shadowOpacity: 0.8,
    elevation: 10,
  },
  palmText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 5,
    ...FONTS.tech,
  },
  modeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  modeCard: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 15,
    alignItems: 'center',
  },
  modeTitle: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    ...FONTS.tech,
  },
  modeSub: {
    color: COLORS.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },
  cardIconRight: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  intensityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  joystickArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
    shadowColor: COLORS.primary,
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },
  joystickCenterDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  joystickStats: {
    flex: 1,
    marginLeft: 20,
  },
  statusValueLarge: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: 'bold',
    ...FONTS.tech,
  },
  limitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  limitText: {
    color: COLORS.textSecondary,
    fontSize: 8,
  },
  smallCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallCard: {
    width: '48%',
  },
  smallCardValue: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    ...FONTS.tech,
  },
  thinBar: {
    height: 2,
    width: '100%',
  },
  telemetryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  telemetryStatus: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: 'bold',
    ...FONTS.tech,
  },
  emergencyButton: {
    backgroundColor: COLORS.danger,
    height: 55,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  emergencyText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10,
    ...FONTS.tech,
  },
});
