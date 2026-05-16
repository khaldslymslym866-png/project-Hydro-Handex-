import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { COLORS, FONTS } from '../constants/theme';
import { Header } from '../components/BaseComponents';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function WebPortalScreen() {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('https://www.google.com'); // يمكن تغيير الرابط لأي صفحة تقنية

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Header />
      
      <View style={styles.addressBar}>
        <MaterialCommunityIcons name="shield-lock" size={16} color={COLORS.primary} />
        <Text style={styles.urlText}>SECURE_LINK: {url}</Text>
        <TouchableOpacity onPress={() => setLoading(true)}>
          <MaterialCommunityIcons name="refresh" size={18} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.webContainer}>
        {Platform.OS !== 'web' ? (
          <WebView 
            source={{ uri: url }} 
            style={styles.webview}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            backgroundColor={COLORS.background}
          />
        ) : (
          <View style={styles.webFallback}>
            <MaterialCommunityIcons name="web" size={50} color={COLORS.primary} />
            <Text style={styles.fallbackText}>WEB_VIEW IS NATIVE ONLY.</Text>
            <Text style={styles.fallbackSub}>OPEN LINK IN NEW TAB FOR DESKTOP WORKFLOW.</Text>
            <TouchableOpacity onPress={() => window.open(url, '_blank')} style={styles.openBtn}>
              <Text style={styles.openBtnText}>OPEN EXTERNAL TERMINAL</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>ESTABLISHING ENCRYPTED CONNECTION...</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>H2_GLOVE BROWSER ENGINE v1.0</Text>
        <View style={styles.statusDot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    margin: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  urlText: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 10,
    marginLeft: 10,
    ...FONTS.tech,
  },
  webContainer: {
    flex: 1,
    backgroundColor: COLORS.card,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  webview: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.primary,
    fontSize: 10,
    marginTop: 15,
    ...FONTS.tech,
  },
  footer: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 8,
    ...FONTS.tech,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginLeft: 8,
  },
  webFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
  },
  fallbackText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    ...FONTS.tech,
  },
  fallbackSub: {
    color: COLORS.textSecondary,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
    ...FONTS.tech,
  },
  openBtn: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 5,
  },
  openBtnText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
    ...FONTS.tech,
  }
});
