import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SegmentedProgressBar, StatusDot, TechCard, Header } from '../components/BaseComponents';

const Waveform = () => {
  const anims = useRef([1, 2, 3, 4, 5].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animate = (anim, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: 1, duration: 500 + Math.random() * 500, useNativeDriver: false }),
          Animated.timing(anim, { toValue: 0, duration: 500 + Math.random() * 500, useNativeDriver: false }),
        ])
      ).start();
    };
    anims.forEach((anim, i) => animate(anim, i * 200));
  }, []);

  return (
    <View style={styles.waveformContainer}>
      {anims.map((anim, i) => (
        <Animated.View
          key={i}
          style={[
            styles.waveBar,
            {
              height: anim.interpolate({ inputRange: [0, 1], outputRange: [5, 25] }),
              backgroundColor: COLORS.secondary,
            },
          ]}
        />
      ))}
    </View>
  );
};


export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <TechCard label="SYSTEM SCHEMATIC" title="HYDROHAND X - MK IV">
          <View style={styles.handDiagramContainer}>
            <Image 
              source={{ uri: 'https://img.freepik.com/free-vector/robotic-hand-concept-illustration_114360-6430.jpg' }} 
              style={styles.handImage}
              resizeMode="contain"
            />
            <View style={[styles.glowDot, { top: '30%', left: '40%' }]} />
            <View style={[styles.glowDot, { top: '50%', left: '60%' }]} />
            <View style={[styles.glowDot, { top: '70%', left: '30%' }]} />
          </View>
          <TouchableOpacity style={styles.initiateButton}>
            <Text style={styles.initiateButtonText}>INITIATE SYSTEM</Text>
          </TouchableOpacity>
        </TechCard>

        <TechCard>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>HYDROGEN LEVEL</Text>
            <Text style={styles.statValue}>84%</Text>
          </View>
          <SegmentedProgressBar filled={8} />
          <Text style={styles.statSub}>PRESSURE: 24.8 MPa</Text>
        </TechCard>

        <TechCard>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>BATTERY CAPACITY</Text>
            <Text style={styles.statValue}>92%</Text>
          </View>
          <SegmentedProgressBar filled={9} />
          <Text style={styles.statSub}>RUNTIME: 12.4 HRS</Text>
        </TechCard>

        <TechCard>
          <View style={styles.statRow}>
            <View>
              <Text style={styles.statLabel}>GLOVE STATUS</Text>
              <Text style={styles.statusValueLarge}>READY</Text>
            </View>
            <View style={styles.statusIndicator}>
              <View style={styles.indicatorDot} />
            </View>
          </View>
        </TechCard>

        <View style={styles.smallCardsRow}>
          <TechCard style={styles.smallCard}>
            <Text style={styles.statLabel}>TEMPERATURE</Text>
            <Text style={styles.smallCardValue}>32.4°C</Text>
          </TechCard>
          <TechCard style={styles.smallCard}>
            <Text style={styles.statLabel}>CALIBRATION</Text>
            <Text style={[styles.smallCardValue, { color: COLORS.secondary }]}>0.02mm</Text>
          </TechCard>
        </View>

        <TechCard>
          <View style={styles.statRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="lightning-bolt" size={16} color={COLORS.secondary} />
              <Text style={[styles.statLabel, { marginLeft: 5 }]}>LOAD BALANCER</Text>
            </View>
            <Waveform />
          </View>
        </TechCard>

        <TechCard>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <MaterialCommunityIcons name="water" size={16} color={COLORS.primary} />
            <Text style={[styles.statLabel, { marginLeft: 5 }]}>FLOW RATE</Text>
          </View>
          <Text style={styles.smallCardValue}>1.28 L/min</Text>
          <View style={styles.thinBar} />
        </TechCard>

        <TechCard>
          <View style={styles.statRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="target" size={16} color={COLORS.primary} />
              <Text style={[styles.statLabel, { marginLeft: 5 }]}>LASER SCANNER</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 12 }}>ACTIVE</Text>
              <Text style={{ color: COLORS.textSecondary, fontSize: 10 }}>ZONE A-4</Text>
            </View>
          </View>
        </TechCard>

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    ...FONTS.tech,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 12,
  },
  handDiagramContainer: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 8,
  },
  handImage: {
    width: '80%',
    height: '100%',
    opacity: 0.6,
  },
  glowDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  initiateButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  initiateButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    ...FONTS.tech,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    ...FONTS.tech,
  },
  statValue: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
    ...FONTS.tech,
  },
  statSub: {
    color: COLORS.textSecondary,
    fontSize: 10,
    marginTop: 4,
  },
  statusValueLarge: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    ...FONTS.tech,
  },
  statusIndicator: {
    justifyContent: 'center',
  },
  indicatorDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    ...FONTS.tech,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waveBar: {
    width: 3,
    marginHorizontal: 1,
    borderRadius: 1,
  },
  thinBar: {
    height: 2,
    backgroundColor: COLORS.primary,
    width: '100%',
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowRadius: 5,
    shadowOpacity: 0.5,
  }
});