import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MockApi } from '../services/MockApi';
import { analyzeTarla } from '../services/AIService';
import { useTheme } from '../context/ThemeContext';

const GUNCELLEME_SURESI = 4000; // 4 saniyede bir sensör güncellenir

function parseNem(str) { return parseInt(str.replace('%', '')) || 0; }
function parseSicaklik(str) { return parseInt(str.replace('°C', '')) || 0; }

// Hafif rastgele değişim: mevcut değerin ±2 etrafında gezin
function simuleEt(mevcut, min, max, adim = 2) {
  const delta = (Math.random() - 0.5) * adim * 2;
  return Math.max(min, Math.min(max, Math.round(mevcut + delta)));
}

function LiveDot() {
  const anim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 0.2, duration: 700, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 1,   duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return <Animated.View style={[styles.liveDot, { opacity: anim }]} />;
}

export default function IoTScreen() {
  const { c } = useTheme();
  const [tarlalar, setTarlalar] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [actionId, setActionId] = useState(null);
  const [sonGuncelleme, setSonGuncelleme] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    MockApi.getDashboardData().then(res => {
      setTarlalar(res.tarlalar);
      setLoading(false);
      setSonGuncelleme(simdiSaat());
    });
    return () => clearInterval(intervalRef.current);
  }, []);

  // Canlı sensör simülasyonu — her GUNCELLEME_SURESI ms'de bir değerleri güncelle
  useEffect(() => {
    if (loading) return;
    intervalRef.current = setInterval(() => {
      setTarlalar(prev => prev.map(t => {
        if (t.durum === 'Sulanıyor') return t; // sulama varsa sabit tut
        const yeniNem = simuleEt(parseNem(t.nem), 10, 75, 1.5);
        const yeniSicak = simuleEt(parseSicaklik(t.sicaklik), 14, 38, 1);
        const isWarning = yeniNem < 30;
        return {
          ...t,
          nem: `%${yeniNem}`,
          sicaklik: `${yeniSicak}°C`,
          durum: isWarning ? 'Su Bekleniyor!' : (yeniNem >= 50 ? 'İdeal' : 'Stabil'),
          isWarning,
        };
      }));
      setSonGuncelleme(simdiSaat());
    }, GUNCELLEME_SURESI);
    return () => clearInterval(intervalRef.current);
  }, [loading]);

  const handleStartEngine = async (tarlaId, tarlaAd) => {
    setActionId(tarlaId);
    try {
      const res = await MockApi.startEngine(tarlaId);
      Alert.alert('✅ Başarılı', `${tarlaAd} için ${res.message}`);
      setTarlalar(prev => prev.map(t =>
        t.id === tarlaId ? { ...t, nem: '%60', durum: 'Sulanıyor', isWarning: false } : t
      ));
    } catch {
      Alert.alert('Hata', 'Motor çalıştırılamadı!');
    } finally {
      setActionId(null);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: c.background }]}>
        <ActivityIndicator size="large" color={c.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Başlık */}
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.title, { color: c.textMain }]}>📡 Canlı IoT Paneli</Text>
            <Text style={[styles.subtitle, { color: c.textMuted }]}>Sensörler her 4 saniyede güncellenir</Text>
          </View>
          <View style={[styles.liveBadge, { backgroundColor: '#ecfdf5', borderColor: '#6ee7b7' }]}>
            <LiveDot />
            <Text style={styles.liveText}>CANLI</Text>
          </View>
        </View>

        <Text style={[styles.lastUpdate, { color: c.textMuted }]}>Son güncelleme: {sonGuncelleme}</Text>

        {tarlalar.map((farm) => {
          const aiOneriler = analyzeTarla(farm);
          const ilkOneri = aiOneriler[0];
          return (
            <View key={farm.id} style={[styles.card, { backgroundColor: c.card, borderColor: farm.isWarning ? '#fca5a5' : c.border, borderWidth: farm.isWarning ? 2 : 1 }]}>

              <View style={styles.cardHeader}>
                <Text style={[styles.farmName, { color: c.textMain }]}>{farm.ad}</Text>
                <View style={[styles.statusBadge, farm.isWarning ? { backgroundColor: c.warnBg } : { backgroundColor: '#ecfdf5' }]}>
                  <Text style={[styles.statusText, { color: farm.isWarning ? c.danger : '#10b981' }]}>{farm.durum}</Text>
                </View>
              </View>

              {/* Sensör ID rozetleri */}
              <View style={styles.sensorIdRow}>
                <View style={[styles.sensorIdBadge, { backgroundColor: c.inputBg, borderColor: c.border }]}>
                  <Text style={[styles.sensorIdText, { color: c.textMuted }]}>📡 S-{String(farm.id * 2 - 1).padStart(3,'0')} · Nem Sensörü</Text>
                </View>
                <View style={[styles.sensorIdBadge, { backgroundColor: c.inputBg, borderColor: c.border }]}>
                  <Text style={[styles.sensorIdText, { color: c.textMuted }]}>📡 S-{String(farm.id * 2).padStart(3,'0')} · Sıcaklık Sensörü</Text>
                </View>
              </View>

              {/* Sensör değerleri */}
              <View style={[styles.dataRow, { backgroundColor: c.background }]}>
                <View style={styles.dataBox}>
                  <Text style={[styles.dataVal, { color: c.textMain }]}>{farm.sicaklik}</Text>
                  <Text style={[styles.dataLabel, { color: c.textMuted }]}>🌡️ Sıcaklık</Text>
                </View>
                <View style={[styles.dataDivider, { backgroundColor: c.border }]} />
                <View style={styles.dataBox}>
                  <Text style={[styles.dataVal, { color: farm.isWarning ? c.danger : c.textMain }]}>{farm.nem}</Text>
                  <Text style={[styles.dataLabel, { color: c.textMuted }]}>💧 Toprak Nemi</Text>
                </View>
                <View style={[styles.dataDivider, { backgroundColor: c.border }]} />
                <View style={styles.dataBox}>
                  <Text style={[styles.dataVal, { color: c.textMain }]}>{farm.ph}</Text>
                  <Text style={[styles.dataLabel, { color: c.textMuted }]}>🧪 pH</Text>
                </View>
              </View>

              {/* AI Önerisi */}
              <View style={[styles.aiRow, { backgroundColor: ilkOneri.tip === 'iyi' ? '#f0fdf4' : ilkOneri.tip === 'kritik' ? '#fef2f2' : '#fffbeb' }]}>
                <Text style={styles.aiRowIcon}>{ilkOneri.ikon}</Text>
                <Text style={[styles.aiRowText, { color: ilkOneri.tip === 'iyi' ? '#15803d' : ilkOneri.tip === 'kritik' ? '#ef4444' : '#d97706' }]}>
                  AI: {ilkOneri.mesaj}
                </Text>
                <Text style={[styles.aiRowGuven, { color: c.textMuted }]}>%{ilkOneri.guven}</Text>
              </View>

              {/* Aksiyon butonu */}
              {farm.durum === 'Sulanıyor' ? (
                <View style={styles.sulaniyorRow}>
                  <Ionicons name="water" size={17} color="#15803d" />
                  <Text style={styles.sulaniyorText}>Sulama Aktif — Motor Çalışıyor</Text>
                </View>
              ) : farm.isWarning ? (
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: c.primary }]}
                  onPress={() => handleStartEngine(farm.id, farm.ad)}
                  disabled={actionId === farm.id}
                >
                  {actionId === farm.id
                    ? <ActivityIndicator color="#fff" />
                    : <><Ionicons name="water" size={17} color="#fff" /><Text style={styles.actionBtnText}>Motoru Başlat (Sulama)</Text></>
                  }
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: c.inputBg, borderWidth: 1, borderColor: c.border }]}
                  onPress={() => Alert.alert(`📊 ${farm.ad}`, `🌡️ ${farm.sicaklik}  💧 ${farm.nem}  🧪 pH ${farm.ph}\n\n✅ Tüm değerler normal aralıkta.`, [{ text: 'Tamam' }])}
                >
                  <Text style={[styles.actionBtnText, { color: c.textMuted }]}>Detaylı Rapor</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

