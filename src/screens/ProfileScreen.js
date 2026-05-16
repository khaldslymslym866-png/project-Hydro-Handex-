import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TechCard, Header, SegmentedProgressBar } from '../components/BaseComponents';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileHeader}>
          <Text style={styles.authenticatedLabel}>AUTHENTICATED PERSONNEL</Text>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/300' }} 
              style={styles.avatar} 
            />
            <View style={styles.avatarBadge}>
              <MaterialCommunityIcons name="check" size={10} color="black" />
            </View>
          </View>
          <Text style={styles.userName}>Omar Hassan Hussien Mehawed</Text>
          <View style={styles.idBadge}>
            <Text style={styles.idText}>ID: 2420823</Text>
          </View>
          <View style={styles.roleContainer}>
            <View style={styles.roleDot} />
            <Text style={styles.roleText}>TEAM LEADER / LEAD ENGINEER</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <TechCard style={styles.smallCard}>
            <Text style={styles.statLabel}>TOTAL CUTS</Text>
            <MaterialCommunityIcons name="content-cut" size={20} color={COLORS.textSecondary} style={styles.statIcon} />
            <Text style={styles.statValueLarge}>14,208</Text>
            <View style={styles.cyanLine} />
            <Text style={styles.statEfficiency}>89% Efficiency Rating</Text>
          </TechCard>

          <TechCard style={styles.smallCard}>
            <Text style={styles.statLabel}>OPERATING HOURS</Text>
            <MaterialCommunityIcons name="clock-outline" size={20} color={COLORS.textSecondary} style={styles.statIcon} />
            <Text style={styles.statValueLarge}>842.5 HRS</Text>
            <SegmentedProgressBar filled={7} color={COLORS.secondary} />
            <Text style={styles.statEfficiency}>Next Service: 1,000H</Text>
          </TechCard>
        </View>

        <TechCard>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Terminal Access Status</Text>
            <Text style={styles.encryptedText}>ENCRYPTED_LINK: ACTIVE</Text>
          </View>
          <View style={styles.terminalRow}>
            <Text style={styles.terminalLabel}>Haptic Feedback Precision</Text>
            <Text style={styles.terminalValue}>99.2%</Text>
          </View>
          <View style={styles.terminalRow}>
            <Text style={styles.terminalLabel}>Oxygen Fuel Cell Stability</Text>
            <Text style={[styles.terminalValue, { color: 'white' }]}>NOMINAL</Text>
          </View>
          <View style={styles.terminalRow}>
            <Text style={styles.terminalLabel}>Last System Sync</Text>
            <Text style={[styles.terminalValue, { color: COLORS.textSecondary }]}>0.024s ago</Text>
          </View>
        </TechCard>

        <TouchableOpacity style={styles.editButton}>
          <MaterialCommunityIcons name="pencil" size={18} color="black" />
          <Text style={styles.editButtonText}>EDIT PROFILE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
          <MaterialCommunityIcons name="logout" size={18} color="white" />
          <Text style={styles.logoutButtonText}>LOG OUT</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  authenticatedLabel: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 20,
    ...FONTS.tech,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: COLORS.primary,
    padding: 5,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 55,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: COLORS.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    ...FONTS.tech,
  },
  idBadge: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 10,
  },
  idText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    ...FONTS.tech,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  roleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginRight: 8,
  },
  roleText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: 'bold',
    ...FONTS.tech,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  smallCard: {
    width: '48%',
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    ...FONTS.tech,
  },
  statIcon: {
    marginVertical: 10,
  },
  statValueLarge: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
    ...FONTS.tech,
  },
  cyanLine: {
    height: 2,
    backgroundColor: COLORS.primary,
    width: '100%',
    marginVertical: 10,
  },
  statEfficiency: {
    color: COLORS.textSecondary,
    fontSize: 9,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
    ...FONTS.tech,
  },
  encryptedText: {
    color: COLORS.primary,
    fontSize: 8,
  },
  terminalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  terminalLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  terminalValue: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: 'bold',
    ...FONTS.tech,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  editButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10,
    ...FONTS.tech,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 50,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 10,
    ...FONTS.tech,
  },
});
