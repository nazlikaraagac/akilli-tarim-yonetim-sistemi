import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { MockApi, MOCK_USER } from '../services/MockApi';
import { fetchHavaDurumu } from '../services/WeatherService';
import { analyzeAllTarlalar } from '../services/AIService';
import { useTheme } from '../context/ThemeContext';

const AI_TIP_STYLE = {
  kritik: { bg: '#fef2f2', border: '#fca5a5', text: '#ef4444', badge: '#ef4444' },
  uyari:  { bg: '#fffbeb', border: '#fde68a', text: '#d97706', badge: '#f59e0b' },
  bilgi:  { bg: '#eff6ff', border: '#bfdbfe', text: '#2563eb', badge: '#3b82f6' },
  iyi:    { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d', badge: '#10b981' },
};

export default function DashboardScreen({ navigation }) {
  const { c } = useTheme();
  const [data, setData]           = useState(null);
  const [hava, setHava]           = useState(null);
  const [aiSonuc, setAiSonuc]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [bildirimler, setBildirimler] = useState([]);

  useFocusEffect(
    useCallback(() => {
      Promise.all([MockApi.getDashboardData(), fetchHavaDurumu()]).then(([res, havaDurumu]) => {
        setData(res);
        setBildirimler(res.bildirimler);
        setHava(havaDurumu);
        setAiSonuc(analyzeAllTarlalar(res.tarlalar));
        setLoading(false);
      });
    }, [])
  );

  const deleteNotif = (id) => { MockApi.deleteNotif(id); setBildirimler(p => p.filter(n => n.id !== id)); };
  const clearAll    = () => { MockApi.clearNotifs(); setBildirimler([]); };

  if (loading || !data) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: c.background }]}>
        <ActivityIndicator size="large" color={c.primary} />
        <Text style={{ marginTop: 10, color: c.textMuted }}>Yükleniyor...</Text>
      </SafeAreaView>
    );
  }

  const firstName = MOCK_USER.fullName.split(' ')[0];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Başlık */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: c.textMain }]}>Merhaba, {firstName} Bey 👋</Text>
          <Text style={[styles.subtitle, { color: c.textMuted }]}>İşletme: {data.ciftlik.ad}</Text>
        </View>

        {/* Hava Durumu */}
        {hava && (
          <View style={styles.weatherCard}>
            <View style={styles.weatherLeft}>
              <Text style={styles.weatherIcon}>{hava.icon}</Text>
              <View>
                <Text style={styles.weatherCity}>{hava.sehir}</Text>
                <Text style={styles.weatherDesc}>{hava.durum}</Text>
                {!hava.gercek && <Text style={styles.weatherWarn}>⚠️ Çevrimdışı veri</Text>}
              </View>
            </View>
            <View style={styles.weatherRight}>
              <Text style={styles.weatherTemp}>{hava.sicaklik}</Text>
              <Text style={styles.weatherExtra}>💧 {hava.nem}  💨 {hava.ruzgar}</Text>
            </View>
          </View>
        )}

        {/* İstatistikler */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: c.card, borderColor: c.primary, borderWidth: 2 }]}>
            <Text style={[styles.statNum, { color: c.primary }]}>{data.stats.tarlaSayisi}</Text>
            <Text style={[styles.statLabel, { color: c.textMuted }]}>Aktif Tarla</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: c.card, borderColor: c.border }]}>
            <Text style={[styles.statNum, { color: c.textMain }]}>{data.stats.sensorSayisi}</Text>
            <Text style={[styles.statLabel, { color: c.textMuted }]}>IoT Sensör</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: c.card, borderColor: '#3b82f6', borderWidth: 2 }]}>
            <Text style={[styles.statNum, { color: '#3b82f6' }]}>57.5K</Text>
            <Text style={[styles.statLabel, { color: c.textMuted }]}>m² Alan</Text>
          </View>
        </View>

        {/* ── AI Analiz Kartı ── */}
        {aiSonuc && (
          <View style={[styles.aiCard, { backgroundColor: c.card, borderColor: c.border }]}>
            {/* Başlık */}
            <View style={styles.aiHeader}>
              <View style={styles.aiTitleRow}>
                <Text style={styles.aiIcon}>🤖</Text>
                <View>
                  <Text style={[styles.aiTitle, { color: c.textMain }]}>Yapay Zeka Analizi</Text>
                  <Text style={[styles.aiSubtitle, { color: c.textMuted }]}>Scikit-learn karar ağacı modeli</Text>
                </View>
              </View>
              <View style={styles.aiLiveBadge}>
                <View style={styles.aiLiveDot} />
                <Text style={styles.aiLiveText}>CANLI</Text>
              </View>
            </View>

            {/* Özet sayaçlar */}
            <View style={styles.aiSummaryRow}>
              {aiSonuc.kritikler.length > 0 && (
                <View style={[styles.aiSummaryBox, { backgroundColor: '#fef2f2' }]}>
                  <Text style={[styles.aiSummaryNum, { color: '#ef4444' }]}>{aiSonuc.kritikler.length}</Text>
                  <Text style={[styles.aiSummaryLabel, { color: '#ef4444' }]}>Kritik</Text>
                </View>
              )}
              {aiSonuc.uyarilar.length > 0 && (
                <View style={[styles.aiSummaryBox, { backgroundColor: '#fffbeb' }]}>
                  <Text style={[styles.aiSummaryNum, { color: '#d97706' }]}>{aiSonuc.uyarilar.length}</Text>
                  <Text style={[styles.aiSummaryLabel, { color: '#d97706' }]}>Uyarı</Text>
                </View>
              )}
              <View style={[styles.aiSummaryBox, { backgroundColor: '#f0fdf4' }]}>
                <Text style={[styles.aiSummaryNum, { color: '#15803d' }]}>{aiSonuc.iyiSayisi}</Text>
                <Text style={[styles.aiSummaryLabel, { color: '#15803d' }]}>İdeal</Text>
              </View>
            </View>

            {/* Öneriler */}
            {[...aiSonuc.kritikler, ...aiSonuc.uyarilar].slice(0, 3).map((o, i) => {
              const ts = AI_TIP_STYLE[o.tip] ?? AI_TIP_STYLE.bilgi;
              return (
                <View key={i} style={[styles.aiOneriCard, { backgroundColor: ts.bg, borderColor: ts.border }]}>
                  <View style={styles.aiOneriLeft}>
                    <Text style={styles.aiOneriIkon}>{o.ikon}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.aiOneriTarla, { color: c.textMuted }]}>{o.tarla}</Text>
                      <Text style={[styles.aiOneriMesaj, { color: ts.text }]}>{o.mesaj}</Text>
                      <Text style={[styles.aiOneriDetay, { color: c.textMuted }]}>{o.detay}</Text>
                    </View>
                  </View>
                  <View style={[styles.aiGuvenBadge, { backgroundColor: ts.badge }]}>
                    <Text style={styles.aiGuvenText}>%{o.guven}</Text>
                  </View>
                </View>
              );
            })}

            {aiSonuc.kritikler.length === 0 && aiSonuc.uyarilar.length === 0 && (
              <View style={[styles.aiOneriCard, { backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }]}>
                <Text style={{ fontSize: 14, color: '#15803d', fontWeight: '600' }}>
                  ✅ Tüm tarlalar ideal koşullarda. Herhangi bir müdahale önerilmiyor.
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Bildirimler */}
        <View style={styles.sectionRow}>
          <Text style={[styles.sectionTitle, { color: c.textMain }]}>Bildirimler 🔔</Text>
          {bildirimler.length > 0 && (
            <TouchableOpacity onPress={clearAll}>
              <Text style={[styles.clearAll, { color: c.danger }]}>Tümünü Sil</Text>
            </TouchableOpacity>
          )}
        </View>

        {bildirimler.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="checkmark-circle" size={32} color={c.primary} />
            <Text style={[styles.emptyText, { color: c.textMuted }]}>Tüm bildirimler okundu.</Text>
          </View>
        ) : bildirimler.map(n => (
          <View key={n.id} style={[styles.notifCard, { backgroundColor: n.isWarn ? c.warnBg : c.card, borderColor: n.isWarn ? c.warnBorder : c.border }]}>
            <Ionicons name={n.isWarn ? 'warning' : 'information-circle'} size={22} color={n.isWarn ? c.danger : c.primary} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={[styles.notifText, { color: c.textMain }]}>{n.text}</Text>
              <Text style={[styles.notifTime, { color: c.textMuted }]}>{n.time}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteNotif(n.id)} style={{ padding: 4 }}>
              <Ionicons name="close" size={18} color={c.textMuted} />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: c.primary }]} onPress={() => navigation.navigate('IoT Paneli')}>
          <Text style={styles.actionBtnText}>Tarlaları ve Sensörleri Yönet</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { padding: 20 },
  header: { marginBottom: 20 },
  greeting: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14, marginTop: 5 },

  weatherCard: { backgroundColor: '#0f766e', borderRadius: 16, padding: 18, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  weatherLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  weatherIcon: { fontSize: 38 },
  weatherCity: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  weatherDesc: { fontSize: 12, color: '#99f6e4', marginTop: 2 },
  weatherWarn: { fontSize: 10, color: '#fde68a', marginTop: 2 },
  weatherRight: { alignItems: 'flex-end' },
  weatherTemp: { fontSize: 30, fontWeight: '800', color: '#fff' },
  weatherExtra: { fontSize: 11, color: '#99f6e4', marginTop: 4 },

  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statCard: { flex: 1, paddingVertical: 18, borderRadius: 16, alignItems: 'center', borderWidth: 1, elevation: 1 },
  statNum: { fontSize: 21, fontWeight: '800', marginBottom: 4 },
  statLabel: { fontSize: 10, fontWeight: '700', textAlign: 'center' },

  // AI Kart
  aiCard: { borderRadius: 16, padding: 16, marginBottom: 22, borderWidth: 1, elevation: 2 },
  aiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  aiTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  aiIcon: { fontSize: 26 },
  aiTitle: { fontSize: 15, fontWeight: 'bold' },
  aiSubtitle: { fontSize: 11, marginTop: 1 },
  aiLiveBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#ecfdf5', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, borderWidth: 1, borderColor: '#6ee7b7' },
  aiLiveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#10b981' },
  aiLiveText: { fontSize: 10, color: '#065f46', fontWeight: '800', letterSpacing: 1 },
  aiSummaryRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  aiSummaryBox: { flex: 1, alignItems: 'center', padding: 10, borderRadius: 10 },
  aiSummaryNum: { fontSize: 22, fontWeight: '900' },
  aiSummaryLabel: { fontSize: 11, fontWeight: '700', marginTop: 2 },
  aiOneriCard: { borderRadius: 12, padding: 12, marginBottom: 8, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  aiOneriLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, flex: 1 },
  aiOneriIkon: { fontSize: 20, marginTop: 1 },
  aiOneriTarla: { fontSize: 11, fontWeight: '600', marginBottom: 2 },
  aiOneriMesaj: { fontSize: 14, fontWeight: 'bold' },
  aiOneriDetay: { fontSize: 11, marginTop: 2 },
  aiGuvenBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, minWidth: 48, alignItems: 'center', marginLeft: 8 },
  aiGuvenText: { color: '#fff', fontSize: 12, fontWeight: '800' },

  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  clearAll: { fontSize: 13, fontWeight: '600' },
  emptyBox: { alignItems: 'center', padding: 24, gap: 8 },
  emptyText: { fontSize: 14 },
  notifCard: { flexDirection: 'row', padding: 14, borderRadius: 12, marginBottom: 10, borderWidth: 1, alignItems: 'center' },
  notifText: { fontSize: 13, fontWeight: '500', lineHeight: 18 },
  notifTime: { fontSize: 11, marginTop: 4 },
  actionBtn: { flexDirection: 'row', padding: 16, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 15, gap: 10 },
  actionBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
