import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const SegmentedProgressBar = ({ segments = 10, filled = 5, color = COLORS.primary }) => {
  return (
    <View style={styles.barContainer}>
      {Array.from({ length: segments }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.segment,
            { backgroundColor: index < filled ? color : COLORS.border, width: `${95 / segments}%` },
            index < filled && { shadowColor: color, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 4, elevation: 5 }
          ]}
        />
      ))}
    </View>
  );
};

export const StatusDot = ({ color = COLORS.primary, size = 8, label, labelStyle }) => (
  <View style={styles.dotContainer}>
    <View style={[styles.dot, { backgroundColor: color, width: size, height: size, borderRadius: size / 2 }]} />
    {label && <Text style={[styles.dotLabel, labelStyle]}>{label}</Text>}
  </View>
);

export const TechCard = ({ children, style, title, label }) => (
  <View style={[styles.card, style]}>
    {label && <Text style={styles.cardLabel}>{label}</Text>}
    {title && <Text style={styles.cardTitle}>{title}</Text>}
    {children}
  </View>
);

export const Header = () => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <MaterialCommunityIcons name="robot-industrial" size={24} color={COLORS.primary} />
      <Text style={styles.headerTitle}>H2_GLOVE_OS</Text>
    </View>
    <View style={styles.headerRight}>
      <MaterialCommunityIcons name="wifi" size={18} color={COLORS.primary} style={styles.headerIcon} />
      <MaterialCommunityIcons name="bluetooth" size={18} color={COLORS.primary} style={styles.headerIcon} />
      <MaterialCommunityIcons name="signal-variant" size={18} color={COLORS.primary} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  // ... existing styles ...
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
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 8,
    width: '100%',
    marginVertical: 8,
  },
  segment: {
    height: '100%',
    borderRadius: 1,
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    marginRight: 6,
  },
  dotLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    ...FONTS.tech,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 12,
  },
  cardLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    marginBottom: 4,
    ...FONTS.tech,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    ...FONTS.tech,
  },
});
