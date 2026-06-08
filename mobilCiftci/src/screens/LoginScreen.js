import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, Alert, SafeAreaView, KeyboardAvoidingView,
  Platform, StatusBar,
} from 'react-native';
import { MockApi } from '../services/MockApi';

/* ── Geometrik + Yaprak Logo ── */
function AppLogo() {
  return (
    <View style={L.root}>
      {/* Altıgen dış çerçeve (3 kesişen dikdörtgen tekniği) */}
      <View style={L.hexWrap}>
        <View style={[L.hexRect, L.hexRect0]} />
        <View style={[L.hexRect, L.hexRect60]} />
        <View style={[L.hexRect, L.hexRect120]} />

        {/* Gövde */}
        <View style={L.stem} />
        {/* Sol yaprak */}
        <View style={L.leafL} />
        {/* Sağ yaprak */}
        <View style={L.leafR} />
        {/* Toprak şeridi */}
        <View style={L.soil} />
        {/* Merkez ışıma noktası */}
        <View style={L.centerDot} />
      </View>

      {/* 6 köşe noktası */}
      {[0,60,120,180,240,300].map(deg => {
        const r = 44;
        const rad = (deg * Math.PI) / 180;
        const x = r * Math.cos(rad);
        const y = r * Math.sin(rad);
        return (
          <View key={deg} style={[L.hexDot, { transform: [{ translateX: x }, { translateY: y }] }]} />
        );
      })}
    </View>
  );
}

const HEX = 46; // yarı kenar
const L = StyleSheet.create({
  root: { width: 110, height: 110, alignItems: 'center', justifyContent: 'center' },
  hexWrap: {
    width: HEX * 2, height: HEX * 2, borderRadius: HEX,
    backgroundColor: '#065f46',
    alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 2.5, borderColor: '#34d399',
  },
  hexRect: {
    position: 'absolute',
    width: HEX * 2 - 8, height: HEX * 0.9,
    backgroundColor: 'rgba(52,211,153,0.13)',
    borderRadius: 4,
  },
  hexRect0:   { transform: [{ rotate: '0deg' }] },
  hexRect60:  { transform: [{ rotate: '60deg' }] },
  hexRect120: { transform: [{ rotate: '120deg' }] },
  stem: {
    position: 'absolute', bottom: 18, width: 4, height: 26,
    backgroundColor: '#6ee7b7', borderRadius: 2,
  },
  leafL: {
    position: 'absolute', bottom: 30, left: HEX - 22,
    width: 20, height: 11, borderRadius: 10,
    backgroundColor: '#34d399',
    transform: [{ rotate: '40deg' }],
  },
  leafR: {
    position: 'absolute', bottom: 30, right: HEX - 22,
    width: 20, height: 11, borderRadius: 10,
    backgroundColor: '#34d399',
    transform: [{ rotate: '-40deg' }],
  },
  soil: {
    position: 'absolute', bottom: 0,
    width: HEX * 2, height: 14,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  centerDot: {
    position: 'absolute', top: 18,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#a7f3d0',
  },
  hexDot: {
    position: 'absolute', width: 6, height: 6, borderRadius: 3,
    backgroundColor: '#34d399', opacity: 0.7,
  },
});

/* ── Ana Ekran ── */
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Uyarı', 'Lütfen e-posta ve şifrenizi giriniz.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await MockApi.login(email.trim(), password);
      if (res.success) navigation.replace('MainTabs', { user: res.user });
    } catch (e) {
      Alert.alert('Giriş Başarısız', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#022c22" />
      <View style={s.bgTop} />
      <View style={s.circle1} />
      <View style={s.circle2} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.kav}>
        <View style={s.header}>
          <AppLogo />
          <Text style={s.appName}>AKILLI TARIM</Text>
          <Text style={s.appSub}>Çiftçi Yönetim Sistemi</Text>
        </View>

        <View style={s.card}>
          <Text style={s.cardTitle}>Hesabınıza Giriş Yapın</Text>

          <Text style={s.label}>E-POSTA ADRESİ</Text>
          <TextInput
            style={[s.input, focused === 'email' && s.inputFocused]}
            value={email} onChangeText={setEmail}
            placeholder="Kullanıcı adı veya e-posta giriniz" placeholderTextColor="#94a3b8"
            autoCapitalize="none"
            onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
          />

          <Text style={s.label}>ŞİFRE</Text>
          <TextInput
            style={[s.input, focused === 'pass' && s.inputFocused]}
            value={password} onChangeText={setPassword}
            placeholder="Şifre giriniz" placeholderTextColor="#94a3b8"
            secureTextEntry
            onFocus={() => setFocused('pass')} onBlur={() => setFocused(null)}
          />

          <TouchableOpacity
            style={[s.btn, isLoading && s.btnDisabled]}
            onPress={handleLogin} disabled={isLoading} activeOpacity={0.85}
          >
            {isLoading
              ? <ActivityIndicator color="#fff" />
              : <><Text style={s.btnText}>Giriş Yap</Text><Text style={s.btnArrow}>→</Text></>
            }
          </TouchableOpacity>
        </View>

        <Text style={s.team}>Bu sistem Sıfır Hata Timi tarafından tasarlanmıştır.</Text>
        <Text style={s.footer}>© 2026 Akıllı Tarım Sistemi</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#022c22' },
  bgTop: { position: 'absolute', top: 0, left: 0, right: 0, height: 280, backgroundColor: '#064e3b' },
  circle1: { position: 'absolute', top: -70, right: -70, width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(52,211,153,0.12)' },
  circle2: { position: 'absolute', top: 140, left: -90, width: 260, height: 260, borderRadius: 130, backgroundColor: 'rgba(16,185,129,0.08)' },
  kav: { flex: 1, justifyContent: 'center', paddingHorizontal: 26 },

  header: { alignItems: 'center', marginBottom: 36 },
  appName: { fontSize: 30, fontWeight: '900', color: '#fff', letterSpacing: 5, marginTop: 18 },
  appSub: { fontSize: 13, color: '#6ee7b7', fontWeight: '500', marginTop: 5, letterSpacing: 1 },

  card: { backgroundColor: '#fff', borderRadius: 24, padding: 28, elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.18, shadowRadius: 20 },
  cardTitle: { fontSize: 17, fontWeight: 'bold', color: '#1e293b', textAlign: 'center', marginBottom: 24 },

  label: { fontSize: 11, fontWeight: '700', color: '#64748b', marginBottom: 8, letterSpacing: 0.8 },
  input: { backgroundColor: '#f8fafc', height: 52, borderRadius: 12, paddingHorizontal: 16, fontSize: 15, color: '#1e293b', borderWidth: 1.5, borderColor: '#e2e8f0', marginBottom: 16 },
  inputFocused: { borderColor: '#10b981', backgroundColor: '#f0fdf4' },

  btn: { backgroundColor: '#10b981', height: 56, borderRadius: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 4, elevation: 4, shadowColor: '#10b981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8 },
  btnDisabled: { backgroundColor: '#6ee7b7' },
  btnText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  btnArrow: { color: '#d1fae5', fontSize: 20, fontWeight: 'bold' },

  team: { textAlign: 'center', color: '#6ee7b7', fontSize: 12, fontStyle: 'italic', marginTop: 22 },
  footer: { textAlign: 'center', color: 'rgba(110,231,183,0.45)', fontSize: 11, marginTop: 5 },
});
