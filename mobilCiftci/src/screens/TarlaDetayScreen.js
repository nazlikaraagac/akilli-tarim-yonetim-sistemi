import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Circle } from 'react-native-maps';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../context/ThemeContext';

const { width: SW } = Dimensions.get('window');

function parseCoord(str) {
  try {
    const parts = str.replace(/°/g, '').split(',');
    const lat = parseFloat(parts[0].trim().split(' ')[0]);
    const lng = parseFloat(parts[1].trim().split(' ')[0]);
    return { latitude: lat, longitude: lng };
  } catch {
    return { latitude: 38.67, longitude: 39.22 };
  }
}

export default function TarlaDetayScreen({ route, navigation }) {
  const { tarla } = route.params;
  const { c } = useTheme();
  const [raporModal, setRaporModal] = useState(false);
  const coord = parseCoord(tarla.koordinat);
  const nemTrend = [42, 45, 50, 48, 35, 25, parseInt(tarla.nem)];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]}>
      <View style={[styles.header, { backgroundColor: c.card, borderBottomColor: c.border }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={c.textMain} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.textMain }]}>{tarla.ad}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{ ...coord, latitudeDelta: 0.015, longitudeDelta: 0.015 }}
            mapType="satellite"
          >
            <Marker coordinate={coord} title={tarla.ad} description={tarla.ilce}>
              <View style={styles.markerWrap}>
                <View style={[styles.markerDot, { backgroundColor: tarla.isWarning ? '#ef4444' : '#10b981' }]} />
              </View>
            </Marker>
            <Circle center={coord} radius={200} strokeColor={tarla.isWarning ? '#ef4444' : '#10b981'} fillColor={tarla.isWarning ? 'rgba(239,68,68,0.12)' : 'rgba(16,185,129,0.12)'} strokeWidth={2} />
          </MapView>
          <View style={styles.mapBadge}>
            <Ionicons name="location" size={12} color="#ef4444" />
            <Text style={styles.mapBadgeText}>{tarla.ilce}</Text>
          </View>
          <View style={[styles.statusBadgeMap, tarla.isWarning ? styles.warnBg : styles.okBg]}>
            <Text style={[styles.statusBadgeText, tarla.isWarning ? styles.warnText : styles.okText]}>{tarla.durum}</Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
          <Text style={[styles.sectionTitle, { color: c.textMain }]}>Kadastro ve Konum</Text>
          <View style={styles.grid}>
            <InfoBox icon="document-text" label="Lot No" value={tarla.lot} color="#8b5cf6" c={c} />
            <InfoBox icon="grid" label="Parsel No" value={tarla.parsel} color="#3b82f6" c={c} />
            <InfoBox icon="scan" label="Alan" value={tarla.alan} color="#10b981" c={c} />
            <InfoBox icon="earth" label="Toprak" value={tarla.toprak} color="#eab308" c={c} />
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: c.card, borderColor: tarla.isWarning ? '#fca5a5' : c.border, borderWidth: tarla.isWarning ? 2 : 1 }]}>
          <Text style={[styles.sectionTitle, { color: c.textMain }]}>Canli Sensor Verileri</Text>
          <View style={styles.sensorRow}>
            <SensorBox val={tarla.sicaklik} label="Sicaklik" c={c} />
            <SensorBox val={tarla.nem} label="Toprak Nemi" warn={tarla.isWarning} c={c} />
            <SensorBox val={tarla.ph} label="pH" c={c} />
          </View>
          <TouchableOpacity style={[styles.raporBtn, { backgroundColor: '#3b82f6' }]} onPress={() => setRaporModal(true)}>
            <Ionicons name="bar-chart" size={17} color="#fff" />
            <Text style={styles.raporBtnText}>Detayli Rapor</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
          <Text style={[styles.sectionTitle, { color: c.textMain }]}>Son 7 Gunluk Nem Trendi</Text>
          <LineChart
            data={{ labels: ['G1','G2','G3','G4','G5','G6','Bug.'], datasets: [{ data: nemTrend, strokeWidth: 2.5 }] }}
            width={SW - 64} height={160} yAxisSuffix="%"
            chartConfig={{
              backgroundColor: c.card, backgroundGradientFrom: c.card, backgroundGradientTo: c.card,
              decimalPlaces: 0,
              color: (opacity = 1) => tarla.isWarning ? `rgba(239,68,68,${opacity})` : `rgba(16,185,129,${opacity})`,
              labelColor: () => c.textMuted,
              propsForDots: { r: '4', strokeWidth: '2', stroke: tarla.isWarning ? '#ef4444' : '#10b981' },
            }}
            bezier style={{ borderRadius: 12, marginTop: 4 }}
          />
        </View>

        <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
          <Text style={[styles.sectionTitle, { color: c.textMain }]}>Urun ve Tarim Bilgileri</Text>
          <View style={styles.grid}>
            <InfoBox icon="leaf" label="Ekili Urun" value={tarla.urun} color="#10b981" c={c} />
            <InfoBox icon="calendar" label="Ekim" value={tarla.ekim} color="#3b82f6" c={c} />
            <InfoBox icon="trophy" label="Hasat" value={tarla.hasat} color="#eab308" c={c} />
            <InfoBox icon="trending-up" label="Verim" value={tarla.verimBeklenti} color="#ef4444" c={c} />
          </View>
          <View style={[styles.divider, { backgroundColor: c.border }]} />
          <DetailRow icon="water" label="Sulama" value={tarla.sulama} c={c} />
          <DetailRow icon="nutrition" label="Gubre" value={tarla.gubre} c={c} />
        </View>

        <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border }]}>
          <Text style={[styles.sectionTitle, { color: c.textMain }]}>Son Islemler</Text>
          <HistoryItem color="#10b981" text={tarla.sonIsleme} c={c} />
          <HistoryItem color="#3b82f6" text={tarla.sonIsleme2} last c={c} />
        </View>

      </ScrollView>

      <Modal animationType="slide" transparent visible={raporModal} onRequestClose={() => setRaporModal(false)}>
        <View style={styles.overlay}>
          <View style={[styles.modalBox, { backgroundColor: c.card }]}>
            <View style={styles.modalHead}>
              <Text style={[styles.modalTitle, { color: c.textMain }]}>{tarla.ad} - Toprak Analizi</Text>
              <TouchableOpacity onPress={() => setRaporModal(false)}>
                <Ionicons name="close" size={24} color={c.textMuted} />
              </TouchableOpacity>
            </View>
            <View style={[styles.phRow, { backgroundColor: c.background }]}>
              <View style={styles.phCircle}>
                <Text style={styles.phVal}>{tarla.ph}</Text>
                <Text style={styles.phLbl}>pH</Text>
              </View>
              <Text style={[styles.phDesc, { color: c.textMuted }]}>
                {parseFloat(tarla.ph) < 6.5 ? 'Toprak asidik. Kirec uygulamasi onerilir.'
                  : parseFloat(tarla.ph) > 7.5 ? 'Toprak bazik. Sulfur degerlendirilebilir.'
                  : 'pH seviyesi ideal aralikta (6.5-7.5).'}
              </Text>
            </View>
            <Text style={[styles.modalSub, { color: c.textMuted }]}>Mineral Analizi</Text>
            {tarla.ph_mineral.split(' | ').map((item, i) => {
              const [mineral, durum] = item.split(': ');
              const col = durum === 'Yüksek' ? '#eab308' : durum === 'Düşük' ? '#ef4444' : '#10b981';
              return (
                <View key={i} style={[styles.mineralRow, { borderBottomColor: c.border }]}>
                  <Text style={[styles.mineralName, { color: c.textMain }]}>{mineral}</Text>
                  <View style={[styles.mineralBadge, { backgroundColor: col + '20', borderColor: col }]}>
                    <Text style={[styles.mineralStatus, { color: col }]}>{durum}</Text>
                  </View>
                </View>
              );
            })}
            <TouchableOpacity style={[styles.closeBtn, { backgroundColor: c.textMain }]} onPress={() => setRaporModal(false)}>
              <Text style={[styles.closeBtnText, { color: c.card }]}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function InfoBox({ icon, label, value, color, c }) {
  return (
    <View style={[ib.box, { backgroundColor: c.background }]}>
      <Ionicons name={icon} size={19} color={color} />
      <Text style={[ib.label, { color: c.textMuted }]}>{label}</Text>
      <Text style={[ib.value, { color: c.textMain }]}>{value}</Text>
    </View>
  );
}
function SensorBox({ val, label, warn, c }) {
  return (
    <View style={[ib.sensor, { backgroundColor: warn ? '#fef2f2' : c.background }]}>
      <Text style={[ib.sensorVal, { color: warn ? '#ef4444' : c.textMain }]}>{val}</Text>
      <Text style={[ib.label, { color: c.textMuted }]}>{label}</Text>
    </View>
  );
}
function DetailRow({ icon, label, value, c }) {
  return (
    <View style={ib.detailRow}>
      <Ionicons name={icon} size={15} color={c.textMuted} />
      <Text style={[ib.detailLabel, { color: c.textMuted }]}>{label}:</Text>
      <Text style={[ib.detailValue, { color: c.textMain }]}>{value}</Text>
    </View>
  );
}
function HistoryItem({ color, text, last, c }) {
  return (
    <View style={[ib.historyItem, last && { marginBottom: 0 }]}>
      <View style={[ib.dot, { backgroundColor: color }]} />
      <Text style={[ib.historyText, { color: c.textMain }]}>{text}</Text>
    </View>
  );
}

