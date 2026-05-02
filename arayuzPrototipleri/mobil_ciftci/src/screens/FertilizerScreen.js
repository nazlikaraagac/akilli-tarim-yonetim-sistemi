import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function FertilizerScreen() {
  const [status, setStatus] = useState('pending'); // pending, approved, rejected

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Ionicons name="flask" size={24} color={COLORS.warning} style={{marginRight: 8}} />
          <Text style={styles.headerTitle}>Gübreleme</Text>
        </View>

        {/* AI Recommendation Card */}
        <View style={styles.prescriptionCard}>
          <View style={styles.prescriptionHeader}>
            <Ionicons name="sparkles" size={18} color={COLORS.warning} style={{marginRight: 6}} />
            <Text style={styles.prescriptionTitle}>YZ Reçete Önerisi</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>YENİ</Text>
            </View>
          </View>
          
          <Text style={styles.prescriptionDesc}>
            Sensör verilerinde Azot (N) oranının optimum seviyenin %15 altında olduğu tespit edildi.
          </Text>

          <View style={styles.dosageBox}>
            <View style={styles.dosageItem}>
              <Text style={styles.dosageLabel}>Gübre Tipi</Text>
              <Text style={styles.dosageValue}>Üre (N46)</Text>
            </View>
            <View style={styles.dosageItem}>
              <Text style={styles.dosageLabel}>Miktar</Text>
              <Text style={styles.dosageValue}>15 kg/dönüm</Text>
            </View>
          </View>

          {status === 'pending' ? (
            <View style={styles.actionRow}>
              <TouchableOpacity style={[styles.actionBtn, styles.rejectBtn]} onPress={() => setStatus('rejected')}>
                <Ionicons name="close" size={18} color="#fff" style={{marginRight: 4}} />
                <Text style={styles.btnText}>Reddet</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.approveBtn]} onPress={() => setStatus('approved')}>
                <Ionicons name="checkmark" size={18} color="#fff" style={{marginRight: 4}} />
                <Text style={styles.btnText}>Uygula</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.statusBox, status === 'approved' ? styles.statusSuccess : styles.statusError]}>
              <Ionicons name={status === 'approved' ? "checkmark-circle" : "close-circle"} size={20} color={status === 'approved' ? COLORS.success : COLORS.error} style={{marginRight: 8}} />
              <Text style={[styles.statusText, { color: status === 'approved' ? COLORS.success : COLORS.error }]}>
                {status === 'approved' ? 'Reçete uygulandı ve tanka komut gönderildi.' : 'Reçete reddedildi.'}
              </Text>
            </View>
          )}
        </View>

        {/* Tank Status */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Gübre Tankları Durumu</Text>
          <TankItem type="Üre (N)" level={80} color={COLORS.info} />
          <TankItem type="Fosfor (P)" level={45} color={COLORS.warning} />
          <TankItem type="Potasyum (K)" level={15} color={COLORS.error} last />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const TankItem = ({ type, level, color, last }) => (
  <View style={[styles.tankItem, last && { borderBottomWidth: 0 }]}>
    <View style={styles.tankHeader}>
      <Text style={styles.tankTitle}>{type}</Text>
      <Text style={[styles.tankValue, { color }]}>%{level}</Text>
    </View>
    <View style={styles.progressBarBg}>
      <View style={[styles.progressBarFill, { width: `${level}%`, backgroundColor: color }]} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.darkBg },
  scrollContent: { padding: 16, paddingBottom: 30, backgroundColor: COLORS.background, minHeight: '100%', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, marginTop: 10 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.text },
  prescriptionCard: { backgroundColor: COLORS.card, borderRadius: 16, padding: 16, borderWidth: 2, borderColor: COLORS.warning, marginBottom: 16 },
  prescriptionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  prescriptionTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text, flex: 1 },
  badge: { backgroundColor: COLORS.error, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  prescriptionDesc: { color: COLORS.muted, fontSize: 13, lineHeight: 20, marginBottom: 16 },
  dosageBox: { flexDirection: 'row', backgroundColor: COLORS.background, borderRadius: 12, padding: 12, marginBottom: 16 },
  dosageItem: { flex: 1 },
  dosageLabel: { fontSize: 11, color: COLORS.muted, marginBottom: 4 },
  dosageValue: { fontSize: 15, fontWeight: 'bold', color: COLORS.text },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  actionBtn: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 12, borderRadius: 12 },
  rejectBtn: { backgroundColor: COLORS.error, marginRight: 8 },
  approveBtn: { backgroundColor: COLORS.success, marginLeft: 8 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  statusBox: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, backgroundColor: COLORS.background },
  statusSuccess: { backgroundColor: '#D1FAE5' },
  statusError: { backgroundColor: '#FEE2E2' },
  statusText: { fontSize: 13, fontWeight: 'bold' },
  card: { backgroundColor: COLORS.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: COLORS.border, marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text, marginBottom: 16 },
  tankItem: { marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  tankHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  tankTitle: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  tankValue: { fontSize: 14, fontWeight: 'bold' },
  progressBarBg: { height: 8, backgroundColor: COLORS.background, borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 }
});
