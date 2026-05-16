import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, Switch, 
  TouchableOpacity, Modal, ActivityIndicator, Animated 
} from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TechCard, Header, StatusDot } from '../components/BaseComponents';
import { useStore } from '../store/useStore';

const WifiBars = ({ strength }: { strength: number }) => {
  const bars = [0.2, 0.4, 0.6, 0.8];
  return (
    <View style={styles.wifiBars}>
      {bars.map((b, i) => (
        <View 
          key={i} 
          style={[
            styles.wifiBar, 
            { height: (i + 1) * 3, backgroundColor: strength >= b ? COLORS.primary : COLORS.border }
          ]} 
        />
      ))}
    </View>
  );
};

export default function SettingsScreen() {
  const state = useStore();
  const [wifiModal, setWifiModal] = useState(false);
  const [btModal, setBtModal] = useState(false);
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (state.bluetoothStatus === 'searching') {
      Animated.loop(
        Animated.timing(scanAnim, { toValue: 1, duration: 2000, useNativeDriver: true })
      ).start();
    } else {
      scanAnim.stopAnimation();
    }
  }, [state.bluetoothStatus]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>SYSTEM_CONFIGURATION</Text>
        
        <TechCard label="NETWORK_INTERFACE">
          <View style={styles.settingRow}>
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons name="wifi" size={20} color={state.wifiEnabled ? COLORS.primary : COLORS.textSecondary} />
              <View style={styles.textContainer}>
                <Text style={styles.rowTitle}>Wi-Fi_MODULE</Text>
                <Text style={styles.rowSub}>{state.wifiStatus.toUpperCase()}</Text>
              </View>
            </View>
            <Switch 
              value={state.wifiEnabled} 
              onValueChange={state.toggleWifi}
              trackColor={{ true: COLORS.primary }}
            />
          </View>

          {state.wifiEnabled && (
            <TouchableOpacity 
              style={styles.connectionInfo}
              onPress={() => setWifiModal(true)}
            >
              <View style={styles.rowLeft}>
                <WifiBars strength={0.8} />
                <Text style={styles.connectionText}>
                  {state.connectedNetwork || 'SELECT_NETWORK'}
                </Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}

          {state.connectedNetwork && (
            <View style={styles.networkDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailKey}>IP_ADDR</Text>
                <Text style={styles.detailVal}>192.168.1.104</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailKey}>LATENCY</Text>
                <Text style={styles.detailVal}>{state.latency}ms</Text>
              </View>
            </View>
          )}
        </TechCard>

        <TechCard label="PERIPHERAL_SYNC">
          <View style={styles.settingRow}>
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons name="bluetooth" size={20} color={state.bluetoothEnabled ? COLORS.primary : COLORS.textSecondary} />
              <View style={styles.textContainer}>
                <Text style={styles.rowTitle}>BLUETOOTH_CORE</Text>
                <Text style={styles.rowSub}>{state.bluetoothStatus.toUpperCase()}</Text>
              </View>
            </View>
            <Switch 
              value={state.bluetoothEnabled} 
              onValueChange={state.toggleBluetooth}
              trackColor={{ true: COLORS.primary }}
            />
          </View>

          {state.bluetoothEnabled && (
            <TouchableOpacity 
              style={styles.connectionInfo}
              onPress={() => setBtModal(true)}
            >
              <View style={styles.rowLeft}>
                {state.bluetoothStatus === 'searching' && (
                  <Animated.View style={{ 
                    transform: [{ rotate: scanAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }]
                  }}>
                    <MaterialCommunityIcons name="loading" size={18} color={COLORS.primary} />
                  </Animated.View>
                )}
                <Text style={[styles.connectionText, { marginLeft: 10 }]}>
                  {state.pairedDevice || 'SEARCH_DEVICES'}
                </Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </TechCard>

        <TechCard label="SYSTEM_STORAGE">
          <View style={styles.storageHeader}>
            <Text style={styles.storageTitle}>CORE_DATA_DRIVE</Text>
            <Text style={styles.storageText}>12.4GB / 16GB</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>
        </TechCard>

        <View style={styles.footerBrand}>
          <Text style={styles.brandText}>H2_GLOVE_OS // BUILD_4.2.0</Text>
          <StatusDot color={COLORS.success} label="CORE_ONLINE" />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* WIFI MODAL */}
      <Modal visible={wifiModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>AVAILABLE_NETWORKS</Text>
            {state.availableNetworks.map(net => (
              <TouchableOpacity 
                key={net.id} 
                style={styles.networkItem}
                onPress={() => {
                  state.connectToWifi(net.name);
                  setWifiModal(false);
                }}
              >
                <View style={styles.rowLeft}>
                  <WifiBars strength={net.strength} />
                  <Text style={styles.networkName}>{net.name}</Text>
                </View>
                {state.connectedNetwork === net.name && <MaterialCommunityIcons name="check" size={20} color={COLORS.primary} />}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.closeBtn} onPress={() => setWifiModal(false)}>
              <Text style={styles.closeBtnText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* BT MODAL */}
      <Modal visible={btModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>NEARBY_PERIPHERALS</Text>
            {state.nearbyDevices.map(dev => (
              <TouchableOpacity 
                key={dev.id} 
                style={styles.networkItem}
                onPress={() => {
                  state.pairDevice(dev.name);
                  setBtModal(false);
                }}
              >
                <MaterialCommunityIcons name="bluetooth-connect" size={20} color={COLORS.textSecondary} />
                <Text style={[styles.networkName, { marginLeft: 15 }]}>{dev.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.closeBtn} onPress={() => setBtModal(false)}>
              <Text style={styles.closeBtnText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingTop: 20 },
  pageTitle: { color: 'white', fontSize: 22, fontWeight: 'bold', marginBottom: 20, ...FONTS.tech },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  textContainer: { marginLeft: 12 },
  rowTitle: { color: 'white', fontSize: 14, ...FONTS.tech },
  rowSub: { color: COLORS.textSecondary, fontSize: 10, ...FONTS.tech },
  connectionInfo: {
    backgroundColor: COLORS.background, padding: 12, borderRadius: 8,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border, marginTop: 5,
  },
  connectionText: { color: COLORS.primary, fontSize: 12, ...FONTS.tech },
  wifiBars: { flexDirection: 'row', alignItems: 'flex-end', gap: 2, marginRight: 10 },
  wifiBar: { width: 3, borderRadius: 1 },
  networkDetails: { marginTop: 15, borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 10 },
  detailItem: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  detailKey: { color: COLORS.textSecondary, fontSize: 9, ...FONTS.tech },
  detailVal: { color: 'white', fontSize: 9, ...FONTS.tech },
  storageHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  storageTitle: { color: 'white', fontSize: 12, ...FONTS.tech },
  storageText: { color: COLORS.textSecondary, fontSize: 10, ...FONTS.tech },
  progressBar: { height: 6, backgroundColor: COLORS.border, borderRadius: 3 },
  progressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 3 },
  footerBrand: { marginTop: 40, alignItems: 'center', gap: 10 },
  brandText: { color: COLORS.textSecondary, fontSize: 10, ...FONTS.tech },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: COLORS.card, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 25, borderWidth: 1, borderColor: COLORS.border },
  modalTitle: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold', marginBottom: 20, ...FONTS.tech },
  networkItem: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  networkName: { color: 'white', fontSize: 14, ...FONTS.tech },
  closeBtn: { marginTop: 30, alignItems: 'center', padding: 15 },
  closeBtnText: { color: COLORS.danger, fontWeight: 'bold', ...FONTS.tech },
});