const ib = StyleSheet.create({
  box: { width: '47%', padding: 13, borderRadius: 12, alignItems: 'center', marginBottom: 10 },
  label: { fontSize: 11, marginTop: 5, marginBottom: 2, textAlign: 'center' },
  value: { fontSize: 13, fontWeight: 'bold', textAlign: 'center' },
  sensor: { flex: 1, padding: 13, borderRadius: 12, alignItems: 'center', marginHorizontal: 3 },
  sensorVal: { fontSize: 19, fontWeight: '800' },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 8 },
  detailLabel: { fontSize: 13, fontWeight: '600' },
  detailValue: { fontSize: 13, fontWeight: '700', flex: 1 },
  historyItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 13 },
  dot: { width: 11, height: 11, borderRadius: 6, marginRight: 12 },
  historyText: { fontSize: 14, flex: 1 },
});

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1 },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 17, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  container: { padding: 16, paddingBottom: 40 },
  mapContainer: { width: '100%', height: 220, borderRadius: 16, overflow: 'hidden', marginBottom: 16, position: 'relative' },
  map: { width: '100%', height: '100%' },
  markerWrap: { alignItems: 'center', justifyContent: 'center' },
  markerDot: { width: 16, height: 16, borderRadius: 8, borderWidth: 3, borderColor: '#fff' },
  mapBadge: { position: 'absolute', bottom: 10, left: 10, backgroundColor: 'rgba(255,255,255,0.92)', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, alignItems: 'center', gap: 4 },
  mapBadgeText: { fontWeight: '600', fontSize: 11, color: '#1e293b' },
  statusBadgeMap: { position: 'absolute', top: 10, right: 10, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  warnBg: { backgroundColor: '#fef2f2' }, okBg: { backgroundColor: '#ecfdf5' },
  statusBadgeText: { fontSize: 12, fontWeight: 'bold' },
  warnText: { color: '#ef4444' }, okText: { color: '#10b981' },
  card: { padding: 18, borderRadius: 16, marginBottom: 14, borderWidth: 1, elevation: 1 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  sensorRow: { flexDirection: 'row', marginBottom: 14 },
  raporBtn: { flexDirection: 'row', padding: 13, borderRadius: 10, justifyContent: 'center', alignItems: 'center', gap: 8 },
  raporBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  divider: { height: 1, marginVertical: 10 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'flex-end' },
  modalBox: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 22, paddingBottom: 36, maxHeight: '80%' },
  modalHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  modalTitle: { fontSize: 15, fontWeight: 'bold', flex: 1 },
  modalSub: { fontSize: 13, fontWeight: 'bold', marginTop: 16, marginBottom: 10 },
  phRow: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, gap: 14 },
  phCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#10b981', justifyContent: 'center', alignItems: 'center' },
  phVal: { fontSize: 20, fontWeight: '800', color: '#fff' },
  phLbl: { fontSize: 10, color: '#d1fae5', fontWeight: 'bold' },
  phDesc: { fontSize: 13, lineHeight: 20, flex: 1 },
  mineralRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 9, borderBottomWidth: 1 },
  mineralName: { fontSize: 14, fontWeight: '600' },
  mineralBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, borderWidth: 1 },
  mineralStatus: { fontSize: 12, fontWeight: 'bold' },
  closeBtn: { height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 18 },
  closeBtnText: { fontWeight: 'bold', fontSize: 15 },
});
