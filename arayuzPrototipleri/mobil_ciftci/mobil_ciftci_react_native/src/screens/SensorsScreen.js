import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { COLORS } from '../theme/colors';

const { width } = Dimensions.get('window');

export default function SensorsScreen() {
  const [activeTab, setActiveTab] = useState('Nem');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Ionicons name="hardware-chip" size={24} color={COLORS.info} style={{marginRight: 8}} />
          <Text style={styles.headerTitle}>Sensörler</Text>
        </View>

        {/* Custom Toggle */}
        <View style={styles.toggleContainer}>
          {['Nem', 'Sıcaklık', 'NPK'].map(tab => (
            <TouchableOpacity 
              key={tab} 
              style={[styles.toggleBtn, activeTab === tab && styles.toggleBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.toggleText, activeTab === tab && styles.toggleTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart */}
        <View style={styles.chartCard}>
          <LineChart
            data={{
              labels: ["00", "04", "08", "12", "16", "20", "24"],
              datasets: [{ data: [52, 50, 48, 46, 44, 48, 55] }]
            }}
            width={width - 64}
            height={220}
            chartConfig={{
              backgroundColor: COLORS.card,
              backgroundGradientFrom: COLORS.card,
              backgroundGradientTo: COLORS.card,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
              labelColor: (opacity = 1) => COLORS.muted,
              propsForDots: { r: "5", strokeWidth: "2", stroke: COLORS.success }
            }}
            bezier
            style={{ borderRadius: 12, marginLeft: -10 }}
          />
        </View>

        {/* Thresholds */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Eşik Değerleri</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Nem Alt Eşik</Text>
            <Text style={styles.rowValue}>%30</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Sıcaklık Üst Eşik</Text>
            <Text style={styles.rowValue}>38°C</Text>
          </View>
          <View style={[styles.row, { borderBottomWidth: 0 }]}>
            <Text style={styles.rowLabel}>pH Aralığı</Text>
            <Text style={styles.rowValue}>6.0 — 7.5</Text>
          </View>
        </View>

        {/* Sensor List */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sensör Durumları</Text>
          <SensorItem icon="water" color={COLORS.success} title="Kapasitif Nem Sensörü" sub="Son veri: 2 dk önce · %55" />
          <SensorItem icon="thermometer" color={COLORS.info} title="DHT22 (Sıcaklık/Nem)" sub="Son veri: 1 dk önce · 24°C" />
          <SensorItem icon="flask" color={COLORS.warning} title="NPK Sensörü" sub="Son veri: 15 dk önce · N:45 P:32" last />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const SensorItem = ({ icon, color, title, sub, last }) => (
  <View style={[styles.listItem, last && { borderBottomWidth: 0 }]}>
    <View style={[styles.liIcon, { backgroundColor: color + '20' }]}>
      <Ionicons name={icon} size={18} color={color} />
    </View>
    <View style={styles.liContent}>
      <Text style={styles.liTitle}>{title}</Text>
      <Text style={styles.liSub}>{sub}</Text>
    </View>
    <Text style={styles.liStatus}>Aktif</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.darkBg },
  scrollContent: { padding: 16, paddingBottom: 30, backgroundColor: COLORS.background, minHeight: '100%', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, marginTop: 10 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.text },
  toggleContainer: { flexDirection: 'row', backgroundColor: '#E2E8F0', borderRadius: 12, padding: 4, marginBottom: 16 },
  toggleBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  toggleBtnActive: { backgroundColor: COLORS.card, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  toggleText: { fontSize: 14, fontWeight: '500', color: COLORS.muted },
  toggleTextActive: { color: COLORS.text, fontWeight: 'bold' },
  chartCard: { backgroundColor: COLORS.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', marginBottom: 16 },
  card: { backgroundColor: COLORS.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: COLORS.border, marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  rowLabel: { color: COLORS.muted, fontSize: 14 },
  rowValue: { fontWeight: 'bold', color: COLORS.text, fontSize: 14 },
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  liIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  liContent: { flex: 1 },
  liTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.text },
  liSub: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  liStatus: { fontSize: 12, fontWeight: 'bold', color: COLORS.success }
});
