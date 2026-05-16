import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TechCard, Header } from '../components/BaseComponents';

const SettingRow = ({ icon, title, subtitle, rightElement, color = COLORS.textSecondary }) => (
  <View style={styles.settingRow}>
    <View style={styles.rowLeft}>
      <MaterialCommunityIcons name={icon} size={20} color={color} />
      <View style={styles.textContainer}>
        <Text style={styles.rowTitle}>{title}</Text>
        {subtitle && <Text style={styles.rowSub}>{subtitle}</Text>}
      </View>
    </View>
    {rightElement}
  </View>
);

export default function SettingsScreen() {
  const [wifiOn, setWifiOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>SYSTEM CONFIGURATION</Text>
        <Text style={styles.pageSub}>HydroHand X series operational parameters and identity management.</Text>

        <TechCard>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="account-circle-outline" size={18} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>ACCOUNT</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemLabel}>Google Identity</Text>
            <Text style={styles.itemStatus}>LINKED</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemLabel}>Apple ID</Text>
            <Text style={[styles.itemStatus, { color: COLORS.primary }]}>CONNECT</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemLabel}>Facebook Social</Text>
            <Text style={[styles.itemStatus, { color: COLORS.primary }]}>CONNECT</Text>
          </View>
        </TechCard>

        <TechCard>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="wallet-outline" size={18} color={COLORS.secondary} />
            <Text style={[styles.sectionTitle, { color: COLORS.secondary }]}>PAYMENTS</Text>
          </View>
          <View style={styles.innerCard}>
            <MaterialCommunityIcons name="credit-card-outline" size={20} color={COLORS.textSecondary} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ color: COLORS.textSecondary, fontSize: 10 }}>VISA ACTIVE</Text>
              <Text style={{ color: 'white', fontSize: 14, ...FONTS.tech }}>**** 9012</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.orangeButton}>
            <Text style={styles.orangeButtonText}>MANAGE MIZA CASH</Text>
          </TouchableOpacity>
        </TechCard>

        <TechCard>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="tune" size={18} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>SYSTEM & STORAGE</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemLabel}>Device Firmware</Text>
            <Text style={[styles.itemStatus, { color: COLORS.primary }]}>v2.4.0-H</Text>
          </View>
          <View style={styles.storageContainer}>
            <View style={styles.storageBar}>
              <View style={[styles.storageProgress, { width: '75%' }]} />
            </View>
            <Text style={styles.storageText}>DATA STORAGE: 12.4GB / 16GB USED</Text>
          </View>
          <SettingRow 
            icon="wifi" 
            title="Wi-Fi" 
            subtitle="CONNECTED TO HYDRONET_5G" 
            rightElement={<Switch value={wifiOn} onValueChange={setWifiOn} trackColor={{ true: COLORS.primary }} />}
          />
          <SettingRow 
            icon="bluetooth" 
            title="Bluetooth" 
            subtitle="SEARCHING..." 
            rightElement={<Switch value={bluetoothOn} onValueChange={setBluetoothOn} />}
          />
          <SettingRow 
            icon="console-line" 
            title="Diagnostic Logs" 
            rightElement={<MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.textSecondary} />}
          />
        </TechCard>

        <TechCard>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="shield-check-outline" size={18} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>PRIVACY & SECURITY</Text>
          </View>
          <SettingRow 
            icon="fingerprint" 
            title="Encryption Shield" 
            subtitle="HARDWARE LOCKED" 
            rightElement={<MaterialCommunityIcons name="check-circle" size={18} color={COLORS.primary} />}
          />
          <SettingRow 
            icon="fingerprint" 
            title="Biometric Authentication" 
            rightElement={<MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.textSecondary} />}
          />
          <SettingRow 
            icon="vpn" 
            title="Two-Factor Authentication" 
            rightElement={<Text style={{ color: COLORS.primary, fontSize: 10, ...FONTS.tech }}>SETUP</Text>}
          />
          <SettingRow 
            icon="tune" 
            title="App Permissions" 
            rightElement={<MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.textSecondary} />}
          />
          <SettingRow 
            icon="shield-outline" 
            title="Data Privacy Policy" 
            rightElement={<MaterialCommunityIcons name="open-in-new" size={18} color={COLORS.textSecondary} />}
          />
        </TechCard>

        <TechCard>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="help-circle-outline" size={18} color={COLORS.textSecondary} />
            <Text style={[styles.sectionTitle, { color: COLORS.textSecondary }]}>SUPPORT</Text>
          </View>
          <Text style={styles.supportText}>Technical assistance available 24/7 for HydroHand X operators.</Text>
          <TouchableOpacity style={styles.supportButton}>
            <MaterialCommunityIcons name="headphones" size={18} color={COLORS.secondary} />
            <Text style={styles.supportButtonText}>CONTACT SUPPORT</Text>
          </TouchableOpacity>
        </TechCard>

        <View style={styles.footerStatus}>
          <Text style={styles.footerStatusText}>STATUS: CORE ONLINE</Text>
          <Text style={styles.footerBrand}>HYDROHAND_X_OPERATING_SYSTEM</Text>
        </View>

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
  pageTitle: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
    ...FONTS.tech,
  },
  pageSub: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 5,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 8,
    ...FONTS.tech,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  itemLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  itemStatus: {
    color: COLORS.textSecondary,
    fontSize: 12,
    ...FONTS.tech,
  },
  innerCard: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  orangeButton: {
    backgroundColor: COLORS.secondary,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  orangeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    ...FONTS.tech,
  },
  storageContainer: {
    marginVertical: 15,
  },
  storageBar: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    width: '100%',
  },
  storageProgress: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  storageText: {
    color: COLORS.textSecondary,
    fontSize: 8,
    marginTop: 5,
    ...FONTS.tech,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: 12,
  },
  rowTitle: {
    color: 'white',
    fontSize: 13,
  },
  rowSub: {
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  supportText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginBottom: 15,
  },
  supportButton: {
    height: 45,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportButtonText: {
    color: COLORS.secondary,
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 10,
    ...FONTS.tech,
  },
  footerStatus: {
    alignItems: 'center',
    marginVertical: 20,
  },
  footerStatusText: {
    color: COLORS.primary,
    fontSize: 10,
    ...FONTS.tech,
  },
  footerBrand: {
    color: COLORS.textSecondary,
    fontSize: 9,
    marginTop: 5,
    ...FONTS.tech,
  },
});
