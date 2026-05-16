import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, Image, 
  TouchableOpacity, Modal, TextInput, Animated 
} from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TechCard, Header, SegmentedProgressBar, StatusDot } from '../components/BaseComponents';
import { useStore } from '../store/useStore';

const StatCard = ({ label, value, icon, subValue, color = COLORS.primary }: any) => {
  const anim = useState(new Animated.Value(0))[0];
  
  useEffect(() => {
    Animated.timing(anim, { toValue: 1, duration: 1500, useNativeDriver: false }).start();
  }, []);

  return (
    <TechCard style={styles.smallCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <MaterialCommunityIcons name={icon} size={20} color={COLORS.textSecondary} style={styles.statIcon} />
      <Animated.Text style={[styles.statValueLarge, { opacity: anim }]}>
        {value}
      </Animated.Text>
      <View style={[styles.statLine, { backgroundColor: color }]} />
      <Text style={styles.statSub}>{subValue}</Text>
    </TechCard>
  );
};

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const state = useStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [editName, setEditName] = useState(state.user.name);
  const [editRole, setEditRole] = useState(state.user.role);

  const handleSave = () => {
    state.updateUser({ name: editName, role: editRole });
    setModalVisible(false);
  };

  const handleLogout = async () => {
    await state.logout();
    navigation.replace('Login');
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileHeader}>
          <Text style={styles.authenticatedLabel}>AUTHENTICATED_PERSONNEL</Text>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: 'https://i.pravatar.cc/300' }} style={styles.avatar} />
            <View style={styles.pulseContainer}>
              <View style={styles.avatarBadge}>
                <MaterialCommunityIcons name="check-decagram" size={14} color="black" />
              </View>
            </View>
            <View style={styles.statusDot} />
          </View>
          
          <Text style={styles.userName}>{state.user.name}</Text>
          <View style={styles.roleContainer}>
            <StatusDot color={COLORS.primary} />
            <Text style={styles.roleText}>{state.user.role}</Text>
          </View>
          <Text style={styles.idText}>OP_ID: {state.user.id}</Text>
        </View>

        <View style={styles.statsGrid}>
          <StatCard label="TOTAL_CUTS" value="14,208" icon="content-cut" subValue="89% Efficiency" />
          <StatCard label="OP_HOURS" value="842.5" icon="clock-outline" subValue="Next Svc: 1,000H" color={COLORS.secondary} />
          <StatCard label="NEURAL_DELAY" value="0.04s" icon="brain" subValue="Stable Sync" />
          <StatCard label="SYNC_ACCURACY" value="99.2%" icon="target" subValue="High Precision" />
        </View>

        <TechCard label="TERMINAL_ACCESS_STATUS">
          <View style={styles.terminalRow}>
            <Text style={styles.terminalKey}>ENCRYPTION</Text>
            <Text style={styles.terminalVal}>ACTIVE</Text>
          </View>
          <View style={styles.terminalRow}>
            <Text style={styles.terminalKey}>HAPTIC_LINK</Text>
            <Text style={[styles.terminalVal, { color: COLORS.success }]}>STABLE</Text>
          </View>
          <View style={styles.terminalRow}>
            <Text style={styles.terminalKey}>SIGNAL_LATENCY</Text>
            <Text style={styles.terminalVal}>{state.latency}ms</Text>
          </View>
          <View style={styles.terminalRow}>
            <Text style={styles.terminalKey}>PACKET_LOSS</Text>
            <Text style={[styles.terminalVal, { color: state.packetLoss > 0.05 ? COLORS.danger : COLORS.success }]}>
              {(state.packetLoss * 100).toFixed(2)}%
            </Text>
          </View>
        </TechCard>

        <TouchableOpacity style={styles.editBtn} onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="account-edit" size={20} color="black" />
          <Text style={styles.editBtnText}>EDIT_PROFILE_METADATA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <MaterialCommunityIcons name="power" size={20} color={COLORS.danger} />
          <Text style={styles.logoutBtnText}>TERMINATE_SESSION</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>EDIT_OPERATOR_DATA</Text>
            
            <Text style={styles.modalLabel}>NAME</Text>
            <TextInput 
              style={styles.modalInput} 
              value={editName} 
              onChangeText={setEditName} 
              placeholderTextColor={COLORS.textSecondary}
            />

            <Text style={styles.modalLabel}>ROLE</Text>
            <TextInput 
              style={styles.modalInput} 
              value={editRole} 
              onChangeText={setEditRole} 
              placeholderTextColor={COLORS.textSecondary}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtnText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>SAVE_CHANGES</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingTop: 20 },
  profileHeader: { alignItems: 'center', marginBottom: 30 },
  authenticatedLabel: { color: COLORS.primary, fontSize: 10, fontWeight: 'bold', marginBottom: 20, ...FONTS.tech },
  avatarContainer: {
    width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: COLORS.primary,
    padding: 5, marginBottom: 20, justifyContent: 'center', alignItems: 'center',
  },
  avatar: { width: '100%', height: '100%', borderRadius: 55 },
  pulseContainer: { position: 'absolute', bottom: 5, right: 5 },
  avatarBadge: {
    backgroundColor: COLORS.primary, width: 24, height: 24, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
  },
  statusDot: {
    position: 'absolute', top: 10, right: 10, width: 12, height: 12,
    borderRadius: 6, backgroundColor: COLORS.success, borderWidth: 2, borderColor: COLORS.background,
  },
  userName: { color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', ...FONTS.tech },
  roleContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  roleText: { color: COLORS.primary, fontSize: 10, fontWeight: 'bold', marginLeft: 8, ...FONTS.tech },
  idText: { color: COLORS.textSecondary, fontSize: 10, marginTop: 5, ...FONTS.tech },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 10 },
  smallCard: { width: '48%', marginBottom: 12 },
  statLabel: { color: COLORS.textSecondary, fontSize: 8, ...FONTS.tech },
  statIcon: { marginVertical: 8 },
  statValueLarge: { color: 'white', fontSize: 18, fontWeight: 'bold', ...FONTS.tech },
  statLine: { height: 2, width: '100%', marginVertical: 8 },
  statSub: { color: COLORS.textSecondary, fontSize: 8 },
  terminalRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  terminalKey: { color: COLORS.textSecondary, fontSize: 10, ...FONTS.tech },
  terminalVal: { color: COLORS.primary, fontSize: 10, fontWeight: 'bold', ...FONTS.tech },
  editBtn: {
    backgroundColor: COLORS.primary, height: 50, borderRadius: 8,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10,
  },
  editBtnText: { color: 'black', fontWeight: 'bold', fontSize: 12, marginLeft: 10, ...FONTS.tech },
  logoutBtn: {
    borderWidth: 1, borderColor: COLORS.danger, height: 50, borderRadius: 8,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 12,
  },
  logoutBtnText: { color: COLORS.danger, fontSize: 12, marginLeft: 10, ...FONTS.tech },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: COLORS.card, borderRadius: 15, padding: 20, borderWidth: 1, borderColor: COLORS.border },
  modalTitle: { color: COLORS.primary, fontSize: 18, fontWeight: 'bold', marginBottom: 20, ...FONTS.tech },
  modalLabel: { color: COLORS.textSecondary, fontSize: 10, marginBottom: 5, ...FONTS.tech },
  modalInput: { 
    backgroundColor: COLORS.background, color: 'white', height: 45, 
    borderRadius: 8, paddingHorizontal: 15, marginBottom: 20, borderWidth: 1, borderColor: COLORS.border,
    ...FONTS.tech,
  },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  cancelBtn: { padding: 10 },
  cancelBtnText: { color: COLORS.textSecondary, ...FONTS.tech },
  saveBtn: { backgroundColor: COLORS.primary, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  saveBtnText: { color: 'black', fontWeight: 'bold', ...FONTS.tech },
});