function simdiSaat() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { padding: 20, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  title: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { fontSize: 12, marginTop: 3 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10b981' },
  liveText: { fontSize: 11, color: '#065f46', fontWeight: '800', letterSpacing: 1 },
  lastUpdate: { fontSize: 11, marginBottom: 18 },
  card: { padding: 16, borderRadius: 16, marginBottom: 16, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  farmName: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  statusText: { fontWeight: 'bold', fontSize: 12 },
  sensorIdRow: { flexDirection: 'row', gap: 6, marginBottom: 10, flexWrap: 'wrap' },
  sensorIdBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1 },
  sensorIdText: { fontSize: 10, fontWeight: '600' },
  dataRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 14, borderRadius: 12, marginBottom: 12 },
  dataBox: { flex: 1, alignItems: 'center' },
  dataDivider: { width: 1, marginVertical: 4 },
  dataVal: { fontSize: 20, fontWeight: '800' },
  dataLabel: { fontSize: 11, marginTop: 4, fontWeight: '600' },
  aiRow: { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 10, marginBottom: 12, gap: 8 },
  aiRowIcon: { fontSize: 16 },
  aiRowText: { flex: 1, fontSize: 13, fontWeight: '700' },
  aiRowGuven: { fontSize: 11, fontWeight: '600' },
  sulaniyorRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#dcfce7', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#86efac' },
  sulaniyorText: { color: '#15803d', fontWeight: 'bold', fontSize: 14 },
  actionBtn: { flexDirection: 'row', paddingVertical: 13, borderRadius: 12, alignItems: 'center', justifyContent: 'center', gap: 8 },
  actionBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});
