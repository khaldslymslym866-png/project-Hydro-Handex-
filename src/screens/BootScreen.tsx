import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function BootScreen({ onFinish }: { onFinish: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress] = useState(new Animated.Value(0));
  
  const bootLogs = [
    'INITIALIZING H2_GLOVE CORE...',
    'LOADING KERNEL MODULES...',
    'CONNECTING TO HYDRONET_LINK...',
    'CALIBRATING SERVO ACTUATORS...',
    'ESTABLISHING ENCRYPTED TUNNEL...',
    'SYNCING TELEMETRY DATA...',
    'SYSTEM_READY_V4.2.0.X'
  ];

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < bootLogs.length) {
        setLogs(prev => [...prev, `> ${bootLogs[currentLog]}`]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(onFinish, 1000);
      }
    }, 600);

    Animated.timing(progress, {
      toValue: 1,
      duration: bootLogs.length * 600,
      useNativeDriver: false,
    }).start();

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <MaterialCommunityIcons name="robot-industrial" size={80} color={COLORS.primary} />
        <Text style={styles.title}>H2_GLOVE OS</Text>
      </View>

      <View style={styles.logContainer}>
        {logs.map((log, i) => (
          <Text key={i} style={styles.logText}>{log}</Text>
        ))}
      </View>

      <View style={styles.progressBase}>
        <Animated.View 
          style={[
            styles.progressBar, 
            { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }
          ]} 
        />
      </View>
      <Text style={styles.status}>CORE_INITIALIZATION_IN_PROGRESS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    padding: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    ...FONTS.tech,
  },
  logContainer: {
    height: 200,
    backgroundColor: 'rgba(0,255,255,0.02)',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logText: {
    color: COLORS.primary,
    fontSize: 10,
    marginVertical: 2,
    ...FONTS.tech,
  },
  progressBase: {
    height: 2,
    backgroundColor: COLORS.border,
    marginTop: 30,
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 5,
  },
  status: {
    color: COLORS.textSecondary,
    fontSize: 8,
    textAlign: 'center',
    marginTop: 10,
    ...FONTS.tech,
  }
});
