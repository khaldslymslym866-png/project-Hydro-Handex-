import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  ScrollView, ActivityIndicator, KeyboardAvoidingView, 
  Platform, Animated, Alert 
} from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusDot } from '../components/BaseComponents';
import { useStore } from '../store/useStore';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [operatorId, setOperatorId] = useState('');
  const [securityKey, setSecurityKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [isBiometricActive, setBiometricActive] = useState(false);
  const { login, isAuthenticated } = useStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace('MainTabs');
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    if (!operatorId || !securityKey) {
      Alert.alert('ACCESS_DENIED', 'MISSING_CREDENTIALS');
      return;
    }

    setLoading(true);
    const success = await login(operatorId, securityKey);
    setLoading(false);

    if (success) {
      navigation.replace('MainTabs');
    } else {
      Alert.alert('AUTH_ERROR', 'INVALID_OPERATOR_SIGNATURE');
    }
  };

  const simulateBiometric = () => {
    setBiometricActive(true);
    setTimeout(() => {
      setBiometricActive(false);
      handleLogin();
    }, 2000);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <MaterialCommunityIcons name="robot-industrial" size={40} color={COLORS.primary} />
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />
          </View>
          <Text style={styles.title}>H2_GLOVE OS</Text>
          <Text style={styles.subtitle}>SECURED_OPERATING_SYSTEM_V4.2</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>OPERATOR_SIGNATURE_ID</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              placeholder="ENTER_ID" 
              placeholderTextColor={COLORS.textSecondary} 
              style={styles.input}
              value={operatorId}
              onChangeText={setOperatorId}
            />
            <MaterialCommunityIcons name="account-circle" size={20} color={COLORS.primary} />
          </View>

          <Text style={styles.inputLabel}>SECURITY_ENCRYPTION_KEY</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              secureTextEntry 
              placeholder="••••••••" 
              placeholderTextColor={COLORS.textSecondary} 
              style={styles.input}
              value={securityKey}
              onChangeText={setSecurityKey}
            />
            <MaterialCommunityIcons name="lock-pattern" size={20} color={COLORS.primary} />
          </View>

          <TouchableOpacity 
            style={[styles.loginButton, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="black" />
            ) : (
              <>
                <MaterialCommunityIcons name="lightning-bolt" size={20} color="black" />
                <Text style={styles.loginButtonText}>INITIATE_AUTH_SEQUENCE</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.biometricBtn}
            onPress={simulateBiometric}
          >
            <MaterialCommunityIcons 
              name={isBiometricActive ? "fingerprint-off" : "fingerprint"} 
              size={30} 
              color={isBiometricActive ? COLORS.danger : COLORS.primary} 
            />
            <Text style={[styles.biometricText, isBiometricActive && { color: COLORS.danger }]}>
              {isBiometricActive ? 'SCANNING_RETINA...' : 'BIOMETRIC_ACCESS'}
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>SECURE_OAUTH_LINK</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}><MaterialCommunityIcons name="google" size={20} color="white" /></TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}><MaterialCommunityIcons name="apple" size={20} color="white" /></TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}><MaterialCommunityIcons name="facebook" size={20} color="white" /></TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <StatusDot color={COLORS.success} label="ENCRYPTION: AES_256" />
            <Text style={styles.footerInfo}>H2_CORE_ACTIVE</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: COLORS.background, paddingHorizontal: 20, paddingTop: 60, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 40 },
  logoBox: {
    width: 80, height: 80, backgroundColor: COLORS.card,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border,
  },
  cornerTopLeft: { position: 'absolute', top: -2, left: -2, width: 15, height: 15, borderTopWidth: 2, borderLeftWidth: 2, borderColor: COLORS.primary },
  cornerTopRight: { position: 'absolute', top: -2, right: -2, width: 15, height: 15, borderTopWidth: 2, borderRightWidth: 2, borderColor: COLORS.primary },
  cornerBottomLeft: { position: 'absolute', bottom: -2, left: -2, width: 15, height: 15, borderBottomWidth: 2, borderLeftWidth: 2, borderColor: COLORS.primary },
  cornerBottomRight: { position: 'absolute', bottom: -2, right: -2, width: 15, height: 15, borderBottomWidth: 2, borderRightWidth: 2, borderColor: COLORS.primary },
  title: { color: COLORS.textPrimary, fontSize: 28, fontWeight: 'bold', ...FONTS.tech },
  subtitle: { color: COLORS.textSecondary, fontSize: 10, marginTop: 5, ...FONTS.tech },
  formCard: { backgroundColor: COLORS.card, borderRadius: 12, padding: 20, borderWidth: 1, borderColor: COLORS.border },
  inputLabel: { color: COLORS.primary, fontSize: 9, fontWeight: 'bold', marginBottom: 8, ...FONTS.tech },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background,
    borderRadius: 8, paddingHorizontal: 12, height: 50, marginBottom: 20, borderWidth: 1, borderColor: COLORS.border,
  },
  input: { flex: 1, color: COLORS.textPrimary, fontSize: 14, ...FONTS.tech },
  loginButton: {
    backgroundColor: COLORS.primary, height: 50, borderRadius: 8,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10,
    shadowColor: COLORS.primary, shadowRadius: 10, elevation: 5,
  },
  loginButtonText: { color: 'black', fontWeight: 'bold', fontSize: 12, marginLeft: 8, ...FONTS.tech },
  biometricBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 25,
    padding: 10, borderWidth: 1, borderColor: 'rgba(0,255,255,0.2)', borderRadius: 8,
  },
  biometricText: { color: COLORS.primary, fontSize: 10, marginLeft: 10, ...FONTS.tech },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 30 },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { color: COLORS.textSecondary, fontSize: 8, paddingHorizontal: 10, ...FONTS.tech },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
  socialBtn: {
    width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: COLORS.border,
    justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)',
  },
  footer: { marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerInfo: { color: COLORS.textSecondary, fontSize: 8, ...FONTS.tech }
});
