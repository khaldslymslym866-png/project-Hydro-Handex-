import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusDot } from '../components/BaseComponents';

export default function LoginScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />
            <MaterialCommunityIcons name="robot-industrial" size={40} color={COLORS.primary} />
          </View>
        </View>
        <Text style={styles.title}>HydroHand X</Text>
        <Text style={styles.subtitle}>Welcome to H2_GLOVE OS</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.inputLabel}>OPERATOR ID</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Enter ID" 
            placeholderTextColor={COLORS.textSecondary} 
            style={styles.input} 
          />
          <MaterialCommunityIcons name="account" size={20} color={COLORS.textSecondary} />
        </View>

        <Text style={styles.inputLabel}>SECURITY KEY</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            secureTextEntry 
            placeholder="••••••••" 
            placeholderTextColor={COLORS.textSecondary} 
            style={styles.input} 
          />
          <MaterialCommunityIcons name="lock" size={20} color={COLORS.textSecondary} />
        </View>

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <MaterialCommunityIcons name="lightning-bolt" size={20} color="black" />
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.socialButton}>
          <MaterialCommunityIcons name="google" size={20} color={COLORS.textPrimary} />
          <Text style={styles.socialButtonText}>LOGIN WITH GOOGLE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <MaterialCommunityIcons name="apple" size={20} color={COLORS.textPrimary} />
          <Text style={styles.socialButtonText}>LOGIN WITH APPLE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <MaterialCommunityIcons name="facebook" size={20} color={COLORS.textPrimary} />
          <Text style={styles.socialButtonText}>LOGIN WITH FACEBOOK</Text>
        </TouchableOpacity>

        <View style={styles.formFooter}>
          <Text style={styles.forgotText}>FORGOT PASSWORD?</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <StatusDot color={COLORS.success} label="SYSTEM STATUS: READY" />
        <Text style={styles.footerInfo}>BUILD: 4.2.0.X  LOC: SECTOR_7</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoBox: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
  },
  cornerTopLeft: { position: 'absolute', top: -2, left: -2, width: 15, height: 15, borderTopWidth: 2, borderLeftWidth: 2, borderColor: COLORS.primary },
  cornerTopRight: { position: 'absolute', top: -2, right: -2, width: 15, height: 15, borderTopWidth: 2, borderRightWidth: 2, borderColor: COLORS.primary },
  cornerBottomLeft: { position: 'absolute', bottom: -2, left: -2, width: 15, height: 15, borderBottomWidth: 2, borderLeftWidth: 2, borderColor: COLORS.primary },
  cornerBottomRight: { position: 'absolute', bottom: -2, right: -2, width: 15, height: 15, borderBottomWidth: 2, borderRightWidth: 2, borderColor: COLORS.primary },
  title: {
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
    ...FONTS.tech,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 5,
    ...FONTS.tech,
  },
  formCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputLabel: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8,
    ...FONTS.tech,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 14,
    ...FONTS.tech,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  loginButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
    ...FONTS.tech,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.textSecondary,
    fontSize: 10,
    paddingHorizontal: 10,
    ...FONTS.tech,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  socialButtonText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    marginLeft: 10,
    ...FONTS.tech,
  },
  formFooter: {
    marginTop: 20,
    alignItems: 'center',
  },
  forgotText: {
    color: COLORS.textSecondary,
    fontSize: 10,
    marginBottom: 15,
    ...FONTS.tech,
  },
  footer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  footerInfo: {
    color: COLORS.textSecondary,
    fontSize: 10,
    ...FONTS.tech,
  }
});
