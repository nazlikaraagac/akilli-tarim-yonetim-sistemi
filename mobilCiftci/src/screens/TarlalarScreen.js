import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { MockApi } from '../services/MockApi';
import { useTheme } from '../context/ThemeContext';

export default function TarlalarScreen({ navigation }) {
  const { c } = useTheme();
  const [tarlalar, setTarlalar] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      MockApi.getTarlalar().then(data => {
        setTarlalar(data);
        setLoading(false);
      });
    }, [])
  );

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
        <View style={styles.header}>
          <Text style={[styles.title, { color: c.textMain }]}>🌾 Tarlalarım</Text>
          <Text style={[styles.subtitle, { color: c.textMuted }]}>İşletmenize ait tüm araziler.</Text>
        </View>

        {tarlalar.map((tarla) => (
          <TouchableOpacity
            key={tarla.id}
            style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('TarlaDetay', { tarla })}
          >
            <Image source={{ uri: tarla.image }} style={styles.image} />
            <View style={styles.cardBody}>
              <View style={styles.cardHeader}>
                <Text style={[styles.tarlaName, { color: c.textMain }]}>{tarla.ad}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{tarla.urun}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Ionicons name="scan-outline" size={15} color={c.textMuted} />
                  <Text style={[styles.detailText, { color: c.textMuted }]}>{tarla.alan}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="earth-outline" size={15} color={c.textMuted} />
                  <Text style={[styles.detailText, { color: c.textMuted }]}>{tarla.toprak}</Text>
                </View>
              </View>

              <View style={[styles.dateRow, { backgroundColor: c.inputBg }]}>
                <Text style={[styles.dateText, { color: c.textMuted }]}>Ekim: <Text style={{ fontWeight: 'bold', color: c.textMain }}>{tarla.ekim}</Text></Text>
                <Text style={[styles.dateText, { color: c.textMuted }]}>Hasat: <Text style={{ fontWeight: 'bold', color: c.textMain }}>{tarla.hasat}</Text></Text>
              </View>

              <View style={[styles.sensorRow, tarla.isWarning ? styles.sensorRowWarn : { backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }]}>
                <Text style={[styles.sensorText, { color: c.textMain }]}>🌡️ {tarla.sicaklik}  💧 {tarla.nem}</Text>
                <Text style={[styles.sensorStatus, tarla.isWarning ? styles.statusWarn : styles.statusOk]}>
                  {tarla.durum}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { padding: 20 },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14, marginTop: 5 },
  card: { borderRadius: 16, overflow: 'hidden', marginBottom: 20, borderWidth: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  image: { width: '100%', height: 150, backgroundColor: '#e2e8f0' },
  cardBody: { padding: 15 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  tarlaName: { fontSize: 17, fontWeight: 'bold' },
  badge: { backgroundColor: '#fef9c3', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: '#fef08a' },
  badgeText: { color: '#a16207', fontWeight: 'bold', fontSize: 12 },
  detailRow: { flexDirection: 'row', gap: 15, marginBottom: 10 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  detailText: { fontSize: 13, fontWeight: '600' },
  dateRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderRadius: 8, marginBottom: 10 },
  dateText: { fontSize: 12 },
  sensorRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderRadius: 8, borderWidth: 1 },
  sensorRowWarn: { backgroundColor: '#fef2f2', borderColor: '#fca5a5' },
  sensorText: { fontSize: 13, fontWeight: '600' },
  sensorStatus: { fontSize: 11, fontWeight: 'bold' },
  statusOk: { color: '#10b981' },
  statusWarn: { color: '#ef4444' },
});
