import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { COLORS } from '../theme/colors';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hoş geldin 👋</Text>
            <Text style={styles.name}>Ahmet Çelik</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications" size={22} color={COLORS.text} />
            <View style={styles.dot} />
          </TouchableOpacity>
        </View>

        {/* Alert Banner */}
        <View style={styles.alertBanner}>
          <Ionicons name="warning" size={24} color="#92400E" style={{marginRight: 10}} />
          <View>
            <Text style={styles.alertTitle}>Azot seviyesi düşük!</Text>
            <Text style={styles.alertText}>Tarla #1 için gübre tavsiyesi bekliyor.</Text>
          </View>
        </View>

        {/* Sensor Grid */}
        <View style={styles.grid}>
          <SensorCard icon="water" color={COLORS.success} label="Toprak Nemi" value="%55" status="✓ Normal" />
          <SensorCard icon="thermometer" color={COLORS.error} label="Sıcaklık" value="24°C" status="✓ Normal" />
          <SensorCard icon="cloud" color={COLORS.info} label="Hava Nemi" value="%62" status="✓ Normal" />
          <SensorCard icon="flask" color={COLORS.warning} label="Toprak pH" value="6.8" status="⚠ Düşük" />
        </View>

        {/* Irrigation Card */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="water" size={16} color={COLORS.info} style={{marginRight: 6}} />
                <Text style={styles.cardTitle}>Sulama Durumu</Text>
              </View>
              <Text style={styles.cardSubtitle}>Tarla #1 · Otomatik mod</Text>
            </View>
            <TouchableOpacity style={styles.primaryBtn}>
              <Ionicons name="play" size={16} color="#fff" style={{marginRight: 6}} />
              <Text style={styles.btnText}>Başlat</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Chart */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Son 24 Saat</Text>
          <Text style={styles.linkText}>Detay →</Text>
        </View>
        <View style={styles.chartCard}>
          <LineChart
            data={{
              labels: ["00", "04", "08", "12", "16", "20", "24"],
              datasets: [{ data: [52, 50, 48, 55, 53, 56, 55] }]
            }}
            width={width - 64}
            height={200}
            chartConfig={{
              backgroundColor: COLORS.card,
              backgroundGradientFrom: COLORS.card,
              backgroundGradientTo: COLORS.card,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
              labelColor: (opacity = 1) => COLORS.muted,
              propsForDots: { r: "4", strokeWidth: "2", stroke: COLORS.info }
            }}
            bezier
            style={{ borderRadius: 12, marginLeft: -10 }}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const SensorCard = ({ icon, color, label, value, status }) => (
  <View style={styles.sensorCard}>
    <View style={[styles.iconBox, { backgroundColor: color + '20' }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <Text style={styles.sensorLabel}>{label}</Text>
    <Text style={styles.sensorValue}>{value}</Text>
    <Text style={[styles.sensorStatus, { color: status.includes('Normal') ? COLORS.success : COLORS.warning }]}>{status}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.darkBg },
  scrollContent: { padding: 16, paddingBottom: 30, backgroundColor: COLORS.background, minHeight: '100%', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, marginTop: 10 },
  greeting: { fontSize: 13, color: COLORS.muted },
  name: { fontSize: 22, fontWeight: 'bold', color: COLORS.text },
  notificationBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, justifyContent: 'center', alignItems: 'center' },
  dot: { position: 'absolute', top: 8, right: 10, width: 8, height: 8, backgroundColor: COLORS.error, borderRadius: 4 },
  alertBanner: { backgroundColor: '#FEF3C7', borderColor: COLORS.warning, borderWidth: 1, borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  alertTitle: { fontWeight: 'bold', color: '#92400E', fontSize: 14 },
  alertText: { color: '#92400E', fontSize: 12, marginTop: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 },
  sensorCard: { width: '48%', backgroundColor: COLORS.card, borderRadius: 14, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, marginBottom: 12 },
  iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  sensorLabel: { fontSize: 11, color: COLORS.muted, marginBottom: 4 },
  sensorValue: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  sensorStatus: { fontSize: 10, marginTop: 4, fontWeight: '500' },
  card: { backgroundColor: COLORS.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: COLORS.border, marginBottom: 16 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.text },
  cardSubtitle: { fontSize: 12, color: COLORS.muted, marginTop: 4 },
  primaryBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, flexDirection: 'row', alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  linkText: { color: COLORS.primary, fontSize: 13, fontWeight: '600' },
  chartCard: { backgroundColor: COLORS.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' }
});
